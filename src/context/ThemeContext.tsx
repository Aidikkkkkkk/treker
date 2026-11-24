import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeStyles } from "@/styles";
import { Palette, DARK_COLORS, Token } from "@/styles";

interface ThemeValue {
   colors: Palette;
   setColors: (c: Palette) => void;
   setToken: (t: Token, value: string) => void;
   setTokens: (patch: Partial<Palette>) => void;
   resetToken: (t: Token) => void;
}

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const [colors, setState] = useState<Palette>(DARK_COLORS);
   const colorsRef = useRef<Palette>(DARK_COLORS);

   useEffect(() => {
      async function readStorage() {
         try {
            const raw = await AsyncStorage.getItem("theme");
            if (raw) {
               const loaded = { ...DARK_COLORS, ...JSON.parse(raw) };
               colorsRef.current = loaded;
               setState(loaded);
            }
         } catch {
            colorsRef.current = DARK_COLORS;
            setState(DARK_COLORS);
         }
      }
      readStorage();
   }, []);

   async function setColors(c: Palette) {
      colorsRef.current = c;
      setState(c);
      await AsyncStorage.setItem("theme", JSON.stringify(c));
   }
   function setTokens(patch: Partial<Palette>) {
      setColors({ ...colorsRef.current, ...patch });
   }
   function setToken(t: Token, value: string) {
      setTokens({ [t]: value });
   }
   function resetToken(t: Token) {
      setTokens({ [t]: DARK_COLORS[t] });
   }

   return (
      <ThemeContext.Provider value={{ colors, setColors, setToken, setTokens, resetToken }}>
         {children}
      </ThemeContext.Provider>
   );
}

function useTheme() {
   const ctx = useContext(ThemeContext);
   if (!ctx) throw new Error("useTheme должен использоваться внутри ThemeProvider");
   return ctx;
}
export function useStyles() {
   const { colors, setToken, setTokens, resetToken } = useTheme();
   return useMemo(() => ({ ...makeStyles(colors), setToken, setTokens, resetToken }), [colors]);
}
