import { Box, Text } from "ink";
import { LOGO_LINES, LOGO_WIDTH } from "../logo";

type RGB = readonly [red: number, green: number, blue: number];

interface GradientStop {
  position: number;
  color: RGB;
}

const GRADIENT: readonly GradientStop[] = [
  { position: 0.00, color: [0, 82, 255] },     // Deep electric blue
  { position: 0.35, color: [46, 144, 255] },   // Bright blue
  { position: 0.68, color: [155, 215, 255] },  // Ice blue
  { position: 1.00, color: [255, 255, 255] },  // Pure white
];

function interpolate(start: number, end: number, amount: number): number {
  return Math.round(start + (end - start) * amount);
}

function colorAt(position: number): RGB {
  const normalized = Math.max(0, Math.min(1, position));

  for (let index = 0; index < GRADIENT.length - 1; index++) {
    const left = GRADIENT[index]!;
    const right = GRADIENT[index + 1]!;

    if (normalized <= right.position) {
      const range = right.position - left.position;
      const localPosition =
        range === 0 ? 0 : (normalized - left.position) / range;

      return [
        interpolate(left.color[0], right.color[0], localPosition),
        interpolate(left.color[1], right.color[1], localPosition),
        interpolate(left.color[2], right.color[2], localPosition),
      ];
    }
  }

  return GRADIENT.at(-1)!.color;
}

function rgbToHex([red, green, blue]: RGB): string {
  const c = (x: number) =>
    Math.max(0, Math.min(255, x))
      .toString(16)
      .padStart(2, "0");
  return `#${c(red)}${c(green)}${c(blue)}`;
}

export function Logo() {
  return (
    <Box flexDirection="column">
      {LOGO_LINES.map((line, row) => {
        const chars = [...line];
        return (
          <Box key={row}>
            {chars.map((ch, i) => {
              if (ch === " ") return <Text key={i}> </Text>;

              const position = LOGO_WIDTH <= 1 ? 0 : i / (LOGO_WIDTH - 1);
              const hexColor = rgbToHex(colorAt(position));

              return (
                <Text key={i} bold color={hexColor}>
                  {ch}
                </Text>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
