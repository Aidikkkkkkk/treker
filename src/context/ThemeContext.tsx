import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeStyles, Palette, DARK_COLORS } from "@/styles";
import { Scheme, ThemeMode } from "@/components/theme/color";
import { GlobalError } from "@/components/global/GlobalError";

export interface SavedTheme {
   id: string;
   name: string;
   colors: Palette;
   mode: ThemeMode;
   scheme: Scheme;
}

interface ThemeState {
   colors: Palette;
   mode: ThemeMode;
   scheme: Scheme;
}

interface ThemePatch {
   colors?: Partial<Palette>;
   mode?: ThemeMode;
   scheme?: Scheme;
}

interface SavedThemesValue {
   savedThemes: SavedTheme[];
   saveTheme: (name: string) => void;
   renameTheme: (id: string, name: string) => void;
   loadTheme: (id: string) => void;
   deleteTheme: (id: string) => void;
}

type ThemeValue = ReturnType<typeof makeStyles> &
   ThemeState & {
      applyTheme: (patch: ThemePatch) => void;
   };

const THEME_KEY = "theme:v2";
const SAVED_KEY = "savedThemes";
const SAVE_DELAY = 400;
let reported = false;

function reportError(message: string, error: unknown) {
   console.warn(message, error); // в dev-режиме по-прежнему видно в консоли
   if (reported) return;
   reported = true;
   GlobalError.show({
      message,
      error: error instanceof Error ? error.message : String(error),
   });
}
const INITIAL: ThemeState = { colors: DARK_COLORS, mode: "dark", scheme: "mono" };

const ThemeContext = createContext<ThemeValue | undefined>(undefined);
const SavedThemesContext = createContext<SavedThemesValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const [state, setState] = useState<ThemeState>(INITIAL);
   const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);

   const hydrated = useRef(false);
   const stateRef = useRef(state);
   const savedRef = useRef(savedThemes);
   stateRef.current = state;
   savedRef.current = savedThemes;

   useEffect(() => {
      async function readStorage() {
         try {
            const [raw, saved] = await Promise.all([AsyncStorage.getItem(THEME_KEY), AsyncStorage.getItem(SAVED_KEY)]);

            if (raw) {
               const parsed = JSON.parse(raw);
               setState({
                  colors: { ...DARK_COLORS, ...parsed.colors },
                  mode: parsed.mode ?? "dark",
                  scheme: parsed.scheme ?? "mono",
               });
            }
            if (saved) setSavedThemes(JSON.parse(saved));
         } catch (error) {
            reportError("Не удалось загрузить тему", error);
         } finally {
            hydrated.current = true;
         }
      }
      readStorage();
   }, []);

   useEffect(() => {
      if (!hydrated.current) return;
      const timer = setTimeout(() => {
         AsyncStorage.setItem(THEME_KEY, JSON.stringify(state)).catch((error) =>
            reportError("Не удалось сохранить тему", error),
         );
      }, SAVE_DELAY);
      return () => clearTimeout(timer);
   }, [state]);

   useEffect(() => {
      if (!hydrated.current) return;
      AsyncStorage.setItem(SAVED_KEY, JSON.stringify(savedThemes)).catch((error) =>
         reportError("Не удалось сохранить библиотеку тем", error),
      );
   }, [savedThemes]);

   const applyTheme = useMemo(
      () => (patch: ThemePatch) =>
         setState((prev) => ({
            colors: patch.colors ? { ...prev.colors, ...patch.colors } : prev.colors,
            mode: patch.mode ?? prev.mode,
            scheme: patch.scheme ?? prev.scheme,
         })),
      [],
   );

   const savedActions = useMemo(
      () => ({
         saveTheme: (name: string) => {
            const normalized = name.trim();
            if (!normalized) return;
            const { colors, mode, scheme } = stateRef.current;
            const theme: SavedTheme = {
               id: `${Date.now()}`,
               name: normalized,
               colors: { ...colors },
               mode,
               scheme,
            };
            setSavedThemes((prev) => [...prev, theme]);
         },
         renameTheme: (id: string, name: string) => {
            const normalized = name.trim();
            if (!normalized) return;
            setSavedThemes((prev) => prev.map((item) => (item.id === id ? { ...item, name: normalized } : item)));
         },
         loadTheme: (id: string) => {
            const theme = savedRef.current.find((item) => item.id === id);
            if (!theme) return;
            applyTheme({ colors: theme.colors, mode: theme.mode, scheme: theme.scheme });
         },
         deleteTheme: (id: string) => setSavedThemes((prev) => prev.filter((item) => item.id !== id)),
      }),
      [applyTheme],
   );

   const styles = useMemo(() => makeStyles(state.colors), [state.colors]);
   const themeValue = useMemo<ThemeValue>(() => ({ ...styles, ...state, applyTheme }), [styles, state, applyTheme]);
   const savedValue = useMemo<SavedThemesValue>(() => ({ savedThemes, ...savedActions }), [savedThemes, savedActions]);
   return (
      <ThemeContext.Provider value={themeValue}>
         <SavedThemesContext.Provider value={savedValue}>{children}</SavedThemesContext.Provider>
      </ThemeContext.Provider>
   );
}

export function useStyles() {
   const ctx = useContext(ThemeContext);
   if (!ctx) throw new Error("useStyles должен использоваться внутри ThemeProvider");
   return ctx;
}

export function useSavedThemes() {
   const ctx = useContext(SavedThemesContext);
   if (!ctx) throw new Error("useSavedThemes должен использоваться внутри ThemeProvider");
   return ctx;
}
