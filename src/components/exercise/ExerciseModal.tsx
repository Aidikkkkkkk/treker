import { useEffect, useState } from "react";
import { Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { EntityModalProps, IDtoExercise, IDtoExerciseChange, IExerciseCatalogResult } from "@/types";
import CustomModal from "../global/CustomModal";
import { useStyles } from "@/context/ThemeContext";

type ExerciseModalProps = EntityModalProps<Omit<IDtoExercise, "workout_id">, IDtoExerciseChange> & {
   catalog: IExerciseCatalogResult[];
};

export default function ExerciseModal(props: ExerciseModalProps) {
   const { COLORS } = useStyles();
   const initial = props.mode === "edit" ? props.initialData.nameExercise : null;
   const [selected, setSelected] = useState<string | null>(initial);

   useEffect(() => {
      if (props.visible) setSelected(initial);
   }, [props.visible, initial]);

   const styles = StyleSheet.create({
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

   function handleSubmit() {
      if (!selected) return;
      if (props.mode === "edit") props.onChange({ id: props.initialData.id, nameExercise: selected });
      else props.onCreate({ nameExercise: selected });
      props.onClose();
   }

   const isEditing = props.mode === "edit";

   return (
      <CustomModal
         visible={props.visible}
         title={isEditing ? "Изменить упражнение" : "Выбрать упражнение"}
         onClose={props.onClose}
         submit={{ title: isEditing ? "Сохранить" : "Выбрать", onPress: handleSubmit, disabled: !selected }}
      >
         {props.catalog.length > 0 && (
            <ScrollView
               style={styles.chipsScroll}
               contentContainerStyle={styles.chips}
               showsVerticalScrollIndicator={false}
               keyboardShouldPersistTaps="handled"
            >
               {props.catalog.map((item) => {
                  const isSelected = selected === item.nameExercise;
                  return (
                     <Pressable
                        key={item.id}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => setSelected(isSelected ? null : item.nameExercise)}
                     >
                        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                           {item.nameExercise}
                        </Text>
                     </Pressable>
                  );
               })}
            </ScrollView>
         )}
      </CustomModal>
   );
}
