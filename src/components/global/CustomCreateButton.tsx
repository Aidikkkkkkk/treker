import { View, Pressable, Text, StyleSheet } from "react-native";
import { MODAL_STYLES } from "@/styles";

type CustomCreateButtonProps = {
   title: string;
   onPress: () => void;
};

export default function CustomCreateButton({ title, onPress }: CustomCreateButtonProps) {
   return (
      <View style={styles.container}>
         <Pressable
            style={({ pressed }) => [MODAL_STYLES.createButton, pressed && styles.pressed]}
            onPress={onPress}
         >
            <Text style={MODAL_STYLES.createButtonText}>{title}</Text>
         </Pressable>
      </View>
   );
}

const styles = StyleSheet.create({
   container: { paddingVertical: 10 },
   pressed: { opacity: 0.82 },
});
