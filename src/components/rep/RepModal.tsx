import { useState } from "react";
import {
   View,
   Text,
   Pressable,
   Modal,
   StyleSheet,
   TextInput,
   ScrollView,
   KeyboardAvoidingView,
   Platform,
} from "react-native";
import { COLORS, MODAL_STYLES } from "@/styles";
import { IDtoRep } from "@/types";

interface RepDraft {
   weight: string;
   reps: string;
}

interface RepModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (dto: IDtoRep) => Promise<void>;
   exercise_id: number;
}

const MAX_REPS = 20;

export default function RepModal({ visible, onClose, onCreate, exercise_id }: RepModalProps) {
   const [countText, setCountText] = useState("");
   const [reps, setReps] = useState<RepDraft[]>([]);

   function handleCountChange(value: string) {
      const digits = value.replace(/[^0-9]/g, "");
      setCountText(digits);

      const count = Math.min(Number(digits) || 0, MAX_REPS);
      setReps((prev) => {
         if (count <= prev.length) return prev.slice(0, count);
         const last = prev[prev.length - 1] ?? { weight: "", reps: "" };
         const added = Array.from({ length: count - prev.length }, () => ({ ...last }));
         return [...prev, ...added];
      });
   }

   function updateRep(index: number, patch: Partial<RepDraft>) {
      setReps((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));
   }

   function reset() {
      setCountText("");
      setReps([]);
   }

   async function handleCreate() {
      if (reps.length === 0) return;

      for (const rep of reps) {
         await onCreate({
            exercise_id,
            weight: Number(rep.weight.replace(",", ".")) || 0,
            reps: Number(rep.reps) || 0,
         });
      }

      reset();
      onClose();
   }

   function handleClose() {
      reset();
      onClose();
   }

   return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
         <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <View style={styles.modal}>
               <View style={styles.indicatorContainer}>
                  <View style={styles.indicator} />
               </View>

               <Text style={styles.title}>Новые подходы</Text>

               <View style={styles.countRow}>
                  <Text style={styles.label}>Количество подходов</Text>
                  <TextInput
                     style={styles.countInput}
                     placeholder="0"
                     placeholderTextColor={COLORS.textSecondary}
                     value={countText}
                     onChangeText={handleCountChange}
                     keyboardType="number-pad"
                     maxLength={2}
                  />
               </View>

               {reps.length > 0 && (
                  <>
                     <View style={styles.headerRow}>
                        <Text style={[styles.headerText, styles.indexCol]}>№</Text>
                        <Text style={[styles.headerText, styles.flex]}>ВЕС</Text>
                        <Text style={styles.timesSpacer} />
                        <Text style={[styles.headerText, styles.flex]}>ПОВТ.</Text>
                     </View>

                     <ScrollView
                        style={styles.list}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                     >
                        {reps.map((rep, index) => (
                           <View key={index} style={styles.setRow}>
                              <View style={styles.indexBadge}>
                                 <Text style={styles.indexText}>{index + 1}</Text>
                              </View>

                              <View style={[styles.field, styles.flex]}>
                                 <TextInput
                                    style={styles.fieldInput}
                                    placeholder="0"
                                    placeholderTextColor={COLORS.textSecondary}
                                    value={rep.weight}
                                    onChangeText={(v) => updateRep(index, { weight: v.replace(/[^0-9.,]/g, "") })}
                                    keyboardType="decimal-pad"
                                 />
                                 <Text style={styles.unit}>кг</Text>
                              </View>

                              <Text style={styles.times}>×</Text>

                              <View style={[styles.field, styles.flex]}>
                                 <TextInput
                                    style={styles.fieldInput}
                                    placeholder="0"
                                    placeholderTextColor={COLORS.textSecondary}
                                    value={rep.reps}
                                    onChangeText={(v) => updateRep(index, { reps: v.replace(/[^0-9]/g, "") })}
                                    keyboardType="number-pad"
                                 />
                              </View>
                           </View>
                        ))}
                     </ScrollView>
                  </>
               )}

               <Pressable
                  style={[styles.createButton, reps.length === 0 && styles.createButtonDisabled]}
                  onPress={handleCreate}
                  disabled={reps.length === 0}
               >
                  <Text style={styles.createButtonText}>Создать </Text>
               </Pressable>
            </View>
         </KeyboardAvoidingView>
      </Modal>
   );
}

const styles = StyleSheet.create({
   ...MODAL_STYLES,

   countRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
   },
   label: {
      color: COLORS.textSecondary,
      fontSize: 16,
   },
   countInput: {
      width: 72,
      height: 48,
      borderRadius: 14,
      backgroundColor: COLORS.surfaceMuted,
      borderWidth: 1,
      borderColor: COLORS.border,
      color: COLORS.textPrimary,
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
   },
   headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
   },
   headerText: {
      color: COLORS.textSecondary,
      fontSize: 12,
      letterSpacing: 1.5,
      textAlign: "center",
   },
   indexCol: {
      width: 36,
   },
   timesSpacer: {
      width: 12,
   },
   flex: {
      flex: 1,
   },
   list: {
      maxHeight: 300,
      marginBottom: 12,
   },
   setRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
   },
   indexBadge: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: COLORS.surfaceMuted,
      alignItems: "center",
      justifyContent: "center",
   },
   indexText: {
      color: COLORS.textPrimary,
      fontSize: 15,
      fontWeight: "700",
   },
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
      width: 12,
      color: COLORS.textSecondary,
      fontSize: 16,
      textAlign: "center",
   },
});
