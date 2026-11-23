import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import CustomModal from "../global/CustomModal";
import { IDtoWeek } from "@/types";
import { useStyles } from "@/context/ThemeContext";

interface WeekModalProps {
   visible: boolean;
   onClose: () => void;
   onCreate: (dto: IDtoWeek) => void;
}

export default function WeekModal({ visible, onClose, onCreate }: WeekModalProps) {
   const [intensity, setIntensity] = useState<"light" | "heavy">("light");
   const { COLORS, MODAL_STYLES } = useStyles();
   const styles = {
      ...MODAL_STYLES,
      segment: {
         flexDirection: "row" as const,
         backgroundColor: COLORS.surfaceMuted,
         borderRadius: 22,
         padding: 6,
         marginBottom: 18,
      },
      option: {
         flex: 1,
         alignItems: "center" as const,
         justifyContent: "center" as const,
         paddingVertical: 15,
         borderRadius: 17,
      },
      heavyActive: { backgroundColor: COLORS.heavySoft },
      lightActive: { backgroundColor: COLORS.lightSoft },
      optionText: { fontSize: 16, fontWeight: "700" as const },
      inactiveText: { color: COLORS.textSecondary },
      heavyText: { color: COLORS.heavy },
      lightText: { color: COLORS.light },
   };

   function handleCreate() {
      onCreate({ intensity: intensity });
      onClose();
   }
   return (
      <CustomModal visible={visible} title="Новая неделя" onClose={onClose}>
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
         <Pressable style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Создать</Text>
         </Pressable>
      </CustomModal>
   );
}
