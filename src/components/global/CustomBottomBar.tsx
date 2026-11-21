import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "@/styles";

interface Action {
   title: string;
   onPress: () => void;
}
interface CustomBottomBarProps {
   secondary: Action;
   primary: Action;
}

export default function CustomBottomBar({ secondary, primary }: CustomBottomBarProps) {
   return (
      <View style={styles.bar}>
         <Pressable style={[styles.button, styles.secondary]} onPress={secondary.onPress}>
            <Text style={styles.secondaryText}>{secondary.title}</Text>
         </Pressable>
         <Pressable style={[styles.button, styles.primary]} onPress={primary.onPress}>
            <Text style={styles.primaryText}>{primary.title}</Text>
         </Pressable>
      </View>
   );
}

const styles = StyleSheet.create({
   bar: { flexDirection: "row", gap: 12 },
   button: { height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" },
   secondary: {
      flex: 1,
      backgroundColor: COLORS.surfaceMuted,
      borderWidth: 1,
      borderColor: COLORS.border,
   },
   primary: { flex: 1.6, backgroundColor: "#0A7F83" }, // подставь свой бирюзовый из палитры
   secondaryText: { fontSize: 16, fontWeight: "600", color: COLORS.textPrimary },
   primaryText: { fontSize: 16, fontWeight: "600", color: "#fff" },
});
