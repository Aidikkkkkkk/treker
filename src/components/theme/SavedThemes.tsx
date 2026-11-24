import { View, Text, Pressable } from "react-native";
import { useStyles, useSavedThemes } from "@/context/ThemeContext";

export default function SavedThemes() {
   const { COLORS } = useStyles();
   const { savedThemes, saveTheme, loadTheme, deleteTheme } = useSavedThemes();

   return (
      <View style={{ gap: 8 }}>
         <Text style={{ color: COLORS.textPrimary }}>Сохранённые темы</Text>

         <Pressable
            onPress={() => saveTheme(`Тема ${savedThemes.length + 1}`)}
            style={{ padding: 12, borderRadius: 10, backgroundColor: COLORS.accent }}
         >
            <Text style={{ color: COLORS.textOnAccent, textAlign: "center" }}>Сохранить тему</Text>
         </Pressable>

         {savedThemes.map((theme) => (
            <View
               key={theme.id}
               style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  padding: 8,
                  backgroundColor: COLORS.surfaceMuted,
                  borderRadius: 10,
               }}
            >
               <Pressable onPress={() => loadTheme(theme.id)} style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.textPrimary }}>{theme.name}</Text>
               </Pressable>

               <Pressable onPress={() => deleteTheme(theme.id)}>
                  <Text style={{ color: COLORS.danger }}>Удалить</Text>
               </Pressable>
            </View>
         ))}
      </View>
   );
}
