export const SPLASH_LOGO_LINES: readonly string[] = [
  " _______  .__            __      __________.__  __",
  " \\      \\ |__| ____     |__|____ \\______   \\__|/  |_  ______",
  " /   |   \\|  |/    \\    |  \\__  \\ |    |  _/  \\   __\\/  ___/",
  "/    |    \\  |   |  \\   |  |/ __ \\|    |   \\  ||  |  \\___ \\",
  "\\____|__  /__|___|  /\\__|  (____  /______  /__||__| /____  >",
  "        \\/        \\/\\______|    \\/       \\/              \\/",
];

export const SPLASH_LOGO_WIDTH = Math.max(...SPLASH_LOGO_LINES.map((l) => [...l].length));

export const COMPACT_LOGO_LINES: readonly string[] = [
  "▗▖  ▗▖▗▄▄▄▖▗▖  ▗▖   ▗▖ ▗▄▖ ▗▄▄▖ ▗▄▄▄▖▗▄▄▄▖▗▄▄▖",
  "▐▛▚▖▐▌  █  ▐▛▚▖▐▌   ▐▌▐▌ ▐▌▐▌ ▐▌  █    █ ▐▌   ",
  "▐▌ ▝▜▌  █  ▐▌ ▝▜▌   ▐▌▐▛▀▜▌▐▛▀▚▖  █    █  ▝▀▚▖",
  "▐▌  ▐▌▗▄█▄▖▐▌  ▐▌▗▄▄▞▘▐▌ ▐▌▐▙▄▞▘▗▄█▄▖  █ ▗▄▄▞▘",
];

export const COMPACT_LOGO_WIDTH = Math.max(...COMPACT_LOGO_LINES.map((l) => [...l].length));

// Compatibility exports
export const LOGO_LINES = COMPACT_LOGO_LINES;
export const LOGO_WIDTH = COMPACT_LOGO_WIDTH;
export const SPROUT_CELLS: ReadonlySet<string> = new Set();
