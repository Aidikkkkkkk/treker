import { View, Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "@/styles";

type CreateButtonDisignProps = {
   title: string;
   onPress: () => void;
};

export default function CreateButtonDisign({ title, onPress }: CreateButtonDisignProps) {
   return (
      <>
         <View style={styles.container}>
            <Pressable style={styles.button} onPress={onPress}>
               <Text style={styles.buttonText}>+ {title}</Text>
            </Pressable>
         </View>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 32,
      paddingBottom: 24,
      marginTop: 10,
      backgroundColor: COLORS.background,
   },
   button: {
      height: 66,
      width: "100%",
      borderRadius: 40,
      backgroundColor: COLORS.accent,
      justifyContent: "center",
      alignItems: "center",
   },
   buttonText: {
      color: COLORS.textOnAccent,
      fontSize: 18,
      fontWeight: "700",
   },
});
