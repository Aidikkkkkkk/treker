import { useStyles } from "@/context/ThemeContext";
import { StyleSheet } from "react-native";
import { Token, LABELS } from "@/styles";
import { View, Text } from "react-native";

export default function Tag({ tokens }: { tokens: Token[] }) {
   const { COLORS } = useStyles();
   const themed = StyleSheet.create({
      swatch: { width: 14, height: 14, borderRadius: 4, borderWidth: 1, borderColor: COLORS.border },
      tagText: { color: COLORS.textSecondary, fontSize: 12 },
   });

   return (
      <View style={staticStyles.tagRow}>
         {tokens.map((t) => (
            <View key={t} style={staticStyles.tag}>
               <View style={[themed.swatch, { backgroundColor: COLORS[t] }]} />
               <Text style={themed.tagText}>{LABELS[t]}</Text>
            </View>
         ))}
      </View>
   );
}
const staticStyles = StyleSheet.create({
   tagRow: { flexDirection: "row", flexWrap: "wrap", columnGap: 14, rowGap: 4 },
   tag: { flexDirection: "row", alignItems: "center", gap: 6 },
});
