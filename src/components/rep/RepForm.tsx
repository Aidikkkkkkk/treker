import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { IDtoRep, IRepResult } from "@/types";
import { useStyles } from "@/context/ThemeContext";

interface RepFormProps {
   exercise_id: number;
   lastRep?: IRepResult;
   onCreate: (dto: IDtoRep) => Promise<void>;
}

export default function RepForm({ exercise_id, lastRep, onCreate }: RepFormProps) {
   const [open, setOpen] = useState(false);
   const [weight, setWeight] = useState("");
   const [reps, setReps] = useState("");
   const { FORM_STYLES, COLORS } = useStyles();
   function openForm() {
      setWeight(lastRep ? String(lastRep.weight) : "");
      setReps(lastRep ? String(lastRep.reps) : "");
      setOpen(true);
   }

   async function handleSave() {
      const repsNum = Number(reps) || 0;
      if (repsNum <= 0) return;
      await onCreate({ exercise_id, weight: Number(weight.replace(",", ".")) || 0, reps: repsNum });
      setOpen(false);
   }

   if (!open) {
      return (
         <Pressable style={FORM_STYLES.primaryButton} onPress={openForm}>
            <Text style={FORM_STYLES.primaryButtonText}>+ Добавить подход</Text>
         </Pressable>
      );
   }

   return (
      <View>
         <View style={FORM_STYLES.row}>
            <View style={[FORM_STYLES.field, FORM_STYLES.flex]}>
               <TextInput
                  style={FORM_STYLES.input}
                  value={weight}
                  onChangeText={(value) => setWeight(value.replace(/[^0-9.,]/g, ""))}
                  placeholder="0"
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="decimal-pad"
                  selectTextOnFocus
                  autoFocus
               />
               <Text style={FORM_STYLES.secondaryText}>кг</Text>
            </View>
            <Text style={[FORM_STYLES.secondaryText, { width: 16, textAlign: "center" }]}>×</Text>
            <View style={[FORM_STYLES.field, FORM_STYLES.flex]}>
               <TextInput
                  style={FORM_STYLES.input}
                  value={reps}
                  onChangeText={(value) => setReps(value.replace(/[^0-9]/g, ""))}
                  placeholder="0"
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="number-pad"
                  selectTextOnFocus
               />
            </View>
         </View>

         <View style={[FORM_STYLES.row, { marginTop: 8 }]}>
            <Pressable style={FORM_STYLES.secondaryButton} onPress={() => setOpen(false)}>
               <Text style={FORM_STYLES.secondaryButtonText}>Отмена</Text>
            </Pressable>
            <Pressable
               style={[FORM_STYLES.primaryButton, FORM_STYLES.flex, !(Number(reps) > 0) && FORM_STYLES.disabled]}
               onPress={handleSave}
               disabled={!(Number(reps) > 0)}
            >
               <Text style={FORM_STYLES.primaryButtonText}>Сохранить</Text>
            </Pressable>
         </View>
      </View>
   );
}
