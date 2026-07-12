import { fetchResilient, HttpError, USER_AGENT } from "../util/net";
import { buildMagnet } from "./magnet";
import type { SearchOptions, Source, SourceId, SourceGroup, TorrentResult } from "./types";

const BASE_URL = "https://solidtorrents.to/api/v1/search";

interface SolidItem {
  infohash?: string;
  title?: string;
  size?: number;
  seeders?: number;
  leechers?: number;
  createdAt?: string;
}

interface SolidResponse {
  success?: boolean;
  results?: SolidItem[];
}

async function search(
  query: string,
  category: string,
  sourceId: SourceId,
  opts: SearchOptions = {}
): Promise<TorrentResult[]> {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    q: query.trim(),
    category,
    sort: "seeders",
  });

  const res = await fetchResilient(`${BASE_URL}?${params.toString()}`, {
    headers: { "User-Agent": USER_AGENT },
    signal: opts.signal,
  });

  if (!res.ok) {
    throw new HttpError(res.status, `SolidTorrents returned ${res.status}`);
  }

  const data = (await res.json()) as SolidResponse;
  if (!data.success || !Array.isArray(data.results)) {
    return [];
  }

  return data.results
    .filter((item): item is SolidItem & { infohash: string; title: string } => {
      return (
        typeof item.infohash === "string" &&
        item.infohash.length === 40 &&
        typeof item.title === "string" &&
        item.title.length > 0
      );
    })
    .map((item) => {
      const hash = item.infohash.toLowerCase();
      const title = item.title;
      return {
        infoHash: hash,
        name: title,
        sizeBytes: typeof item.size === "number" ? item.size : 0,
        seeders: typeof item.seeders === "number" ? item.seeders : 0,
        leechers: typeof item.leechers === "number" ? item.leechers : 0,
        source: sourceId,
        magnet: buildMagnet(hash, title),
        added: item.createdAt ? new Date(item.createdAt).getTime() / 1000 : undefined,
      };
    });
}

function makeSource(id: SourceId, label: string, category: string, groups: SourceGroup[]): Source {
  return {
    id,
    label,
    groups,
    homepage: "https://solidtorrents.to",
    reportsHealth: true,
    search: (query, opts) => search(query, category, id, opts),
  };
}

export const solidtorrentsMovies = makeSource(
  "solidtorrents-movies",
  "SolidTorrents",
  "video",
  ["Movies"]
);

export const solidtorrentsTv = makeSource(
  "solidtorrents-tv",
  "SolidTorrents",
  "video",
  ["TV"]
);

export const solidtorrentsGames = makeSource(
  "solidtorrents-games",
  "SolidTorrents",
  "software",
  ["Games"]
);

export const solidtorrentsApps = makeSource(
  "solidtorrents-apps",
  "SolidTorrents",
  "software",
  ["Applications"]
);

export const solidtorrentsMusic = makeSource(
  "solidtorrents-music",
  "SolidTorrents",
  "audio",
  ["Music"]
);

export const solidtorrentsAudio = makeSource(
  "solidtorrents-audio",
  "SolidTorrents",
  "audio",
  ["Audio"]
);

export const solidtorrentsRoms = makeSource(
  "solidtorrents-roms",
  "SolidTorrents",
  "software",
  ["ROMs"]
);

export const solidtorrentsMagazines = makeSource(
  "solidtorrents-magazines",
  "SolidTorrents",
  "ebook",
  ["Magazines"]
);

export const solidtorrentsAdult = makeSource(
  "solidtorrents-adult",
  "SolidTorrents",
  "XXX",
  ["Adult"]
);
