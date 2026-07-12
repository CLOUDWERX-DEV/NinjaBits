const RAW_LOGO = String.raw` _______  .__            __      __________.__  __
 \      \ |__| ____     |__|____ \______   \__|/  |_  ______
 /   |   \|  |/    \    |  \__  \ |    |  _/  \   __\/  ___/
/    |    \  |   |  \   |  |/ __ \|    |   \  ||  |  \___ \
\____|__  /__|___|  /\__|  (____  /______  /__||__| /____  >
        \/        \/\______|    \/       \/              \/`;

export const LOGO_LINES: readonly string[] = RAW_LOGO.split("\n");

export const LOGO_WIDTH = Math.max(...LOGO_LINES.map((l) => [...l].length));

export const SPROUT_CELLS: ReadonlySet<string> = new Set();
