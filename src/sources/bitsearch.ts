import { fetchResilient, HttpError, USER_AGENT } from "../util/net";
import { buildMagnet } from "./magnet";
import type { SearchOptions, Source, SourceId, TorrentResult } from "./types";

const BASE = "https://bitsearch.eu";
const MIN_QUERY = 3;

interface BitsearchResult {
  infohash?: string;
  title?: string;
  size?: number;
  seeders?: number;
  leechers?: number;
  updatedAt?: string;
}

interface BitsearchResponse {
  success?: boolean;
  results?: BitsearchResult[];
}

function toUnixSeconds(iso: string | undefined): number | undefined {
  if (!iso) return undefined;
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? undefined : Math.floor(ms / 1000);
}

export function mapBitsearchResults(results: BitsearchResult[], id: SourceId): TorrentResult[] {
  const out: TorrentResult[] = [];
  for (const r of results) {
    const infoHash = r.infohash?.toLowerCase();
    if (!infoHash || !/^[a-f0-9]{40}$/.test(infoHash)) continue;
    const name = r.title || infoHash;
    out.push({
      infoHash,
      name,
      sizeBytes: r.size ?? 0,
      seeders: r.seeders ?? 0,
      leechers: r.leechers ?? 0,
      source: id,
      magnet: buildMagnet(infoHash, name),
      added: toUnixSeconds(r.updatedAt),
    });
  }
  return out;
}

async function search(
  query: string,
  category: number | null,
  id: SourceId,
  opts: SearchOptions = {},
): Promise<TorrentResult[]> {
  const q = query.trim();
  if (q.length < MIN_QUERY) return [];

  const params = new URLSearchParams({
    q,
    limit: "50",
  });
  if (category !== null) {
    params.set("category", String(category));
  }

  const res = await fetchResilient(`${BASE}/api/v1/search?${params.toString()}`, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    signal: opts.signal,
    retries: 1,
  });
  if (!res.ok) throw new HttpError(res.status, `BitSearch returned ${res.status}`);

  const json = (await res.json()) as BitsearchResponse;
  if (!json.success) return [];
  return mapBitsearchResults(json.results ?? [], id);
}

export const bitsearchMovies: Source = {
  id: "bitsearch-movies",
  label: "BitSearch",
  groups: ["Movies"],
  homepage: BASE,
  reportsHealth: true,
  search: (query, opts = {}) => search(query, 2, "bitsearch-movies", opts),
};

export const bitsearchTv: Source = {
  id: "bitsearch-tv",
  label: "BitSearch",
  groups: ["TV"],
  homepage: BASE,
  reportsHealth: true,
  search: (query, opts = {}) => search(query, 3, "bitsearch-tv", opts),
};

export const bitsearchAnime: Source = {
  id: "bitsearch-anime",
  label: "BitSearch",
  groups: ["Anime"],
  homepage: BASE,
  reportsHealth: true,
  search: (query, opts = {}) => search(query, 4, "bitsearch-anime", opts),
};

export const bitsearchGames: Source = {
  id: "bitsearch-games",
  label: "BitSearch",
  groups: ["Games"],
  homepage: BASE,
  reportsHealth: true,
  search: (query, opts = {}) => search(query, 6, "bitsearch-games", opts),
};

export const bitsearchApps: Source = {
  id: "bitsearch-apps",
  label: "BitSearch",
  groups: ["Applications"],
  homepage: BASE,
  reportsHealth: true,
  search: (query, opts = {}) => search(query, 5, "bitsearch-apps", opts),
};

export const bitsearchMusic: Source = {
  id: "bitsearch-music",
  label: "BitSearch",
  groups: ["Music", "Audio"],
  homepage: BASE,
  reportsHealth: true,
  search: (query, opts = {}) => search(query, 7, "bitsearch-music", opts),
};

export const bitsearchMagazines: Source = {
  id: "bitsearch-magazines",
  label: "BitSearch",
  groups: ["Magazines"],
  homepage: BASE,
  reportsHealth: true,
  search: (query, opts = {}) => search(query, 8, "bitsearch-magazines", opts),
};

export const bitsearchRoms: Source = {
  id: "bitsearch-roms",
  label: "BitSearch",
  groups: ["ROMs"],
  homepage: BASE,
  reportsHealth: true,
  search: (query, opts = {}) => search(query, 9, "bitsearch-roms", opts),
};

export const bitsearchAdult: Source = {
  id: "bitsearch-adult",
  label: "BitSearch",
  groups: ["Adult"],
  homepage: BASE,
  reportsHealth: true,
  search: (query, opts = {}) => search(query, 10, "bitsearch-adult", opts),
};
