import { useState } from "react";
import { View, Text, Pressable, Modal, TextInput, StyleSheet } from "react-native";
import { IDtoExerciseCatalog } from "@/types";
import { useStyles } from "@/context/ThemeContext";

interface ExerciseCatalogModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (dto: IDtoExerciseCatalog) => void;
}

export default function ExerciseCatalogModal({ visible, onClose, onCreate }: ExerciseCatalogModalProps) {
   const [text, setText] = useState("");
   const { MODAL_STYLES, COLORS } = useStyles();

   const styles = StyleSheet.create({
      ...MODAL_STYLES,
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
   });
   function handleCreate() {
      if (!text.trim()) return;
      onCreate({ nameExercise: text.trim() });
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

               <Text style={styles.title}>Добавить упражнение</Text>

               <TextInput
                  style={styles.input}
                  placeholder="Например, жим лёжа"
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
                  <Text style={styles.createButtonText}>Добавить в каталог</Text>
               </Pressable>
            </View>
         </View>
      </Modal>
   );
}
