import {
  bittorrented,
  bittorrentedMusic,
  bittorrentedMagazines,
  bittorrentedAdult,
  bittorrentedOther,
} from "./bittorrented";
import {
  bitsearchMovies,
  bitsearchTv,
  bitsearchAnime,
  bitsearchGames,
  bitsearchApps,
  bitsearchMusic,
  bitsearchMagazines,
  bitsearchRoms,
  bitsearchAdult,
} from "./bitsearch";
import { eztv } from "./eztv";
import { fitgirl } from "./fitgirl";
import { nyaa } from "./nyaa";
import { subsplease } from "./subsplease";
import {
  tpbMovies,
  tpbTv,
  tpbGames,
  tpbApps,
  tpbMusic,
  tpbAudio,
  tpbRoms,
  tpbAdult,
  tpbMagazines,
} from "./piratebay";
import {
  x1337Movies,
  x1337Tv,
  x1337Games,
  x1337Apps,
  x1337Music,
  x1337Adult,
  x1337Magazines,
} from "./x1337";
import {
  archiveorgMusic,
  archiveorgMagazines,
  archiveorgRoms,
} from "./archiveorg";
import { yts } from "./yts";
import {
  solidtorrentsMovies,
  solidtorrentsTv,
  solidtorrentsGames,
  solidtorrentsApps,
  solidtorrentsMusic,
  solidtorrentsAudio,
  solidtorrentsRoms,
  solidtorrentsMagazines,
  solidtorrentsAdult,
} from "./solidtorrents";
import type { Source, SourceGroup, SourceId } from "./types";

export const SOURCES: readonly Source[] = [
  fitgirl,
  yts,
  tpbMovies,
  x1337Movies,
  eztv,
  tpbTv,
  x1337Tv,
  nyaa,
  subsplease,
  tpbGames,
  tpbApps,
  tpbMusic,
  tpbAudio,
  tpbRoms,
  tpbAdult,
  tpbMagazines,
  x1337Games,
  x1337Apps,
  x1337Music,
  x1337Adult,
  x1337Magazines,
  archiveorgMusic,
  archiveorgMagazines,
  archiveorgRoms,
  bittorrented,
  bittorrentedMusic,
  bittorrentedMagazines,
  bittorrentedAdult,
  bittorrentedOther,
  bitsearchMovies,
  bitsearchTv,
  bitsearchAnime,
  bitsearchGames,
  bitsearchApps,
  bitsearchMusic,
  bitsearchMagazines,
  bitsearchRoms,
  bitsearchAdult,
  solidtorrentsMovies,
  solidtorrentsTv,
  solidtorrentsGames,
  solidtorrentsApps,
  solidtorrentsMusic,
  solidtorrentsAudio,
  solidtorrentsRoms,
  solidtorrentsMagazines,
  solidtorrentsAdult,
];

export const DEFAULT_SOURCE: Source = SOURCES[0]!;

export function getSource(id: SourceId): Source {
  return SOURCES.find((s) => s.id === id) ?? DEFAULT_SOURCE;
}

const GROUP_ORDER: readonly SourceGroup[] = [
  "Games",
  "Movies",
  "TV",
  "Anime",
  "Magazines",
  "Applications",
  "Music",
  "Audio",
  "ROMs",
  "Adult",
];

export function sourcesByGroup(): { group: SourceGroup; sources: Source[] }[] {
  return GROUP_ORDER.map((group) => ({
    group,
    sources: SOURCES.filter((s) => s.groups?.includes(group)),
  })).filter((g) => g.sources.length > 0);
}
