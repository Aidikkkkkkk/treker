import { useState } from "react";
import { Text, Pressable, ScrollView, Alert, StyleSheet } from "react-native";
import { IDtoExercise, IDtoExerciseCatalog, IExerciseCatalogResult } from "@/types";
import CustomModal from "../global/CustomModal";
import { useStyles } from "@/context/ThemeContext";

interface ExerciseModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (dto: IDtoExercise) => void;
   onCreateCatalog: (dto: IDtoExerciseCatalog) => void;
   workout_id: number;
   catalog: IExerciseCatalogResult[];
}

export default function ExerciseModal({ visible, onClose, onCreate, workout_id, catalog }: ExerciseModalProps) {
   const { COLORS, MODAL_STYLES } = useStyles();
   const [selected, setSelected] = useState<string | null>(null);

   const styles = StyleSheet.create({
      ...MODAL_STYLES,
      chipsScroll: { maxHeight: 240, marginBottom: 14 },
      chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
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
   });

   function handleCreate() {
      if (!selected) {
         Alert.alert("Не выбрано упражнение");
         return;
      }
      onCreate({ workout_id: workout_id, nameExercise: selected });
      setSelected(null);
      onClose();
   }

   function handleClose() {
      setSelected(null);
      onClose();
   }
   return (
      <CustomModal visible={visible} title="Выбрать упражнение" onClose={handleClose}>
         {catalog.length > 0 && (
            <ScrollView
               style={styles.chipsScroll}
               contentContainerStyle={styles.chips}
               showsVerticalScrollIndicator={false}
               keyboardShouldPersistTaps="handled"
            >
               {catalog.map((item) => {
                  const isSelected = selected === item.nameExercise;
                  return (
                     <Pressable
                        key={item.id}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => {
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

         <Pressable style={[styles.createButton]} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Выбрать</Text>
         </Pressable>
      </CustomModal>
   );
}
