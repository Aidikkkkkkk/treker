import { StyleSheet, Text, View, Pressable } from "react-native";
import { useMemo } from "react";
import { useStyles } from "@/context/ThemeContext";
interface Action {
   title: string;
   onPress: () => void;
}

interface CustomBottomBarProps {
   secondary: Action;
   primary: Action;
}

export default function CustomBottomBar({ secondary, primary }: CustomBottomBarProps) {
   const { COLORS } = useStyles();
   const styles = useMemo(
      () =>
         StyleSheet.create({
            bar: { flexDirection: "row", gap: 8, paddingVertical: 10 },
            button: { height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" },
            secondary: { flex: 1, backgroundColor: COLORS.surfaceMuted, borderWidth: 1, borderColor: COLORS.border },
            primary: { flex: 1.6, backgroundColor: COLORS.accent },
            secondaryText: { fontSize: 15, fontWeight: "600", color: COLORS.textPrimary },
            primaryText: { fontSize: 15, fontWeight: "700", color: COLORS.textOnAccent },
         }),
      [COLORS],
   );
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
