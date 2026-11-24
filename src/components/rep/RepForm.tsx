import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { IDtoRep, IDtoRepChange, IRepResult } from "@/types";
import { useStyles } from "@/context/ThemeContext";

interface RepFormProps {
   lastRep?: IRepResult;
   editing: IDtoRepChange | null;
   onCreate: (dto: Omit<IDtoRep, "exercise_id">) => Promise<void>;
   onChange: (dto: IDtoRepChange) => Promise<void>;
   onCancelEdit: () => void;
}

export default function RepForm({ lastRep, editing, onCreate, onChange, onCancelEdit }: RepFormProps) {
   const [open, setOpen] = useState(false);
   const [weight, setWeight] = useState("");
   const [reps, setReps] = useState("");
   const { FORM_STYLES, COLORS } = useStyles();

   useEffect(() => {
      if (!editing) return;
      setWeight(String(editing.weight));
      setReps(String(editing.reps));
      setOpen(true);
   }, [editing]);

   function openForm() {
      setWeight(lastRep ? String(lastRep.weight) : "");
      setReps(lastRep ? String(lastRep.reps) : "");
      setOpen(true);
   }

   function closeForm() {
      setOpen(false);
      onCancelEdit();
   }

   async function handleSave() {
      const repsNum = Number(reps) || 0;
      if (repsNum <= 0) return;
      const weightNum = Number(weight.replace(",", ".")) || 0;
      if (editing) await onChange({ id: editing.id, weight: weightNum, reps: repsNum });
      else await onCreate({ weight: weightNum, reps: repsNum });
      closeForm();
   }

   if (!open) {
      return (
         <Pressable style={FORM_STYLES.primaryButton} onPress={openForm}>
            <Text style={FORM_STYLES.primaryButtonText}>+ Добавить подход</Text>
         </Pressable>
      );
   }

   const canSave = Number(reps) > 0;

   return (
      <View>
         <View style={FORM_STYLES.row}>
            <View style={[FORM_STYLES.field, FORM_STYLES.flex]}>
               <TextInput
                  style={FORM_STYLES.input}
                  value={weight}
                  onChangeText={(v) => setWeight(v.replace(/[^0-9.,]/g, ""))}
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
                  onChangeText={(v) => setReps(v.replace(/[^0-9]/g, ""))}
                  placeholder="0"
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="number-pad"
                  selectTextOnFocus
               />
            </View>
         </View>

         <View style={[FORM_STYLES.row, { marginTop: 8 }]}>
            <Pressable style={FORM_STYLES.secondaryButton} onPress={closeForm}>
               <Text style={FORM_STYLES.secondaryButtonText}>Отмена</Text>
            </Pressable>
            <Pressable
               style={[FORM_STYLES.primaryButton, FORM_STYLES.flex, !canSave && FORM_STYLES.disabled]}
               onPress={handleSave}
               disabled={!canSave}
            >
               <Text style={FORM_STYLES.primaryButtonText}>Сохранить</Text>
            </Pressable>
         </View>
      </View>
   );
}
