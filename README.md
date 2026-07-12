<p align="center">
  <img src="preview/splash.svg?v=1.5.1" alt="NinjaBits, curated torrents straight from your terminal" style="max-width: 832px; width: 100%; height: auto;">
</p>

<p align="center">
  <b>A sleek, zero-setup terminal torrent search, downloader, and client.</b>
</p>

---

Finding torrents today is a minefield of spam, fake buttons, redirects, and dead links. **NinjaBits** fixes this. It brings a curated catalog of public media indexers directly into your terminal, with zero configuration. You search, select, and download immediately. The files are yours, saved straight to your downloads directory.

<p align="center">
  <img src="preview/browse.svg?v=1.5.1" alt="NinjaBits' browse view: the sidebar, the search bar, and merged results from every source" style="max-width: 832px; width: 100%; height: auto;">
</p>

## Features

- ⚡ **Zero Configuration**: No complex settings, no setup. Just start and run.
- 🎨 **Sleek TUI**: Terminal User Interface built with React (Ink), styled in a premium slate/blue theme.
- 📂 **Multi-Category Coverage**: Games, Movies, TV, Anime, Applications (Windows/Linux/Mac), Music, Audio (samples/drumkits), ROMs, Magazines, and Adult.
- 🌐 **Public Providers**: Curated indexers including **The Pirate Bay**, **1337x**, **YTS**, **EZTV**, **Nyaa**, **SubsPlease**, **FitGirl**, and **Internet Archive (archive.org)**.
- ⚙️ **Headless Capabilities**: Run as a watch-folder daemon, HTTP server with REST APIs, or range-aware HTTP stream files server.
- 🧵 **Tmux Integration**: Persistent background runs that you can attach/detach via ssh anytime.

---

## Get started

NinjaBits can be installed globally and run anywhere:

### 1. Global Installation (Recommended)

```sh
npm install -g ninjabits
```

Once installed, just run:
```sh
ninjabits
```

### 2. Run with npx (Instant launch)

```sh
npx ninjabits
```

You can also pass magnet links or torrent paths directly:
```sh
ninjabits "magnet:?xt=urn:btih:..."
ninjabits path/to/file.torrent
```

---

## Navigation & Controls

From the main screen, navigation is keyboard-driven:
- **Arrows / `j`, `k`**: Move selection.
- **`Enter`**: Submit search or view details.
- **`d`**: Download to default directory (`Downloads/NinjaBits`).
- **`Shift + d`**: Download to a custom directory.
- **`y`**: Copy magnet link to system clipboard.
- **`o`**: Change default download path.
- **`p`**: Pause/resume download or seeding.
- **`?`**: Toggle help cheatsheet overlay.

---

## Content & Sources

NinjaBits groups results into clean navigation categories:

| Category | Target Content | Sources |
| --- | --- | --- |
| **Games** | PC repacks and releases | FitGirl, TPB, 1337x, BitTorrented, BitSearch |
| **Movies** | Curated HD encodes | YTS, TPB, 1337x, BitTorrented, BitSearch |
| **TV** | Episodes and series | EZTV, TPB, 1337x, BitTorrented, BitSearch |
| **Anime** | Subs and raws | Nyaa, SubsPlease, BitSearch |
| **Magazines** | Comics, eBooks, and publications | TPB, 1337x, Archive.org, BitTorrented, BitSearch |
| **Applications** | Windows, macOS, and Linux software | TPB, 1337x, Archive.org, BitTorrented, BitSearch |
| **Music** | Albums, tracks, and discographies | TPB, 1337x, Archive.org, BitTorrented, BitSearch |
| **Audio** | Sound clips, sample packs, and drumkits | TPB, Archive.org, BitTorrented, BitSearch |
| **ROMs** | Retro console game images | TPB, Archive.org, BitTorrented, BitSearch |
| **Adult** | Adult videos and pictures | TPB, 1337x, BitTorrented, BitSearch |

If a provider is down, the search moves on without hanging and displays which host is currently offline.

---

## Your downloads

Active downloads sit up top with their progress, speed, and time left; when one finishes it drops into Recently downloaded just below, so the list stays tidy. Everything's still there when you come back, and anything interrupted picks up where it left off.

Downloads run in the background while you keep searching, so you can queue up as many as you want. They save to your downloads folder, and the Downloads pane keeps tabs on each one; press `o` anytime to change where that is, or grab one result with `shift+d` to send it somewhere else without touching the default. When something finishes it keeps seeding automatically so the next person can find it too, and the Seeding tab lets you pause or stop that anytime.

<p align="center">
  <img src="preview/downloads.svg?v=1.5.1" alt="NinjaBits' Downloads pane: live progress on top, recently downloaded below" style="max-width: 832px; width: 100%; height: auto;">
</p>

---

## Headless Mode (Servers & Seedboxes)

NinjaBits can run headlessly as a background service:

- **Watch Mode**: Downloads anything dropped into a watched directory.
  ```sh
  ninjabits watch /path/to/watch --to /path/to/downloads --daemon
  ```
- **Serve Mode**: Starts a local REST API (POST `/add`, GET `/downloads`) on port `9161` to receive magnets.
  ```sh
  ninjabits serve --port 9161 --token secret --daemon
  ```
- **Files Mode**: Serves your downloaded files over a range-aware, read-only HTTP server on port `9160` (perfect for streaming to VLC or browser).
  ```sh
  ninjabits files --dir /path/to/downloads --port 9160 --daemon
  ```

---

## Developer Setup

To work on NinjaBits locally:

1. Clone the repository and install dependencies:
   ```sh
   git clone https://github.com/CLOUDWERX-DEV/NinjaBits
   cd NinjaBits
   npm install
   ```
2. Run development build (hot reloading):
   ```sh
   npm run dev
   ```
3. Run test suites and verify:
   ```sh
   npm test
   npm run typecheck
   ```
4. Build production bundle:
   ```sh
   npm run build
   ```

---

## Acknowledgements & Credits

NinjaBits is a fork of the excellent [torlink](https://github.com/baairon/torlink) project created by [bairon](https://github.com/baairon). We are extremely grateful to bairon and all original contributors for providing the solid terminal framework, WebTorrent integrations, and elegant design patterns that made this project possible.

---

## Privacy & Network

All torrent downloads happen directly over raw TCP/UDP P2P swarms (and WebRTC where available). No central servers act as middlemen. When downloads finish, they automatically seed back to the swarm by default. You can pause or adjust seeding configurations anytime in the **Seeding** panel. Always protect your network privacy with a VPN when accessing public P2P networks.
