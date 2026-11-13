import { Pressable, Text, StyleSheet } from "react-native";

interface CreateButtonProps {
   onPress: () => void;
}

export default function CreateButton({ onPress }: CreateButtonProps) {
   return (
      <Pressable style={styles.button} onPress={onPress}>
         <Text style={styles.buttonText}>+ Новая неделя</Text>
      </Pressable>
   );
}

const styles = StyleSheet.create({
   button: {
      height: 66,
      width: "100%",
      borderRadius: 40,
      backgroundColor: "#a78bfa",
      justifyContent: "center",
      alignItems: "center",
   },
   buttonText: {
      color: "#171020",
      fontSize: 18,
      fontWeight: "700",
   },
});
