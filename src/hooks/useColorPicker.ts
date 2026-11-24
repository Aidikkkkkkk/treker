import { Token } from "@/styles";
import { generateTheme, Scheme } from "@/components/theme/color";
import { useMemo, useState } from "react";
import { useStyles } from "@/context/ThemeContext";
import { hexToHsl } from "@/components/theme/color";

export function useColorPicker(tokens: Token[]) {
   const { COLORS, setToken, setTokens, resetToken } = useStyles();
   const [selected, setSelected] = useState<Token>(tokens[0]);
   const [baseHue, setBaseHue] = useState(() => hexToHsl(COLORS[tokens[0]]).h);

   const current = COLORS[selected];
   const hslData = useMemo(() => hexToHsl(current), [current]);

   function select(t: Token) {
      setSelected(t);
      setBaseHue(hexToHsl(COLORS[t]).h);
   }
   function pick(hex: string) {
      setToken(selected, hex);
      setBaseHue(hexToHsl(hex).h);
   }
   function applyScheme(scheme: Scheme) {
      setTokens(generateTheme(baseHue, scheme));
   }

   return {
      selected,
      current,
      hsl: hslData,
      baseHue,
      select,
      pick,
      applyScheme,
      reset: () => resetToken(selected),
   };
}
