import { useState } from "react";
import { Text, Pressable, Platform, View } from "react-native";
import DateTimePicker, { DateTimePickerChangeEvent } from "@react-native-community/datetimepicker";
import { IDtoWorkout } from "@/types";
import CustomModal from "../global/CustomModal";
import { useStyles } from "@/context/ThemeContext";

interface WorkoutModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (dto: IDtoWorkout) => void;
   week_id: number;
}

export default function WorkoutModal({ visible, onClose, onCreate, week_id }: WorkoutModalProps) {
   const [date, setDate] = useState(new Date());
   const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);
   const { COLORS, MODAL_STYLES } = useStyles();
   const styles = {
      ...MODAL_STYLES,
      dateTimeRow: { flexDirection: "row" as const, gap: 12, marginBottom: 18 },
      dateTimeCell: {
         flex: 1,
         alignItems: "center" as const,
         justifyContent: "center" as const,
         paddingVertical: 15,
         borderRadius: 17,
         backgroundColor: COLORS.surfaceMuted,
         borderWidth: 1,
         borderColor: "transparent",
      },
      dateTimeCellActive: { borderColor: COLORS.accent },
      cellLabel: { color: COLORS.textSecondary, fontSize: 13, marginBottom: 5 },
      dateRowText: { color: COLORS.textPrimary, fontSize: 16, fontWeight: "600" as const },
   };

   function handleValueChange(_event: DateTimePickerChangeEvent, selected: Date) {
      setDate(selected > new Date() ? new Date() : selected);
      if (Platform.OS === "android") {
         setPickerMode(null);
      }
   }
   function handleCreate() {
      onCreate({ week_id: week_id, dateWorkout: String(date) });
      setPickerMode(null);
      onClose();
   }
   function handleClose() {
      setPickerMode(null);
      onClose();
   }
   return (
      <CustomModal visible={visible} onClose={handleClose} title="Дата и время">
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
            <Text style={styles.createButtonText}>Создать тренировку</Text>
         </Pressable>
      </CustomModal>
   );
}
