import { fetchResilient, HttpError, USER_AGENT } from "../util/net";
import { buildMagnet } from "./magnet";
import type { SearchOptions, Source, SourceId, TorrentResult } from "./types";

const API = "https://apibay.org";

const MOVIE_CATS = new Set([201, 202, 207, 209]);
const TV_CATS = new Set([205, 208]);
const MUSIC_CATS = new Set([101, 104, 199]);
const AUDIO_CATS = new Set([101, 102, 103, 104, 199]);
const GAMES_CATS = new Set([401, 402, 403, 404, 405, 406, 407, 408, 499]);
const APPS_CATS = new Set([301, 302, 303, 304, 305, 306, 399]);
const ROMS_CATS = new Set([403, 404, 405, 406]);
const ADULT_CATS = new Set([501, 502, 503, 504, 505, 506, 507, 599]);
const MAGS_CATS = new Set([601, 602, 603, 699]);

const TOP_MOVIES = `${API}/precompiled/data_top100_207.json`;
const TOP_TV = `${API}/precompiled/data_top100_208.json`;
const TOP_MUSIC = `${API}/precompiled/data_top100_101.json`;
const TOP_AUDIO = `${API}/precompiled/data_top100_102.json`;
const TOP_GAMES = `${API}/precompiled/data_top100_401.json`;
const TOP_APPS = `${API}/precompiled/data_top100_301.json`;
const TOP_ROMS = `${API}/precompiled/data_top100_406.json`;
const TOP_ADULT = `${API}/precompiled/data_top100_501.json`;
const TOP_MAGS = `${API}/precompiled/data_top100_601.json`;

interface ApibayItem {
  id?: string;
  name?: string;
  info_hash?: string;
  seeders?: string;
  leechers?: string;
  num_files?: string;
  size?: string;
  added?: string;
  category?: string;
}

const ZERO_HASH = "0000000000000000000000000000000000000000";

function toResult(it: ApibayItem, source: SourceId): TorrentResult | null {
  const infoHash = (it.info_hash ?? "").toLowerCase();
  if (!infoHash || infoHash === ZERO_HASH || it.id === "0") return null;
  const name = it.name || "Unknown";
  const numFiles = Number(it.num_files);
  return {
    infoHash,
    name,
    sizeBytes: Number(it.size) || 0,
    seeders: Number(it.seeders) || 0,
    leechers: Number(it.leechers) || 0,
    numFiles: Number.isFinite(numFiles) && numFiles > 0 ? numFiles : undefined,
    source,
    magnet: buildMagnet(infoHash, name),
    added: Number(it.added) || undefined,
  };
}

async function fetchItems(url: string, opts: SearchOptions): Promise<ApibayItem[]> {
  const res = await fetchResilient(url, {
    headers: { "User-Agent": USER_AGENT },
    signal: opts.signal,
    retries: 1,
  });
  if (!res.ok) throw new HttpError(res.status, `Pirate Bay returned ${res.status}`);
  const json = (await res.json()) as ApibayItem[];
  return Array.isArray(json) ? json : [];
}

async function search(
  query: string,
  cats: Set<number>,
  browseUrl: string,
  source: SourceId,
  opts: SearchOptions,
): Promise<TorrentResult[]> {
  const q = query.trim();
  const items = await fetchItems(
    q ? `${API}/q.php?q=${encodeURIComponent(q)}` : browseUrl,
    opts,
  );
  const out: TorrentResult[] = [];
  for (const it of items) {
    if (q && !cats.has(Number(it.category))) continue;
    const r = toResult(it, source);
    if (r) out.push(r);
  }
  return out;
}

export const tpbMovies: Source = {
  id: "tpb-movies",
  label: "TPB",
  groups: ["Movies"],
  homepage: "https://thepiratebay.org",
  reportsHealth: true,
  search: (query, opts = {}) => search(query, MOVIE_CATS, TOP_MOVIES, "tpb-movies", opts),
};

export const tpbTv: Source = {
  id: "tpb-tv",
  label: "TPB",
  groups: ["TV"],
  homepage: "https://thepiratebay.org",
  reportsHealth: true,
  search: (query, opts = {}) => search(query, TV_CATS, TOP_TV, "tpb-tv", opts),
};

export const tpbGames: Source = {
  id: "tpb-games",
  label: "TPB",
  groups: ["Games"],
  homepage: "https://thepiratebay.org",
  reportsHealth: true,
  search: (query, opts = {}) => search(query, GAMES_CATS, TOP_GAMES, "tpb-games", opts),
};

export const tpbApps: Source = {
  id: "tpb-apps",
  label: "TPB",
  groups: ["Applications"],
  homepage: "https://thepiratebay.org",
  reportsHealth: true,
  search: (query, opts = {}) => search(query, APPS_CATS, TOP_APPS, "tpb-apps", opts),
};

export const tpbMusic: Source = {
  id: "tpb-music",
  label: "TPB",
  groups: ["Music"],
  homepage: "https://thepiratebay.org",
  reportsHealth: true,
  search: (query, opts = {}) => search(query, MUSIC_CATS, TOP_MUSIC, "tpb-music", opts),
};

export const tpbAudio: Source = {
  id: "tpb-audio",
  label: "TPB",
  groups: ["Audio"],
  homepage: "https://thepiratebay.org",
  reportsHealth: true,
  search: (query, opts = {}) => search(query, AUDIO_CATS, TOP_AUDIO, "tpb-audio", opts),
};

export const tpbRoms: Source = {
  id: "tpb-roms",
  label: "TPB",
  groups: ["ROMs"],
  homepage: "https://thepiratebay.org",
  reportsHealth: true,
  search: (query, opts = {}) => search(query, ROMS_CATS, TOP_ROMS, "tpb-roms", opts),
};

export const tpbAdult: Source = {
  id: "tpb-adult",
  label: "TPB",
  groups: ["Adult"],
  homepage: "https://thepiratebay.org",
  reportsHealth: true,
  search: (query, opts = {}) => search(query, ADULT_CATS, TOP_ADULT, "tpb-adult", opts),
};

export const tpbMagazines: Source = {
  id: "tpb-magazines",
  label: "TPB",
  groups: ["Magazines"],
  homepage: "https://thepiratebay.org",
  reportsHealth: true,
  search: (query, opts = {}) => search(query, MAGS_CATS, TOP_MAGS, "tpb-magazines", opts),
};
