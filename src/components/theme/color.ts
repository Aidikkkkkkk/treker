import { Palette, DARK_COLORS } from "@/styles";

export type Scheme = "mono" | "complementary" | "triadic" | "analogous";
export type ThemeMode = "dark" | "light";

const SCHEMES: Scheme[] = ["mono", "complementary", "triadic", "analogous"];
const wrap = (h: number) => ((h % 360) + 360) % 360;

export function hexToHue(hex: string): number {
   const normalized = hex.replace("#", "");
   if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
      throw new Error(`Некорректный HEX-цвет: ${hex}`);
   }
   const r = parseInt(normalized.slice(0, 2), 16) / 255;
   const g = parseInt(normalized.slice(2, 4), 16) / 255;
   const b = parseInt(normalized.slice(4, 6), 16) / 255;
   const max = Math.max(r, g, b);
   const min = Math.min(r, g, b);
   const d = max - min;

   if (d === 0) return 0;

   let h: number;
   if (max === r) h = ((g - b) / d) % 6;
   else if (max === g) h = (b - r) / d + 2;
   else h = (r - g) / d + 4;

   return Math.round(wrap(h * 60));
}

export function hslToHex(h: number, s: number, l: number) {
   h = wrap(h);
   s = Math.max(0, Math.min(100, s));
   l = Math.max(0, Math.min(100, l));

   const saturation = s / 100;
   const lightness = l / 100;
   const a = saturation * Math.min(lightness, 1 - lightness);

   const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

      return Math.round(255 * color)
         .toString(16)
         .padStart(2, "0");
   };

   return `#${f(0)}${f(8)}${f(4)}`;
}

function luminance(hex: string) {
   const r = parseInt(hex.slice(1, 3), 16) / 255;
   const g = parseInt(hex.slice(3, 5), 16) / 255;
   const b = parseInt(hex.slice(5, 7), 16) / 255;

   const linear = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));

   return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

export function contrastRatio(a: string, b: string) {
   const l1 = luminance(a);
   const l2 = luminance(b);

   return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function contrastText(background: string) {
   const white = "#FFFFFF";
   const black = "#111111";

   return contrastRatio(background, white) >= contrastRatio(background, black) ? white : black;
}

function readableText(preferred: string, background: string, minimum = 4.5) {
   return contrastRatio(preferred, background) >= minimum ? preferred : contrastText(background);
}

export function generateTheme(h: number, scheme: Scheme = "mono", mode: ThemeMode = "dark"): Partial<Palette> {
   const hues = {
      mono: { second: h, heavy: h - 15, light: h + 15 },
      complementary: { second: h + 180, heavy: h + 180, light: h },
      triadic: { second: h + 120, heavy: h + 120, light: h + 240 },
      analogous: { second: h + 30, heavy: h - 30, light: h + 30 },
   }[scheme];

   const dark = mode === "dark";

   const background = hslToHex(h, 20, dark ? 8 : 97);
   const surface = hslToHex(h, 20, dark ? 13 : 100);
   const surfaceMuted = hslToHex(h, 18, dark ? 18 : 92);
   const border = hslToHex(h, 16, dark ? 26 : 82);

   const accent = hslToHex(h, 72, dark ? 62 : 48);
   const accentPressed = hslToHex(h, 72, dark ? 52 : 40);
   const accentSoft = hslToHex(h, 48, dark ? 22 : 90);

   const purple = hslToHex(hues.second, 65, dark ? 70 : 45);
   const purpleSoft = hslToHex(hues.second, 42, dark ? 22 : 92);

   const heavy = hslToHex(hues.heavy, 68, dark ? 75 : 42);
   const heavySoft = hslToHex(hues.heavy, 42, dark ? 22 : 91);

   const light = hslToHex(hues.light, 68, dark ? 75 : 42);
   const lightSoft = hslToHex(hues.light, 42, dark ? 22 : 91);

   const danger = hslToHex(0, 70, dark ? 68 : 46);
   const dangerSoft = hslToHex(0, 42, dark ? 22 : 94);

   return {
      background,
      surface,
      surfaceMuted,
      border,

      textPrimary: readableText(hslToHex(h, 12, dark ? 95 : 12), background),
      textSecondary: readableText(hslToHex(h, 10, dark ? 72 : 38), background),

      iconMuted: hslToHex(h, 10, dark ? 55 : 48),
      handle: hslToHex(h, 10, dark ? 38 : 70),

      accent,
      accentPressed,
      accentSoft,
      textOnAccent: contrastText(accent),

      purple,
      purpleSoft,

      heavy,
      heavySoft,
      light,
      lightSoft,

      danger,
      dangerSoft,
   };
}

export function randomTheme() {
   const h = Math.floor(Math.random() * 360);
   const scheme = SCHEMES[Math.floor(Math.random() * SCHEMES.length)];
   const mode: ThemeMode = Math.random() < 0.5 ? "dark" : "light";

   return {
      colors: { ...DARK_COLORS, ...generateTheme(h, scheme, mode) },
      scheme,
      mode,
   };
}
