import { Palette } from "@/styles";

function hslToHex(h: number, s: number, l: number) {
   l /= 100;
   const a = (s * Math.min(l, 1 - l)) / 100;
   const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
         .toString(16)
         .padStart(2, "0");
   };
   return `#${f(0)}${f(8)}${f(4)}`;
}
export function rainbow(n: number, s = 80, l = 50) {
   return Array.from({ length: n }, (_, i) => hslToHex((360 / n) * i, s, l));
}
export function shades(h: number, n: number, s = 70) {
   return Array.from({ length: n }, (_, i) => hslToHex(h, s, 0 + (70 / (n - 1)) * i));
}
const wrap = (h: number) => ((h % 360) + 360) % 360;

export function harmony(h: number, s = 70, l = 50) {
   return {
      complementary: [h, h + 180].map((x) => hslToHex(wrap(x), s, l)),
      triadic: [h, h + 120, h + 240].map((x) => hslToHex(wrap(x), s, l)),
      analogous: [h - 30, h, h + 30].map((x) => hslToHex(wrap(x), s, l)),
   };
}
export function hexToHsl(hex: string) {
   const r = parseInt(hex.slice(1, 3), 16) / 255;
   const g = parseInt(hex.slice(3, 5), 16) / 255;
   const b = parseInt(hex.slice(5, 7), 16) / 255;

   const max = Math.max(r, g, b);
   const min = Math.min(r, g, b);
   const d = max - min;
   const l = (max + min) / 2;

   let h = 0;
   if (d !== 0) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
   }

   const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

   return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}
export function neutrals(n = 8) {
   return Array.from({ length: n }, (_, i) => hslToHex(0, 0, (100 / (n - 1)) * i));
}

export type Scheme = "mono" | "complementary" | "triadic" | "analogous";

const hsl = (h: number, s: number, l: number) => hslToHex(wrap(h), s, l);

export function generateTheme(h: number, scheme: Scheme): Partial<Palette> {
   const hues = {
      mono: { second: h, heavy: h - 15, light: h + 15 },
      complementary: { second: h + 180, heavy: h + 180, light: h },
      triadic: { second: h + 120, heavy: h + 120, light: h + 240 },
      analogous: { second: h + 30, heavy: h - 30, light: h + 30 },
   }[scheme];

   return {
      background: hsl(h, 25, 8),
      surface: hsl(h, 25, 13),
      surfaceMuted: hsl(h, 22, 18),
      border: hsl(h, 20, 24),
      textPrimary: hsl(h, 15, 94),
      textSecondary: hsl(h, 10, 68),
      iconMuted: hsl(h, 10, 45),
      handle: hsl(h, 10, 35),
      // главный акцент
      accent: hsl(h, 75, 60),
      accentPressed: hsl(h, 75, 50),
      accentSoft: hsl(h, 50, 20),
      textOnAccent: hsl(h, 30, 8),
      // второй цвет
      purple: hsl(hues.second, 65, 65),
      purpleSoft: hsl(hues.second, 40, 20),
      // недели
      heavy: hsl(hues.heavy, 70, 68),
      heavySoft: hsl(hues.heavy, 45, 18),
      light: hsl(hues.light, 70, 68),
      lightSoft: hsl(hues.light, 45, 18),
      // удаление: смысловой цвет, от оттенка не зависит
      danger: hsl(0, 75, 62),
      dangerSoft: hsl(0, 45, 18),
      // overlay не трогаю: не знаю его формат (rgba)
   };
}
export function randomTheme() {
   const schemes: Scheme[] = ["mono", "complementary", "triadic", "analogous"];
   const h = Math.floor(Math.random() * 360);
   return generateTheme(h, schemes[Math.floor(Math.random() * schemes.length)]);
}
