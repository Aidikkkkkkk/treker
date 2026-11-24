import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useStyles } from "@/context/ThemeContext";
import Tag from "./Tag";
import EditForm from "./EditFrom";

export default function Mock() {
   const { COLORS, SCREEN_STYLES, LIST_ITEM_STYLES, FORM_STYLES } = useStyles();

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
         gap: 12,
         padding: 16,
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
            <Text style={SCREEN_STYLES.title}>Пример</Text>
            <Tag tokens={["background", "textPrimary"]} />

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
            <Tag tokens={["surface", "border", "heavySoft", "heavy", "lightSoft", "light"]} />

            <View style={themed.form}>
               <EditForm>
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
               </EditForm>
               <Tag tokens={["surfaceMuted", "textSecondary"]} />

               <View style={FORM_STYLES.row}>
                  <View style={[FORM_STYLES.secondaryButton, staticStyles.button]}>
                     <Text style={FORM_STYLES.secondaryButtonText}>Отмена</Text>
                  </View>
                  <View style={[FORM_STYLES.primaryButton, FORM_STYLES.flex, staticStyles.button]}>
                     <Text style={FORM_STYLES.primaryButtonText}>Сохранить</Text>
                  </View>
               </View>
               <Tag tokens={["accent", "textOnAccent"]} />

               <View style={[staticStyles.dangerBadge, themed.dangerBadge]}>
                  <Text style={themed.dangerText}>Удалить</Text>
               </View>
               <Tag tokens={["danger", "dangerSoft"]} />
            </View>
         </ScrollView>
      </View>
   );
}
const staticStyles = StyleSheet.create({
   screen: { paddingHorizontal: 24 },
   scroll: { gap: 12, paddingVertical: 10 },
   badges: { flexDirection: "row", gap: 8 },
   field: { height: 56 },
   button: { height: 52, borderRadius: 16 },
   times: { fontSize: 18 },
   dangerBadge: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 24 },
});
