import { useStyles } from "@/context/ThemeContext";
import { Token, LABELS } from "@/styles";
import { View, Text, StyleSheet } from "react-native";

interface TagProps {
   tokens: Token[];
   onSelect?: (token: Token) => void;
}

export default function Tag({ tokens, onSelect }: TagProps) {
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
   tag: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#fff",
   },
});
