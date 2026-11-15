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
import { COLORS } from "@/styles";
import { IDtoSet } from "@/types";

interface SetDraft {
   weight: string;
   reps: string;
}

interface SetModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (dto: IDtoSet) => Promise<void>;
   exercise_id: number;
}

const MAX_SETS = 20;

export default function SetModal({ visible, onClose, onCreate, exercise_id }: SetModalProps) {
   const [countText, setCountText] = useState("");
   const [sets, setSets] = useState<SetDraft[]>([]);

   function handleCountChange(value: string) {
      const digits = value.replace(/[^0-9]/g, "");
      setCountText(digits);

      const count = Math.min(Number(digits) || 0, MAX_SETS);
      setSets((prev) => {
         if (count <= prev.length) return prev.slice(0, count);
         const last = prev[prev.length - 1] ?? { weight: "", reps: "" };
         const added = Array.from({ length: count - prev.length }, () => ({ ...last }));
         return [...prev, ...added];
      });
   }

   function updateSet(index: number, patch: Partial<SetDraft>) {
      setSets((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
   }

   function reset() {
      setCountText("");
      setSets([]);
   }

   async function handleCreate() {
      if (sets.length === 0) return;

      for (const set of sets) {
         await onCreate({
            exercise_id,
            replace: Number(set.weight.replace(",", ".")) || 0,
            count: Number(set.reps) || 0,
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

               {sets.length > 0 && (
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
                        {sets.map((set, index) => (
                           <View key={index} style={styles.setRow}>
                              <View style={styles.indexBadge}>
                                 <Text style={styles.indexText}>{index + 1}</Text>
                              </View>

                              <View style={[styles.field, styles.flex]}>
                                 <TextInput
                                    style={styles.fieldInput}
                                    placeholder="0"
                                    placeholderTextColor={COLORS.textSecondary}
                                    value={set.weight}
                                    onChangeText={(v) => updateSet(index, { weight: v.replace(/[^0-9.,]/g, "") })}
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
                                    value={set.reps}
                                    onChangeText={(v) => updateSet(index, { reps: v.replace(/[^0-9]/g, "") })}
                                    keyboardType="number-pad"
                                 />
                              </View>
                           </View>
                        ))}
                     </ScrollView>
                  </>
               )}

               <Pressable
                  style={[styles.createButton, sets.length === 0 && styles.createButtonDisabled]}
                  onPress={handleCreate}
                  disabled={sets.length === 0}
               >
                  <Text style={styles.createButtonText}>Создать </Text>
               </Pressable>
            </View>
         </KeyboardAvoidingView>
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
