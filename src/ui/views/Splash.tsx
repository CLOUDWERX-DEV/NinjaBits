import { Box, Text, useInput, useStdin } from "ink";
import { Logo } from "../components/Logo";
import { SearchBar } from "../components/SearchBar";
import { SPLASH_LOGO_WIDTH } from "../logo";
import { useStore } from "../store";
import { sourcesByGroup } from "../../sources/registry";
import { COLOR, ICON } from "../theme";
import { VERSION } from "../../version";

const groups = sourcesByGroup().map((g) => g.group.toLowerCase());
const line1 = groups.slice(0, 7).join(`  ${ICON.dot}  `);
const line2 = groups.slice(7).join(`  ${ICON.dot}  `);

export function Splash() {
  const { submitQuery, quitAll, cols, rows } = useStore();
  const { isRawModeSupported } = useStdin();

  useInput(
    (input, key) => {
      if (key.escape || (key.ctrl && input === "c")) quitAll();
    },
    { isActive: isRawModeSupported },
  );

  const showLogo = cols >= SPLASH_LOGO_WIDTH + 2;
  const barWidth = Math.max(24, Math.min(cols - 6, 62));

  return (
    <Box
      height={Math.max(1, rows - 1)}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {showLogo ? (
        <Logo type="splash" />
      ) : (
        <Text bold color={COLOR.accent}>
          NinjaBits
        </Text>
      )}
      <Box marginTop={2}>
        <Text color={COLOR.text}>Search & download torrents in total stealth—like a Ninja.</Text>
      </Box>
      <Box flexDirection="column" alignItems="center">
        <Text dimColor>{line1}</Text>
        <Text dimColor>{line2}</Text>
      </Box>

      <Box marginTop={1} width={barWidth}>
        <SearchBar
          width={barWidth}
          value=""
          editing
          placeholder="Search or paste a magnet link…"
          onSubmit={submitQuery}
        />
      </Box>
      <Box marginTop={1}>
        <Text>
          <Text color={COLOR.alt}>↵</Text>
          <Text dimColor> search</Text>
          <Text dimColor>{`  ${ICON.dot}  `}</Text>
          <Text dimColor>empty </Text>
          <Text color={COLOR.alt}>↵</Text>
          <Text dimColor> browse</Text>
          <Text dimColor>{`  ${ICON.dot}  `}</Text>
          <Text color={COLOR.alt}>^c</Text>
          <Text dimColor> quit</Text>
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text dimColor>
          v{VERSION}  ·  by <Text color={COLOR.accent} bold>CLOUDWERX LAB</Text>
        </Text>
      </Box>
    </Box>
  );
}
