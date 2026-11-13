import { StyleSheet } from "react-native";

/** Shared semantic color palette for the app. */
export const COLORS = {
   background: "#F7F7FA",
   surface: "#FFFFFF",
   surfaceMuted: "#F4F2F8",
   border: "#E9E6EE",

   textPrimary: "#241F2B",
   textSecondary: "#77727F",
   textOnAccent: "#FFFFFF",

   accent: "#6548C8",
   accentPressed: "#5539B4",
   accentSoft: "#F0ECFA",
   turquoise: "#087F83",
   turquoiseSoft: "#E5F5F3",

   heavy: "#A85A18",
   heavySoft: "#FFF2E5",
   danger: "#C94352",
   dangerSoft: "#FCEBED",

   iconMuted: "#9A94A3",
   handle: "#D8D3DF",
   overlay: "rgba(36, 31, 43, 0.48)",
} as const;

export const ROOT_STYLES = StyleSheet.create({
   background: {
      backgroundColor: COLORS.background,
   },

   mainText: {
      color: COLORS.textPrimary,
      fontSize: 28,
      fontWeight: "800",
   },

   subText: {
      color: COLORS.textSecondary,
      fontSize: 18,
   },

   card: {
      backgroundColor: COLORS.surface,
      borderColor: COLORS.border,
   },

   button: {
      backgroundColor: COLORS.accent,
      color: COLORS.textOnAccent,
   },
});
