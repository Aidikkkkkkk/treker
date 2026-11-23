import { StyleSheet } from "react-native";

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
};
const COLORS = DARK_COLORS;
export type Palette = typeof COLORS;
export type Token = keyof typeof COLORS;

export const LABELS: Record<Token, string> = {
   background: "Фон экрана",
   surface: "Карточки",
   surfaceMuted: "Поля ввода",
   border: "Рамки",
   textPrimary: "Основной текст",
   textSecondary: "Подписи",
   textOnAccent: "Текст на кнопке",
   accent: "Кнопки",
   accentPressed: "Кнопки при нажатии",
   accentSoft: "Мягкий фон акцента",
   purple: "Второй цвет",
   purpleSoft: "Фон второго цвета",
   heavy: "Текст тяжёлой недели",
   heavySoft: "Фон тяжёлой недели",
   light: "Текст лёгкой недели",
   lightSoft: "Фон лёгкой недели",
   danger: "Удаление",
   dangerSoft: "Фон удаления",
   iconMuted: "Неактивные иконки",
   handle: "Полоска окна",
   overlay: "Затемнение",
};
export function makeStyles(colors: Palette) {
   const SCREEN_STYLES = StyleSheet.create({
      content: {
         flex: 1,
         width: "100%",
         maxWidth: 560,
         alignSelf: "center",
         backgroundColor: colors.background,
         paddingHorizontal: 18,
         paddingTop: 18,
      },
      keyboardView: { flex: 1, backgroundColor: colors.background },
      header: {
         minHeight: 44,
         flexDirection: "row",
         alignItems: "center",
         gap: 10,
         marginBottom: 6,
      },
      title: {
         color: colors.textPrimary,
         fontSize: 30,
         fontWeight: "800",
      },
   });

   const LIST_ITEM_STYLES = StyleSheet.create({
      row: {
         flexDirection: "column",
         alignItems: "flex-start",
         gap: 3,
         paddingRight: 36,
      },
      title: { color: colors.textPrimary, fontSize: 17, fontWeight: "700" },
      secondary: { color: colors.textSecondary, fontSize: 13, fontWeight: "500" },
      badge: { paddingHorizontal: 11, paddingVertical: 5, borderRadius: 24 },
      heavyBadge: { backgroundColor: colors.heavySoft },
      lightBadge: { backgroundColor: colors.lightSoft },
      badgeText: { fontSize: 12, fontWeight: "700" },
      heavyText: { color: colors.heavy },
      lightText: { color: colors.light },
   });

   const MODAL_STYLES = StyleSheet.create({
      overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: colors.overlay },
      modal: {
         width: "100%",
         maxWidth: 560,
         alignSelf: "center",
         backgroundColor: colors.surface,
         borderWidth: 1,
         borderColor: colors.border,
         borderTopLeftRadius: 28,
         borderTopRightRadius: 28,
         paddingHorizontal: 18,
         paddingTop: 10,
         paddingBottom: 18,
      },
      indicatorContainer: { alignItems: "center", marginBottom: 12 },
      indicator: { width: 44, height: 5, borderRadius: 10, backgroundColor: colors.handle },
      title: { color: colors.textPrimary, fontSize: 20, fontWeight: "700", marginBottom: 12 },
      createButton: {
         height: 48,
         width: "100%",
         borderRadius: 16,
         backgroundColor: colors.accent,
         justifyContent: "center",
         alignItems: "center",
      },
      createButtonDisabled: { opacity: 0.5 },
      createButtonText: { color: colors.textOnAccent, fontSize: 16, fontWeight: "700" },
   });

   const FORM_STYLES = StyleSheet.create({
      field: {
         height: 52,
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "center",
         gap: 4,
         borderRadius: 14,
         borderWidth: 1,
         borderColor: colors.border,
         backgroundColor: colors.surfaceMuted,
      },
      row: { flexDirection: "row", alignItems: "center", gap: 8 },
      flex: { flex: 1 },
      input: { minWidth: 36, color: colors.textPrimary, fontSize: 20, fontWeight: "700", textAlign: "center" },
      secondaryText: { color: colors.textSecondary, fontSize: 13, fontWeight: "700" },
      primaryButton: {
         height: 48,
         borderRadius: 14,
         backgroundColor: colors.accent,
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
      primaryButtonText: { color: colors.textOnAccent, fontSize: 16, fontWeight: "700" },
      secondaryButtonText: { color: colors.textSecondary, fontSize: 15, fontWeight: "600" },
      disabled: { opacity: 0.42 },
   });
   return {
      SCREEN_STYLES,
      MODAL_STYLES,
      FORM_STYLES,
      LIST_ITEM_STYLES,
      COLORS: colors,
   };
}
