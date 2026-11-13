import { View, Text, Pressable, Modal, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import DateTimePicker, { DateTimePickerChangeEvent } from "@react-native-community/datetimepicker";
import { COLORS } from "@/styles";

interface CreateWorkoutModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (intensity: "light" | "heavy", date: Date) => void;
}

export default function CreateWorkoutModal({ visible, onClose, onCreate }: CreateWorkoutModalProps) {
   const [intensity, setIntensity] = useState<"light" | "heavy">("light");
   const [dateMode, setDateMode] = useState<"now" | "custom">("now");
   const [customDate, setCustomDate] = useState(new Date());
   const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);

   function handleValueChange(_event: DateTimePickerChangeEvent, selected: Date) {
      // будущее время не разрешаем: если выбрали позже, чем сейчас, ставим «сейчас»
      setCustomDate(selected > new Date() ? new Date() : selected);
      if (Platform.OS === "android") setPickerMode(null);
   }

   function handleDismiss() {
      setPickerMode(null);
   }

   function handleCreate() {
      onCreate(intensity, dateMode === "now" ? new Date() : customDate);
      setDateMode("now");
      setPickerMode(null);
   }

   return (
      <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
         <View style={styles.overlay}>
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

            <View style={styles.modal}>
               <View style={styles.indicatorContainer}>
                  <View style={styles.indicator} />
               </View>

               <Text style={styles.title}>Новая неделя</Text>

               <View style={styles.segment}>
                  <Pressable
                     onPress={() => setIntensity("light")}
                     style={[styles.option, intensity === "light" && styles.lightActive]}
                  >
                     <Text style={[styles.optionText, intensity === "light" ? styles.lightText : styles.inactiveText]}>
                        Лёгкая
                     </Text>
                  </Pressable>

                  <Pressable
                     onPress={() => setIntensity("heavy")}
                     style={[styles.option, intensity === "heavy" && styles.heavyActive]}
                  >
                     <Text style={[styles.optionText, intensity === "heavy" ? styles.heavyText : styles.inactiveText]}>
                        Тяжёлая
                     </Text>
                  </Pressable>
               </View>

               <Text style={styles.label}>Дата</Text>

               <View style={styles.segment}>
                  <Pressable
                     onPress={() => {
                        setDateMode("now");
                        setPickerMode(null);
                     }}
                     style={[styles.option, dateMode === "now" && styles.dateActive]}
                  >
                     <Text style={[styles.optionText, dateMode === "now" ? styles.dateText : styles.inactiveText]}>
                        Сейчас
                     </Text>
                  </Pressable>

                  <Pressable
                     onPress={() => {
                        setDateMode("custom");
                        setPickerMode("date");
                     }}
                     style={[styles.option, dateMode === "custom" && styles.dateActive]}
                  >
                     <Text style={[styles.optionText, dateMode === "custom" ? styles.dateText : styles.inactiveText]}>
                        Другая дата
                     </Text>
                  </Pressable>
               </View>

               {dateMode === "custom" && (
                  <View style={styles.dateTimeRow}>
                     <Pressable
                        style={[styles.dateTimeCell, pickerMode === "date" && styles.dateTimeCellActive]}
                        onPress={() => setPickerMode("date")}
                     >
                        <Text style={styles.dateRowText}>{customDate.toLocaleDateString()}</Text>
                     </Pressable>

                     <Pressable
                        style={[styles.dateTimeCell, pickerMode === "time" && styles.dateTimeCellActive]}
                        onPress={() => setPickerMode("time")}
                     >
                        <Text style={styles.dateRowText}>
                           {customDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </Text>
                     </Pressable>
                  </View>
               )}

               {dateMode === "custom" && pickerMode && (
                  <DateTimePicker
                     value={customDate}
                     mode={pickerMode}
                     is24Hour
                     display={Platform.OS === "ios" ? "spinner" : "default"}
                     themeVariant="light"
                     onValueChange={handleValueChange}
                     onDismiss={handleDismiss}
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
      backgroundColor: COLORS.overlay,
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
   label: {
      color: COLORS.textSecondary,
      fontSize: 14,
      marginBottom: 8,
      marginLeft: 4,
   },
   segment: {
      flexDirection: "row",
      backgroundColor: COLORS.surfaceMuted,
      borderRadius: 22,
      padding: 6,
      marginBottom: 18,
   },
   option: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 13,
      borderRadius: 17,
   },
   heavyActive: {
      backgroundColor: COLORS.heavySoft,
   },
   lightActive: {
      backgroundColor: COLORS.turquoiseSoft,
   },
   dateActive: {
      backgroundColor: COLORS.accentSoft,
   },
   optionText: {
      fontSize: 16,
      fontWeight: "700",
   },
   inactiveText: {
      color: COLORS.textSecondary,
   },
   heavyText: {
      color: COLORS.heavy,
   },
   lightText: {
      color: COLORS.turquoise,
   },
   dateText: {
      color: COLORS.accent,
   },
   dateTimeRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: -6,
      marginBottom: 14,
   },
   dateTimeCell: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 12,
      borderRadius: 17,
      backgroundColor: COLORS.surface,
      borderWidth: 1,
      borderColor: "transparent",
   },
   dateTimeCellActive: {
      borderColor: COLORS.turquoise,
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
