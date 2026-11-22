import { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { COLORS } from "@/styles";
import { IDtoRep, IRepResult } from "@/types";

interface RepFormProps {
   exercise_id: number;
   lastRep?: IRepResult;
   onCreate: (dto: IDtoRep) => Promise<void>;
}

export default function RepForm({ exercise_id, lastRep, onCreate }: RepFormProps) {
   const [open, setOpen] = useState(false);
   const [weight, setWeight] = useState("");
   const [reps, setReps] = useState("");

   function openForm() {
      setWeight(lastRep ? String(lastRep.weight) : "");
      setReps(lastRep ? String(lastRep.reps) : "");
      setOpen(true);
   }

   async function handleSave() {
      const repsNum = Number(reps) || 0;
      if (repsNum <= 0) return;

      await onCreate({
         exercise_id,
         weight: Number(weight.replace(",", ".")) || 0,
         reps: repsNum,
      });
      setOpen(false);
   }

   if (!open) {
      return (
         <Pressable style={styles.addButton} onPress={openForm}>
            <Text style={styles.addButtonText}>+</Text>
         </Pressable>
      );
   }

   return (
      <View style={styles.form}>
         <View style={styles.row}>
            <View style={[styles.field, styles.flex]}>
               <TextInput
                  style={styles.fieldInput}
                  value={weight}
                  onChangeText={(v) => setWeight(v.replace(/[^0-9.,]/g, ""))}
                  placeholder="0"
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="decimal-pad"
                  selectTextOnFocus
                  autoFocus
               />
               <Text style={styles.unit}>кг</Text>
            </View>

            <Text style={styles.times}>×</Text>

            <View style={[styles.field, styles.flex]}>
               <TextInput
                  style={styles.fieldInput}
                  value={reps}
                  onChangeText={(v) => setReps(v.replace(/[^0-9]/g, ""))}
                  placeholder="0"
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="number-pad"
                  selectTextOnFocus
               />
            </View>
         </View>

         <View style={styles.row}>
            <Pressable style={styles.cancelButton} onPress={() => setOpen(false)}>
               <Text style={styles.cancelText}>Отмена</Text>
            </Pressable>
            <Pressable
               style={[styles.saveButton, styles.flex, !(Number(reps) > 0) && styles.disabled]}
               onPress={handleSave}
               disabled={!(Number(reps) > 0)}
            >
               <Text style={styles.saveText}>Сохранить</Text>
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   addButton: {
      height: 56,
      borderRadius: 17,
      backgroundColor: COLORS.surfaceMuted,
      borderWidth: 1,
      borderColor: COLORS.border,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
   },
   addButtonText: {
      color: COLORS.textPrimary,
      fontSize: 28,
      fontWeight: "700",
      lineHeight: 32,
   },
   form: {
      gap: 10,
      marginTop: 12,
   },
   row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
   },
   flex: { flex: 1 },
   field: {
      height: 60,
      borderRadius: 17,
      backgroundColor: COLORS.surfaceMuted,
      borderWidth: 1,
      borderColor: COLORS.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
   },
   fieldInput: {
      minWidth: 40,
      color: COLORS.textPrimary,
      fontSize: 22,
      fontWeight: "700",
      textAlign: "center",
   },
   unit: {
      color: COLORS.textSecondary,
      fontSize: 13,
      fontWeight: "700",
   },
   times: {
      width: 16,
      color: COLORS.textSecondary,
      fontSize: 18,
      textAlign: "center",
   },
   saveButton: {
      height: 52,
      borderRadius: 17,
      backgroundColor: COLORS.accent,
      alignItems: "center",
      justifyContent: "center",
   },
   saveText: {
      color: COLORS.textPrimary,
      fontSize: 17,
      fontWeight: "700",
   },
   cancelButton: {
      height: 52,
      paddingHorizontal: 18,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
   },
   cancelText: {
      color: COLORS.textSecondary,
      fontSize: 16,
   },
   disabled: { opacity: 0.4 },
});
