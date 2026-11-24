import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { useStyles } from "@/context/ThemeContext";
import Tag from "./Tag";
import PaletteForm from "./PaletteFrom";
import { randomTheme } from "./color";

export default function Mock() {
   const { COLORS, SCREEN_STYLES, LIST_ITEM_STYLES, FORM_STYLES, setTokens } = useStyles();

   const themed = StyleSheet.create({
      card: {
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-between",
         paddingVertical: 14,
         paddingHorizontal: 18,
         borderRadius: 16,
         borderWidth: 1,
         borderColor: COLORS.border,
         backgroundColor: COLORS.surface,
      },
      form: {
         gap: 16,
         padding: 12,
         borderRadius: 16,
         borderWidth: 1,
         borderColor: COLORS.border,
         backgroundColor: COLORS.surface,
      },
      times: { color: COLORS.textSecondary },
      dangerBadge: { backgroundColor: COLORS.dangerSoft },
      dangerText: { color: COLORS.danger, fontSize: 13, fontWeight: "700" },
   });

   return (
      <View style={[SCREEN_STYLES.content, staticStyles.screen]}>
         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={staticStyles.scroll}>
            <View style={staticStyles.block}>
               <PaletteForm title="Фон и текст" tokens={["background", "textPrimary"]}>
                  <Text style={SCREEN_STYLES.title}>Пример</Text>
               </PaletteForm>
               <Tag tokens={["background", "textPrimary"]} />
            </View>

            <View style={staticStyles.block}>
               <PaletteForm title="Карточка" tokens={["surface", "border", "heavySoft", "heavy", "lightSoft", "light"]}>
                  <View style={themed.card}>
                     <Text style={LIST_ITEM_STYLES.title}>Пример</Text>
                     <View style={staticStyles.badges}>
                        <View style={[LIST_ITEM_STYLES.badge, LIST_ITEM_STYLES.heavyBadge]}>
                           <Text style={[LIST_ITEM_STYLES.badgeText, LIST_ITEM_STYLES.heavyText]}>Тяжёлая</Text>
                        </View>
                        <View style={[LIST_ITEM_STYLES.badge, LIST_ITEM_STYLES.lightBadge]}>
                           <Text style={[LIST_ITEM_STYLES.badgeText, LIST_ITEM_STYLES.lightText]}>Лёгкая</Text>
                        </View>
                     </View>
                  </View>
               </PaletteForm>
               <Tag tokens={["surface", "border", "heavySoft", "heavy", "lightSoft", "light"]} />
            </View>

            <View style={themed.form}>
               <View style={staticStyles.block}>
                  <PaletteForm title="Поля ввода" tokens={["surfaceMuted", "textSecondary"]}>
                     <View style={FORM_STYLES.row}>
                        <View style={[FORM_STYLES.field, FORM_STYLES.flex, staticStyles.field]}>
                           <Text style={FORM_STYLES.input}>60</Text>
                           <Text style={FORM_STYLES.secondaryText}>кг</Text>
                        </View>
                        <Text style={[staticStyles.times, themed.times]}>×</Text>
                        <View style={[FORM_STYLES.field, FORM_STYLES.flex, staticStyles.field]}>
                           <Text style={FORM_STYLES.input}>10</Text>
                        </View>
                     </View>
                  </PaletteForm>
                  <Tag tokens={["surfaceMuted", "textSecondary"]} />
               </View>

               <View style={staticStyles.block}>
                  <PaletteForm title="Кнопки" tokens={["accent", "textOnAccent"]}>
                     <View style={FORM_STYLES.row}>
                        <View style={[FORM_STYLES.secondaryButton, staticStyles.button]}>
                           <Text style={FORM_STYLES.secondaryButtonText}>Отмена</Text>
                        </View>
                        <View style={[FORM_STYLES.primaryButton, FORM_STYLES.flex, staticStyles.button]}>
                           <Text style={FORM_STYLES.primaryButtonText}>Сохранить</Text>
                        </View>
                     </View>
                  </PaletteForm>
                  <Tag tokens={["accent", "textOnAccent"]} />
               </View>

               <View style={staticStyles.block}>
                  <PaletteForm title="Опасное действие" tokens={["danger", "dangerSoft"]}>
                     <View style={[staticStyles.dangerBadge, themed.dangerBadge]}>
                        <Text style={themed.dangerText}>Удалить</Text>
                     </View>
                  </PaletteForm>
                  <Tag tokens={["danger", "dangerSoft"]} />
               </View>
            </View>
         </ScrollView>

         <Pressable onPress={() => setTokens(randomTheme())} style={[FORM_STYLES.primaryButton, staticStyles.button]}>
            <Text style={FORM_STYLES.primaryButtonText}>Случайный цвет</Text>
         </Pressable>
      </View>
   );
}

const staticStyles = StyleSheet.create({
   screen: { paddingHorizontal: 16, paddingBottom: 12, gap: 12 },
   scroll: { gap: 20, paddingVertical: 12 },
   block: { gap: 6 },
   badges: { flexDirection: "row", gap: 8 },
   field: { height: 56 },
   button: { height: 52, borderRadius: 16 },
   times: { fontSize: 18 },
   dangerBadge: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 24 },
});
