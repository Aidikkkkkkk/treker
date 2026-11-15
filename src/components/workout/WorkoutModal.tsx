import { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet, Platform } from "react-native";
import DateTimePicker, { DateTimePickerChangeEvent } from "@react-native-community/datetimepicker";

import { COLORS } from "@/styles";

interface WorkoutModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (date: Date) => void;
}

export default function CreateWorkoutModal({ visible, onClose, onCreate }: WorkoutModalProps) {
   const [date, setDate] = useState(new Date());
   const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);

   function handleValueChange(_event: DateTimePickerChangeEvent, selected: Date) {
      setDate(selected > new Date() ? new Date() : selected);

      if (Platform.OS === "android") {
         setPickerMode(null);
      }
   }

   function handleCreate() {
      onCreate(date);
      setPickerMode(null);
      onClose();
   }

   function handleClose() {
      setPickerMode(null);
      onClose();
   }

   return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
         <View style={styles.overlay}>
            <View style={styles.modal}>
               <View style={styles.indicatorContainer}>
                  <View style={styles.indicator} />
               </View>

               <Text style={styles.title}>Дата и время</Text>

               <View style={styles.dateTimeRow}>
                  <Pressable
                     style={[styles.dateTimeCell, pickerMode === "date" && styles.dateTimeCellActive]}
                     onPress={() => setPickerMode("date")}
                  >
                     <Text style={styles.cellLabel}>Дата</Text>
                     <Text style={styles.dateRowText}>{date.toLocaleDateString("ru-RU")}</Text>
                  </Pressable>

                  <Pressable
                     style={[styles.dateTimeCell, pickerMode === "time" && styles.dateTimeCellActive]}
                     onPress={() => setPickerMode("time")}
                  >
                     <Text style={styles.cellLabel}>Время</Text>
                     <Text style={styles.dateRowText}>
                        {date.toLocaleTimeString("ru-RU", {
                           hour: "2-digit",
                           minute: "2-digit",
                        })}
                     </Text>
                  </Pressable>
               </View>

               {pickerMode && (
                  <DateTimePicker
                     value={date}
                     mode={pickerMode}
                     is24Hour
                     display={Platform.OS === "ios" ? "spinner" : "default"}
                     themeVariant="light"
                     maximumDate={new Date()}
                     onValueChange={handleValueChange}
                     onDismiss={() => setPickerMode(null)}
                  />
               )}

               <Pressable style={styles.createButton} onPress={handleCreate}>
                  <Text style={styles.createButtonText}>Создать неделю</Text>
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
   dateTimeRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 18,
   },
   dateTimeCell: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 15,
      borderRadius: 17,
      backgroundColor: COLORS.surfaceMuted,
      borderWidth: 1,
      borderColor: "transparent",
   },
   dateTimeCellActive: {
      borderColor: COLORS.accent,
   },
   cellLabel: {
      color: COLORS.textSecondary,
      fontSize: 13,
      marginBottom: 5,
   },
   dateRowText: {
      color: COLORS.textPrimary,
      fontSize: 16,
      fontWeight: "600",
   },
   createButton: {
      height: 56,
      width: "100%",
      borderRadius: 40,
      backgroundColor: COLORS.accent,
      justifyContent: "center",
      alignItems: "center",
   },
   createButtonText: {
      color: COLORS.textOnAccent,
      fontSize: 17,
      fontWeight: "700",
   },
});
