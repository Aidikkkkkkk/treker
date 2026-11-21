import { useState } from "react";
import { View, Text, Pressable, Modal, ScrollView, TextInput } from "react-native";
import { COLORS, MODAL_STYLES } from "@/styles";
import { IDtoExercise, IDtoExerciseCatalog, IExerciseCatalogResult } from "@/types";

interface ExerciseModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (dto: IDtoExercise) => void;
   onCreateCatalog: (dto: IDtoExerciseCatalog) => void;
   workout_id: number;
   catalog: IExerciseCatalogResult[];
}

export default function ExerciseModal({
   visible,
   onClose,
   onCreate,
   onCreateCatalog,
   workout_id,
   catalog,
}: ExerciseModalProps) {
   const [selected, setSelected] = useState<string | null>(null);
   const [text, setText] = useState("");

   const newName = text.trim();
   const name = newName || selected;

   function reset() {
      setSelected(null);
      setText("");
   }

   function handleCreate() {
      if (!name) return;
      if (newName) onCreateCatalog({ nameExercise: newName });
      onCreate({ workout_id: workout_id, nameExercise: name });
      reset();
      onClose();
   }

   function handleClose() {
      reset();
      onClose();
   }

   return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
         <View style={styles.overlay}>
            <View style={styles.modal}>
               <View style={styles.indicatorContainer}>
                  <View style={styles.indicator} />
               </View>

               <Text style={styles.title}>Новое упражнение</Text>

               {catalog.length > 0 && (
                  <ScrollView
                     style={styles.chipsScroll}
                     contentContainerStyle={styles.chips}
                     showsVerticalScrollIndicator={false}
                     keyboardShouldPersistTaps="handled"
                  >
                     {catalog.map((item) => {
                        const isSelected = !newName && selected === item.nameExercise;
                        return (
                           <Pressable
                              key={item.id}
                              style={[styles.chip, isSelected && styles.chipSelected]}
                              onPress={() => {
                                 setText("");
                                 setSelected(isSelected ? null : item.nameExercise);
                              }}
                           >
                              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                                 {item.nameExercise}
                              </Text>
                           </Pressable>
                        );
                     })}
                  </ScrollView>
               )}

               <TextInput
                  style={styles.input}
                  placeholder={catalog.length ? "Или введи новое название" : "Например, жим лёжа"}
                  placeholderTextColor={COLORS.textSecondary}
                  value={text}
                  onChangeText={(v) => {
                     setText(v);
                     if (v.trim()) setSelected(null);
                  }}
               />

               <Pressable
                  style={[styles.createButton, !name && styles.createButtonDisabled]}
                  onPress={handleCreate}
                  disabled={!name}
               >
                  <Text style={styles.createButtonText}>Создать упражнение</Text>
               </Pressable>
            </View>
         </View>
      </Modal>
   );
}

const styles = {
   ...MODAL_STYLES,
   chipsScroll: { maxHeight: 240, marginBottom: 14 },
   chips: { flexDirection: "row" as const, flexWrap: "wrap" as const, gap: 8 },
   chip: {
      paddingHorizontal: 14,
      paddingVertical: 9,
      borderRadius: 14,
      backgroundColor: COLORS.surfaceMuted,
      borderWidth: 1,
      borderColor: COLORS.border,
   },
   chipSelected: { borderColor: COLORS.textPrimary },
   chipText: { fontSize: 14, color: COLORS.textSecondary },
   chipTextSelected: { color: COLORS.textPrimary },
   input: {
      padding: 16,
      borderRadius: 17,
      backgroundColor: COLORS.surfaceMuted,
      borderWidth: 1,
      borderColor: COLORS.border,
      color: COLORS.textPrimary,
      fontSize: 16,
      marginBottom: 18,
   },
};
