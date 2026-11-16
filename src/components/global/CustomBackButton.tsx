import { useRouter, usePathname } from "expo-router";
import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "@/styles";

export default function CustomBackButton() {
   const router = useRouter();
   const pathname = usePathname();
   if (pathname === "/") return null;

   return (
      <Pressable
         onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
         style={({ pressed }) => [styles.button, pressed && styles.pressed]}
         accessibilityRole="button"
         accessibilityLabel="Назад"
      >
         <Text style={styles.text}>←</Text>
      </Pressable>
   );
}

const styles = StyleSheet.create({
   button: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: COLORS.surface,
      borderWidth: 1,
      borderColor: COLORS.border,
      alignItems: "center",
      justifyContent: "center",
   },
   pressed: { opacity: 0.65 },
   text: { color: COLORS.textPrimary, fontSize: 23, fontWeight: "600" },
});
