import { useRouter, usePathname } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomBackButton() {
   const router = useRouter();
   const pathname = usePathname();
   const insets = useSafeAreaInsets(); // Учитываем челку / статус-бар

   // Не показываем кнопку на главном экране
   if (pathname === "/") {
      return null;
   }

   return (
      <TouchableOpacity
         onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
         style={[styles.button, { top: insets.top + 10 }]}
      >
         <Text style={styles.text}>← Назад</Text>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      position: "absolute",
      left: 16,
      zIndex: 10, // Чтобы кнопка была поверх контента экранов
      padding: 8,
      backgroundColor: "#eee",
      borderRadius: 8,
   },
   text: {
      fontSize: 16,
      fontWeight: "600",
   },
});
