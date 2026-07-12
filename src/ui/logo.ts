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
  "888888ba  oo          oo           888888ba  oo   dP            ",
  "88    `8b                          88    `8b      88            ",
  "88     88 dP 88d888b. dP .d8888b. a88aaaa8P' dP d8888P .d8888b. ",
  "88     88 88 88'  `88 88 88'  `88  88   `8b. 88   88   Y8ooooo. ",
  "88     88 88 88    88 88 88.  .88  88    .88 88   88         88 ",
  "dP     dP dP dP    dP 88 `88888P8  88888888P dP   dP   `88888P' ",
  "                      88                                        ",
  "                      dP                                        ",
];

export const COMPACT_LOGO_WIDTH = Math.max(...COMPACT_LOGO_LINES.map((l) => [...l].length));

// Compatibility exports
export const LOGO_LINES = COMPACT_LOGO_LINES;
export const LOGO_WIDTH = COMPACT_LOGO_WIDTH;
export const SPROUT_CELLS: ReadonlySet<string> = new Set();
