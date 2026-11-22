import { StyleSheet } from "react-native";

export const LIGHT_COLORS = {
   background: "#F4F7F6",
   surface: "#FFFFFF",
   surfaceMuted: "#EDF3F1",
   border: "#DCE7E3",
   textPrimary: "#172522",
   textSecondary: "#687A76",
   textOnAccent: "#FFFFFF",
   accent: "#168D82",
   accentPressed: "#10766D",
   accentSoft: "#DEF1ED",
   purple: "#6750A4",
   purpleSoft: "#EEEAFE",
   heavy: "#FFFFFF",
   heavySoft: "#6750A4",
   light: "#6750A4",
   lightSoft: "#EEEAFE",
   danger: "#C84D5B",
   dangerSoft: "#FBEAEC",
   iconMuted: "#98A9A5",
   handle: "#C7D4D0",
   overlay: "rgba(23, 37, 34, 0.46)",
} as const;

export const DARK_COLORS = {
   background: "#111816",
   surface: "#19221F",
   surfaceMuted: "#22302C",
   border: "#31433E",
   textPrimary: "#EDF5F2",
   textSecondary: "#9DB0AA",
   textOnAccent: "#0B2420",
   accent: "#48C0B3",
   accentPressed: "#36A99D",
   accentSoft: "#183B35",
   purple: "#B9A7FF",
   purpleSoft: "#302B4C",
   heavy: "#171A1F",
   heavySoft: "#B9A7FF",
   light: "#B9A7FF",
   lightSoft: "#302B4C",
   danger: "#F08A95",
   dangerSoft: "#48282D",
   iconMuted: "#7F9690",
   handle: "#40534E",
   overlay: "rgba(0, 0, 0, 0.66)",
} as const;

/** Active palette. Switch between DARK_COLORS and LIGHT_COLORS. */
export const COLORS = DARK_COLORS;

export const SCREEN_STYLES = StyleSheet.create({
   content: {
      flex: 1,
      width: "100%",
      maxWidth: 560,
      alignSelf: "center",
      backgroundColor: COLORS.background,
      paddingHorizontal: 18,
      paddingTop: 18,
   },
   keyboardView: { flex: 1, backgroundColor: COLORS.background },
   header: {
      minHeight: 44,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 6,
   },
   title: {
      color: COLORS.textPrimary,
      fontSize: 30,
      fontWeight: "800",
   },
});

export const LIST_ITEM_STYLES = StyleSheet.create({
   row: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 3,
      paddingRight: 36,
   },
   title: { color: COLORS.textPrimary, fontSize: 17, fontWeight: "700" },
   secondary: { color: COLORS.textSecondary, fontSize: 13, fontWeight: "500" },
   badge: { paddingHorizontal: 11, paddingVertical: 5, borderRadius: 24 },
   heavyBadge: { backgroundColor: COLORS.heavySoft },
   lightBadge: { backgroundColor: COLORS.lightSoft },
   badgeText: { fontSize: 12, fontWeight: "700" },
   heavyText: { color: COLORS.heavy },
   lightText: { color: COLORS.light },
});

export const MODAL_STYLES = StyleSheet.create({
   overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: COLORS.overlay },
   modal: {
      width: "100%",
      maxWidth: 560,
      alignSelf: "center",
      backgroundColor: COLORS.surface,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 18,
      paddingTop: 10,
      paddingBottom: 18,
   },
   indicatorContainer: { alignItems: "center", marginBottom: 12 },
   indicator: { width: 44, height: 5, borderRadius: 10, backgroundColor: COLORS.handle },
   title: { color: COLORS.textPrimary, fontSize: 20, fontWeight: "700", marginBottom: 12 },
   createButton: {
      height: 48,
      width: "100%",
      borderRadius: 16,
      backgroundColor: COLORS.accent,
      justifyContent: "center",
      alignItems: "center",
   },
   createButtonDisabled: { opacity: 0.5 },
   createButtonText: { color: COLORS.textOnAccent, fontSize: 16, fontWeight: "700" },
});

export const FORM_STYLES = StyleSheet.create({
   field: {
      height: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.surfaceMuted,
   },
   row: { flexDirection: "row", alignItems: "center", gap: 8 },
   flex: { flex: 1 },
   input: { minWidth: 36, color: COLORS.textPrimary, fontSize: 20, fontWeight: "700", textAlign: "center" },
   secondaryText: { color: COLORS.textSecondary, fontSize: 13, fontWeight: "700" },
   primaryButton: {
      height: 48,
      borderRadius: 14,
      backgroundColor: COLORS.accent,
      alignItems: "center",
      justifyContent: "center",
   },
   secondaryButton: {
      height: 48,
      paddingHorizontal: 16,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
   },
   primaryButtonText: { color: COLORS.textOnAccent, fontSize: 16, fontWeight: "700" },
   secondaryButtonText: { color: COLORS.textSecondary, fontSize: 15, fontWeight: "600" },
   disabled: { opacity: 0.42 },
});
