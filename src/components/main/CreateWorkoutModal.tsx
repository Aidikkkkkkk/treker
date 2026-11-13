import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { useState } from "react";

interface CreateWorkoutModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (intensity: "light" | "heavy") => void;
}

export default function CreateWorkoutModal({ visible, onClose, onCreate }: CreateWorkoutModalProps) {
   const [intensity, setIntensity] = useState<"light" | "heavy">("light");

   return (
      <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
         <View style={styles.overlay}>
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

            <View style={styles.modal}>
               <View style={styles.indicatorContainer}>
                  <View style={styles.indicator} />
               </View>

               <Text style={styles.title}>Новая неделя</Text>

               <View style={styles.intensityContainer}>
                  <Pressable
                     onPress={() => setIntensity("heavy")}
                     style={[styles.option, intensity === "heavy" && styles.heavyActive]}
                  >
                     <Text style={[styles.optionText, intensity === "heavy" ? styles.heavyText : styles.inactiveText]}>
                        Тяжёлая
                     </Text>
                  </Pressable>

                  <Pressable
                     onPress={() => setIntensity("light")}
                     style={[styles.option, intensity === "light" && styles.lightActive]}
                  >
                     <Text style={[styles.optionText, intensity === "light" ? styles.lightText : styles.inactiveText]}>
                        Лёгкая
                     </Text>
                  </Pressable>
               </View>

               <Pressable style={styles.createButton} onPress={() => onCreate(intensity)}>
                  <Text style={styles.createButtonText}>Создать неделю</Text>
               </Pressable>
            </View>
         </View>
      </Modal>
   );
}

const styles = StyleSheet.create({
   overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
   },
   modal: {
      backgroundColor: "#17151f",
      borderWidth: 1,
      borderColor: "#302c40",
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 24,
   },
   indicatorContainer: {
      alignItems: "center",
      marginBottom: 16,
   },
   indicator: {
      width: 52,
      height: 6,
      borderRadius: 10,
      backgroundColor: "#393448",
   },
   title: {
      color: "#ece8f4",
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 16,
   },
   intensityContainer: {
      flexDirection: "row",
      backgroundColor: "#1b1924",
      borderRadius: 22,
      padding: 6,
      marginBottom: 18,
   },
   option: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 13,
      borderRadius: 17,
   },
   heavyActive: {
      backgroundColor: "#382519",
   },
   lightActive: {
      backgroundColor: "#2c214d",
   },
   optionText: {
      fontSize: 16,
      fontWeight: "700",
   },
   inactiveText: {
      color: "#a59fb5",
   },
   heavyText: {
      color: "#efb18d",
   },
   lightText: {
      color: "#c5b3ff",
   },
   createButton: {
      height: 56,
      width: "100%",
      borderRadius: 40,
      backgroundColor: "#a78bfa",
      justifyContent: "center",
      alignItems: "center",
   },
   createButtonText: {
      color: "#171020",
      fontSize: 17,
      fontWeight: "700",
   },
});
