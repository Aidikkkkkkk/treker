import { useMemo, useRef } from "react";
import { useStyles } from "@/context/ThemeContext";
import { ThemeMode, generateTheme, hexToHue, randomTheme } from "@/components/theme/color";

export function useThemeActions() {
   const { colors, mode, scheme, applyTheme } = useStyles();
   const latest = useRef({ colors, mode, scheme });
   latest.current = { colors, mode, scheme };
   return useMemo(
      () => ({
         randomize() {
            applyTheme(randomTheme());
         },
         toggleMode() {
            const { colors, mode, scheme } = latest.current;
            const next: ThemeMode = mode === "dark" ? "light" : "dark";

            applyTheme({
               mode: next,
               colors: generateTheme(hexToHue(colors.accent), scheme, next),
            });
         },
      }),
      [applyTheme],
   );
}
