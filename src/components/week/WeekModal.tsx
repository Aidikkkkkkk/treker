import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import CustomModal from "../global/CustomModal";
import { EntityModalProps, IDtoWeek, IDtoWeekChange } from "@/types";
import { useStyles } from "@/context/ThemeContext";

type WeekModalProps = EntityModalProps<IDtoWeek, IDtoWeekChange>;

export default function WeekModal(props: WeekModalProps) {
   const { COLORS, MODAL_STYLES } = useStyles();
   const initial = props.mode === "edit" ? props.initialData.intensity : "light";
   const [intensity, setIntensity] = useState<"light" | "heavy">(initial);

   useEffect(() => {
      if (props.visible) setIntensity(initial);
   }, [props.visible, initial]);

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

   function handleSubmit() {
      if (props.mode === "edit") props.onChange({ id: props.initialData.id, intensity });
      else props.onCreate({ intensity });
      props.onClose();
   }

   const isEditing = props.mode === "edit";

   return (
      <CustomModal
         visible={props.visible}
         title={isEditing ? "Изменить неделю" : "Новая неделя"}
         onClose={props.onClose}
         submit={{ title: isEditing ? "Сохранить" : "Создать", onPress: handleSubmit }}
      >
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
      </CustomModal>
   );
}
