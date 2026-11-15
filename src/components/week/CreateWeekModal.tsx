import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import CustomModal from "../global/CustomModal";
import { COLORS } from "@/styles";

interface CreateWeekModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (intensity: "light" | "heavy") => void;
}

export default function CreateWeekModal({ visible, onClose, onCreate }: CreateWeekModalProps) {
   const [intensity, setIntensity] = useState<"light" | "heavy">("light");

   function handleCreate() {
      onCreate(intensity);
      onClose();
   }

   return (
      <CustomModal visible={visible} title="Новая неделя" onClose={onClose}>
         <View style={styles.segment}>
            <Pressable
               onPress={() => setIntensity("light")}
               style={[styles.option, intensity === "light" && styles.lightActive]}
            >
               <Text style={[styles.optionText, intensity === "light" ? styles.lightText : styles.inactiveText]}>
                  Лёгкая
               </Text>
            </Pressable>

            <Pressable
               onPress={() => setIntensity("heavy")}
               style={[styles.option, intensity === "heavy" && styles.heavyActive]}
            >
               <Text style={[styles.optionText, intensity === "heavy" ? styles.heavyText : styles.inactiveText]}>
                  Тяжёлая
               </Text>
            </Pressable>
         </View>

         <Pressable style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Создать</Text>
         </Pressable>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   segment: {
      flexDirection: "row",
      backgroundColor: COLORS.surfaceMuted,
      borderRadius: 22,
      padding: 6,
      marginBottom: 18,
   },
   option: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 15,
      borderRadius: 17,
   },
   heavyActive: {
      backgroundColor: COLORS.heavySoft,
   },
   lightActive: {
      backgroundColor: COLORS.lightSoft,
   },
   optionText: {
      fontSize: 16,
      fontWeight: "700",
   },
   inactiveText: {
      color: COLORS.textSecondary,
   },
   heavyText: {
      color: COLORS.heavy,
   },
   lightText: {
      color: COLORS.light,
   },
   createButton: {
      height: 56,
      width: "100%",
      borderRadius: 40,
      backgroundColor: COLORS.accent,
      justifyContent: "center",
      alignItems: "center",
   },
   createButtonText: {
      color: COLORS.textOnAccent,
      fontSize: 17,
      fontWeight: "700",
   },
});
