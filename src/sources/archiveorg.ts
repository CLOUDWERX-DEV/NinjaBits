import { fetchResilient, HttpError, USER_AGENT } from "../util/net";
import { buildMagnet } from "./magnet";
import type { SearchOptions, Source, SourceId, TorrentResult } from "./types";

interface ArchiveDoc {
  identifier?: string;
  title?: string;
  btih?: string;
  item_size?: string | number;
  downloads?: number;
  publicdate?: string;
}

interface ArchiveResponse {
  response?: {
    numFound?: number;
    docs?: ArchiveDoc[];
  };
}

async function search(
  query: string,
  mediatype: string,
  source: SourceId,
  opts: SearchOptions = {},
): Promise<TorrentResult[]> {
  const q = query.trim();
  let queryStr = `mediatype:${mediatype} AND format:"Archive BitTorrent"`;
  if (q) {
    queryStr = `(${queryStr}) AND (title:(${q}) OR description:(${q}))`;
  }

  const params = new URLSearchParams({
    q: queryStr,
    "fl[]": "identifier,title,btih,item_size,downloads,publicdate",
    "sort[]": "downloads desc",
    rows: "50",
    output: "json",
  });

  const url = `https://archive.org/advancedsearch.php?${params.toString()}`;
  const res = await fetchResilient(url, {
    headers: { "User-Agent": USER_AGENT },
    signal: opts.signal,
    retries: 1,
  });
  if (!res.ok) throw new HttpError(res.status, `Internet Archive returned ${res.status}`);
  const json = (await res.json()) as ArchiveResponse;

  const docs = json.response?.docs ?? [];
  const out: TorrentResult[] = [];
  for (const doc of docs) {
    if (!doc.identifier || !doc.btih) continue;
    const infoHash = doc.btih.toLowerCase();
    const name = doc.title || doc.identifier;

    let added: number | undefined;
    if (doc.publicdate) {
      const ms = Date.parse(doc.publicdate);
      if (!Number.isNaN(ms)) {
        added = Math.floor(ms / 1000);
      }
    }

    out.push({
      infoHash,
      name,
      sizeBytes: Number(doc.item_size) || 0,
      seeders: 0,
      leechers: 0,
      source,
      magnet: buildMagnet(infoHash, name),
      added,
    });
  }
  return out;
}

export const archiveorgMusic: Source = {
  id: "archiveorg-music",
  label: "Archive.org",
  groups: ["Music", "Audio"],
  homepage: "https://archive.org",
  reportsHealth: false,
  search: (query, opts = {}) => search(query, "audio", "archiveorg-music", opts),
};

export const archiveorgMagazines: Source = {
  id: "archiveorg-magazines",
  label: "Archive.org",
  groups: ["Magazines"],
  homepage: "https://archive.org",
  reportsHealth: false,
  search: (query, opts = {}) => search(query, "texts", "archiveorg-magazines", opts),
};

export const archiveorgRoms: Source = {
  id: "archiveorg-roms",
  label: "Archive.org",
  groups: ["ROMs"],
  homepage: "https://archive.org",
  reportsHealth: false,
  search: (query, opts = {}) => search(query, "software", "archiveorg-roms", opts),
};
