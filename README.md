<p align="center">
  <img src="preview/splash.svg?v=1.6.7" alt="NinjaBits" style="max-width: 832px; width: 100%; height: auto;">
</p>

<p align="center">
  <b>Search & download torrents in total stealth—like a Ninja.</b>
</p>

---

Finding torrents today is a cesspool of spam, malicious redirects, fake download buttons, and annoying popups. **NinjaBits** slices through the noise. 

It is a zero-configuration, terminal-native torrent searcher, downloader, and client built to run in total stealth. No browser tabs. No ads. No malware traps. Just pure torrent search and instant retrieval straight from your command line.

<p align="center">
  <img src="preview/browse.svg?v=1.6.7" alt="NinjaBits Browse View" style="max-width: 832px; width: 100%; height: auto;">
</p>

## The Arsenal

*   ⚔️ **Stealth Search & Destroy**: Instantly queries multiple public indexers simultaneously. Search across YTS, EZTV, Nyaa, SubsPlease, FitGirl, 1337x, The Pirate Bay, BitSearch, BitTorrented, and SolidTorrents in one swift strike.
*   📂 **Multi-Category Mastery**: Seamlessly categorized search for Games, Movies, TV, Anime, Applications, Music, Audio, ROMs, Magazines, and Adult.
*   🎯 **Zero Config, Zero Drama**: No configuration files, no torrent client setup. It works out of the box with standard defaults. Run it instantly via `npx ninjabits`.
*   💨 **Silent Assassin (Headless Mode)**: Run it in the background as a directory watch daemon, HTTP REST API, or HTTP file streaming server.
*   🧵 **Tmux Integration**: Persistent background runs that you can attach or detach via SSH anytime using `attach`.

---

## Quick Start

You don't even need to install it to start searching. Just run:

```sh
npx ninjabits
```

### Global Installation (Recommended)

To run NinjaBits anywhere instantly:

```sh
npm install -g ninjabits
```

Once installed, just launch it:
```sh
ninjabits
```

### Direct Target Launch

You can also pass magnets or local torrent files directly on startup:
```sh
ninjabits "magnet:?xt=urn:btih:..."
ninjabits path/to/game.torrent
```

---

## Keyboard Controls

Navigate the interface entirely with your keyboard:

| Key | Action |
| --- | --- |
| **Arrows / `j`, `k`** | Move selection |
| **`Enter`** | Search / View torrent details |
| **`d`** | Download instantly to default folder (`Downloads/NinjaBits`) |
| **`Shift + d`** | Choose custom target folder for this download |
| **`y`** | Copy magnet link to system clipboard |
| **`o`** | Change default download folder path |
| **`p`** | Pause/resume download or seed item |
| **`?`** | Toggle cheatsheet overlay |

---

## Content & Indexers

NinjaBits routes your search to targeted providers depending on the category:

| Category | Target Content | Indexers Used |
| --- | --- | --- |
| **Games** | Trusted repacks only | FitGirl, TPB, 1337x, BitTorrented, BitSearch, SolidTorrents |
| **Movies** | Curated HD encodes | YTS, TPB, 1337x, BitTorrented, BitSearch, SolidTorrents |
| **TV** | Series & episodes | EZTV, TPB, 1337x, BitTorrented, BitSearch, SolidTorrents |
| **Anime** | Subbed & raw anime | Nyaa, SubsPlease, BitSearch |
| **Magazines** | Comics, eBooks, publications | TPB, 1337x, Archive.org, BitTorrented, BitSearch, SolidTorrents |
| **Applications** | Software (Windows, macOS, Linux) | TPB, 1337x, Archive.org, BitTorrented, BitSearch, SolidTorrents |
| **Music** | Albums, discographies | TPB, 1337x, Archive.org, BitTorrented, BitSearch, SolidTorrents |
| **Audio** | Sound clips, samples, drumkits | TPB, Archive.org, BitTorrented, BitSearch, SolidTorrents |
| **ROMs** | Retro console game images | TPB, Archive.org, BitTorrented, BitSearch, SolidTorrents |
| **Adult** | Adult videos and pictures | TPB, 1337x, BitTorrented, BitSearch, SolidTorrents |

If a provider is offline, the search continues without hanging and displays which host is down.

---

## Managing Downloads

Active downloads sit at the top of the pane with live progress, speed, and ETA. Completed downloads drop into the **Recently downloaded** list below to keep things clean. Interrupted downloads resume automatically when you restart.

Downloads seed back to the network automatically. You can pause, resume, or stop seeding any item in the **Seeding** panel.

<p align="center">
  <img src="preview/downloads.svg?v=1.6.7" alt="NinjaBits Downloads View" style="max-width: 832px; width: 100%; height: auto;">
</p>

---

## Headless Mode (Servers & Seedboxes)

Run NinjaBits headlessly behind the scenes:

*   **Watch Directory**: Automatically download torrents/magnets dropped in a folder:
    ```sh
    ninjabits watch /path/to/watch --to /path/to/downloads --daemon
    ```
*   **API Server**: Receive magnets remotely over a secure HTTP REST API on port `9161`:
    ```sh
    ninjabits serve --port 9161 --token secret --daemon
    ```
*   **Files Streamer**: Serve completed downloads over a range-aware, read-only HTTP server on port `9160` (perfect for streaming to VLC or browser):
    ```sh
    ninjabits files --dir /path/to/downloads --port 9160 --daemon
    ```

---

## Development

To set up and run NinjaBits locally:

1.  Clone the repository and install dependencies:
    ```sh
    git clone https://github.com/CLOUDWERX-DEV/NinjaBits
    cd NinjaBits
    npm install
    ```
2.  Start the development build with hot reloading:
    ```sh
    npm run dev
    ```
3.  Run tests and verify typings:
    ```sh
    npm test
    npm run typecheck
    ```
4.  Build the production bundle:
    ```sh
    npm run build
    ```

---

## Credits & Acknowledgements

NinjaBits is a hardened fork of the original [torlink](https://github.com/baairon/torlink) project created by [bairon](https://github.com/baairon). Huge respect to the original authors for laying down the solid terminal framework and elegant WebTorrent/Ink integration patterns.

---

## Privacy & Seeding Honor Code

Your files stay entirely on your disk. No central middleman server routes your traffic; you speak directly to the torrent swarm. 

P2P networks only work because people share. Once your download finishes, keep seeding by default. Share back, don't be a leech. If you need to stop, open the Seeding tab and press `p` to pause any item. 

Built by CLOUDWERX LAB. Support our work at [Buy Me A Coffee](https://buymeacoffee.com/cloudwerxl3).
