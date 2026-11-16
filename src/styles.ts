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
   accent: "#087F83",
   accentPressed: "#06666A",
   accentSoft: "#E5F5F3",
   purple: "#6D28D9",
   purpleSoft: "#F0E9FF",
   heavy: "#FFFFFF",
   heavySoft: "#6D28D9",
   light: "#6D28D9",
   lightSoft: "#F0E9FF",
   danger: "#C94352",
   dangerSoft: "#FCEBED",
   iconMuted: "#9A94A3",
   handle: "#D8D3DF",
   overlay: "rgba(36, 31, 43, 0.48)",
} as const;

/** Reusable screen layout, aligned to the Week screen baseline. */
export const SCREEN_STYLES = StyleSheet.create({
   content: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingHorizontal: 28,
      paddingTop: 22,
   },
   header: {
      minHeight: 48,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 8,
   },
   title: {
      color: COLORS.textPrimary,
      fontSize: 34,
      fontWeight: "800",
   },
});

/** Common list-row typography and layout. */
export const LIST_ITEM_STYLES = StyleSheet.create({
   row: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 6,
      paddingRight: 38,
   },
   title: {
      color: COLORS.textPrimary,
      fontSize: 20,
      fontWeight: "700",
   },
   secondary: {
      color: COLORS.textSecondary,
      fontSize: 14,
      fontWeight: "500",
   },
   badge: {
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 30,
   },
   heavyBadge: { backgroundColor: COLORS.heavySoft },
   lightBadge: { backgroundColor: COLORS.lightSoft },
   badgeText: { fontSize: 14, fontWeight: "700" },
   heavyText: { color: COLORS.heavy },
   lightText: { color: COLORS.light },
});

/** Shared bottom-sheet shell for custom modals. */
export const MODAL_STYLES = StyleSheet.create({
   overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "transparent",
   },
   modal: {
      backgroundColor: COLORS.surface,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 24,
   },
   indicatorContainer: { alignItems: "center", marginBottom: 16 },
   indicator: {
      width: 52,
      height: 6,
      borderRadius: 10,
      backgroundColor: COLORS.handle,
   },
   title: {
      color: COLORS.textPrimary,
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 16,
   },
   createButton: {
      height: 56,
      width: "100%",
      borderRadius: 40,
      backgroundColor: COLORS.accent,
      justifyContent: "center",
      alignItems: "center",
   },
   createButtonDisabled: { opacity: 0.5 },
   createButtonText: {
      color: COLORS.textOnAccent,
      fontSize: 17,
      fontWeight: "700",
   },
});

export const ROOT_STYLES = StyleSheet.create({
   background: { backgroundColor: COLORS.background },
   mainText: { color: COLORS.textPrimary, fontSize: 28, fontWeight: "800" },
   subText: { color: COLORS.textSecondary, fontSize: 18 },
   card: { backgroundColor: COLORS.surface, borderColor: COLORS.border },
   button: { backgroundColor: COLORS.accent, color: COLORS.textOnAccent },
});
