import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useStyles } from "@/context/ThemeContext";
import { useThemeActions } from "@/hooks/useThemeActions";
import SavedThemes from "./SavedThemes";

function Card() {
   const { COLORS, LIST_ITEM_STYLES } = useStyles();

   return (
      <View style={[styles.card, { borderColor: COLORS.border, backgroundColor: COLORS.surface }]}>
         <Text style={LIST_ITEM_STYLES.title}>Пример</Text>

         <View style={styles.badges}>
            <View style={[LIST_ITEM_STYLES.badge, LIST_ITEM_STYLES.heavyBadge]}>
               <Text style={[LIST_ITEM_STYLES.badgeText, LIST_ITEM_STYLES.heavyText]}>Тяжёлая</Text>
            </View>
            <View style={[LIST_ITEM_STYLES.badge, LIST_ITEM_STYLES.lightBadge]}>
               <Text style={[LIST_ITEM_STYLES.badgeText, LIST_ITEM_STYLES.lightText]}>Лёгкая</Text>
            </View>
         </View>
      </View>
   );
}

function Fields() {
   const { COLORS, FORM_STYLES } = useStyles();

   return (
      <View style={FORM_STYLES.row}>
         <View style={[FORM_STYLES.field, FORM_STYLES.flex, styles.field]}>
            <Text style={FORM_STYLES.input}>60</Text>
            <Text style={FORM_STYLES.secondaryText}>кг</Text>
         </View>

         <Text style={[styles.times, { color: COLORS.textSecondary }]}>×</Text>

         <View style={[FORM_STYLES.field, FORM_STYLES.flex, styles.field]}>
            <Text style={FORM_STYLES.input}>10</Text>
         </View>
      </View>
   );
}

function Buttons() {
   const { FORM_STYLES } = useStyles();

   return (
      <View style={FORM_STYLES.row}>
         <View style={[FORM_STYLES.secondaryButton, styles.button]}>
            <Text style={FORM_STYLES.secondaryButtonText}>Отмена</Text>
         </View>
         <View style={[FORM_STYLES.primaryButton, FORM_STYLES.flex, styles.button]}>
            <Text style={FORM_STYLES.primaryButtonText}>Сохранить</Text>
         </View>
      </View>
   );
}

function DangerBadge() {
   const { COLORS } = useStyles();

   return (
      <View style={[styles.dangerBadge, { backgroundColor: COLORS.dangerSoft }]}>
         <Text style={[styles.dangerText, { color: COLORS.danger }]}>Удалить</Text>
      </View>
   );
}

function ThemeActions() {
   const { FORM_STYLES, mode } = useStyles();
   const { randomize, toggleMode } = useThemeActions();

   return (
      <View style={styles.actions}>
         <Pressable onPress={randomize} style={[FORM_STYLES.primaryButton, styles.button, { flex: 1 }]}>
            <Text style={FORM_STYLES.primaryButtonText}>Случайная тема</Text>
         </Pressable>

         <Pressable onPress={toggleMode} style={[FORM_STYLES.secondaryButton, styles.button]}>
            <Text style={FORM_STYLES.secondaryButtonText}>{mode === "dark" ? "☀️" : "🌙"}</Text>
         </Pressable>
      </View>
   );
}

export default function Mock() {
   const { COLORS, SCREEN_STYLES } = useStyles();

   return (
      <View style={[SCREEN_STYLES.content, styles.screen]}>
         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <Text style={SCREEN_STYLES.title}>Пример</Text>

            <Card />

            <View style={[styles.form, { borderColor: COLORS.border, backgroundColor: COLORS.surface }]}>
               <Fields />
               <Buttons />
               <DangerBadge />
            </View>

            <SavedThemes />
         </ScrollView>

         <ThemeActions />
      </View>
   );
}

const styles = StyleSheet.create({
   screen: { paddingHorizontal: 16, paddingBottom: 12, gap: 12 },
   scroll: { gap: 20, paddingVertical: 12 },
   form: { gap: 16, padding: 12, borderRadius: 16, borderWidth: 1 },

   card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: 18,
      borderRadius: 16,
      borderWidth: 1,
   },
   badges: { flexDirection: "row", gap: 8 },

   field: { height: 56 },
   times: { fontSize: 18 },

   button: { height: 52, borderRadius: 16 },
   actions: { flexDirection: "row", gap: 8 },

   dangerBadge: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 24 },
   dangerText: { fontSize: 13, fontWeight: "700" },
});
