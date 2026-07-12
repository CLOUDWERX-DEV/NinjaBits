# Changelog

All notable changes to this project will be documented in this file.

## [1.4.1] - 2026-07-12

### Added
- Added new top-performing, high-uptime public trackers (zer0day.ch, ducks.party, qu.ax, publictracker.xyz, etc.) to improve peer discovery and download speeds.

### Changed
- Cleaned up all legacy references to torlink/torlnk across the codebase, tests, Nix configurations, and GitHub metadata.

## [1.4.0] - 2026-07-12

### Added
- Created brand-new Internet Archive (archive.org) search provider, fetching torrent info hashes (`btih`) directly from advanced search results.
- Added 6 new sidebar categories: Magazines, Applications, Music, Audio, ROMs, and Adult.
- Extended Pirate Bay (TPB) and 1337x scrapers with category-specific search sets (PC/console games, apps, music, audiobooks, adult content, ebooks/comics).
- Extended BitTorrented (DHT crawl) search provider to filter and feed all new categories (music, ebooks/documents, adult content, games/applications).
- Created a brand-new BitSearch integration querying their active public API, segmented cleanly across all target categories.

### Changed
- Renamed project to **NinjaBits** and CLI binary/npm package name to `ninjabits`.
- Updated visual theme to slate backgrounds (`#334155` rules), slate-50 text (`#f8fafc`), and blue/cyan accents (`#60a5fa`).
- Replaced logo with a custom-designed **NinjaBits** block-art wordmark and a soft-red ninja emoji highlight.
- Renamed CLI environment variables to `NINJABITS_API_TOKEN`, `NINJABITS_FILES_TOKEN`, and `NINJABITS_STATE_DIR`.
- Moved default download directory to `Downloads/NinjaBits`.
