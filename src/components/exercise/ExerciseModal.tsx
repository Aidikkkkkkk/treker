import { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet, TextInput } from "react-native";
import { COLORS } from "@/styles";

interface ExerciseModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (workout_id: number, text: string) => void;
   workout_id: number;
}

export default function ExerciseModal({ visible, onClose, onCreate, workout_id }: ExerciseModalProps) {
   const [text, setText] = useState("");
   function handleCreate() {
      if (!text.trim()) return;
      onCreate(workout_id, text.trim());
      setText("");
      onClose();
   }

   function handleClose() {
      setText("");
      onClose();
   }

   return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
         <View style={styles.overlay}>
            <View style={styles.modal}>
               <View style={styles.indicatorContainer}>
                  <View style={styles.indicator} />
               </View>

               <Text style={styles.title}>Новая упражнение</Text>

               <TextInput
                  style={styles.input}
                  placeholder="Введите название тренировки"
                  placeholderTextColor={COLORS.textSecondary}
                  value={text}
                  onChangeText={setText}
                  multiline
               />

               <Pressable
                  style={[styles.createButton, !text.trim() && styles.createButtonDisabled]}
                  onPress={handleCreate}
                  disabled={!text.trim()}
               >
                  <Text style={styles.createButtonText}>Создать тренировку</Text>
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
      backgroundColor: "transparent",
   },
   modal: {
      backgroundColor: COLORS.surface,
      borderWidth: 1,
      borderColor: COLORS.border,
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
      backgroundColor: COLORS.handle,
   },
   title: {
      color: COLORS.textPrimary,
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 16,
   },
   input: {
      minHeight: 110,
      padding: 16,
      borderRadius: 17,
      backgroundColor: COLORS.surfaceMuted,
      borderWidth: 1,
      borderColor: COLORS.border,
      color: COLORS.textPrimary,
      fontSize: 16,
      textAlignVertical: "top",
      marginBottom: 18,
   },
   createButton: {
      height: 56,
      width: "100%",
      borderRadius: 40,
      backgroundColor: COLORS.accent,
      justifyContent: "center",
      alignItems: "center",
   },
   createButtonDisabled: {
      opacity: 0.5,
   },
   createButtonText: {
      color: COLORS.textOnAccent,
      fontSize: 17,
      fontWeight: "700",
   },
});
