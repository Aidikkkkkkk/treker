import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeStyles } from "@/styles";
import { Palette, DARK_COLORS } from "@/styles";

interface ThemeValue {
   colors: Palette;
   setColors: (c: Palette) => void;
}

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const [colors, setState] = useState<Palette>(DARK_COLORS);

   useEffect(() => {
      async function readStorage() {
         try {
            const raw = await AsyncStorage.getItem("theme");
            if (raw) setState({ ...DARK_COLORS, ...JSON.parse(raw) });
         } catch {
            setState(DARK_COLORS);
         }
      }
      readStorage();
   }, []);

   function setColors(c: Palette) {
      setState(c);
      AsyncStorage.setItem("theme", JSON.stringify(c));
   }

   return <ThemeContext.Provider value={{ colors, setColors }}>{children}</ThemeContext.Provider>;
}

function useTheme() {
   const ctx = useContext(ThemeContext);
   if (!ctx) throw new Error("useTheme должен использоваться внутри ThemeProvider");
   return ctx;
}
export function useStyles() {
   const { colors } = useTheme();
   return useMemo(() => makeStyles(colors), [colors]);
}
