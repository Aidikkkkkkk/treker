import { View, Text, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import List from "../global/List";
import { useWeeks } from "@/hooks/useWeeks";
import { IWeekResult } from "@/types";
import { COLORS } from "@/styles";

export default function ListWeeks() {
   const { weeks, deleteWeek } = useWeeks();
   function confirmDelete(item: IWeekResult) {
      const index = weeks.findIndex((week) => week.id === item.id);
      const weekNumber = weeks.length - index;

      Alert.alert("Удалить неделю?", `Неделя ${weekNumber} будет удалена без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         {
            text: "Удалить",
            style: "destructive",
            onPress: () => deleteWeek(item.id),
         },
      ]);
   }

   function renderWorkout({ item }: { item: IWeekResult; index: number }) {
      const isHeavy = item.intensity === "heavy";
      return (
         <View style={styles.header}>
            <View>
               <Text style={styles.title}>Неделя {item.id}</Text>
            </View>

            <View style={[styles.badge, isHeavy ? styles.heavyBadge : styles.lightBadge]}>
               <Text style={[styles.badgeText, isHeavy ? styles.heavyText : styles.lightText]}>
                  {isHeavy ? "Тяжёлая" : "Лёгкая"}
               </Text>
            </View>
         </View>
      );
   }

   return (
      <List<IWeekResult>
         data={weeks}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderWorkout}
         onDelete={confirmDelete}
         onPress={(item) =>
            router.push({
               pathname: "/second",
               params: { workoutId: item.id },
            })
         }
      />
   );
}

const styles = StyleSheet.create({
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: 38,
   },
   title: {
      color: COLORS.textPrimary,
      fontSize: 20,
      fontWeight: "700",
   },
   date: {
      color: COLORS.textSecondary,
      fontSize: 15,
      marginTop: 5,
   },
   badge: {
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 30,
   },
   heavyBadge: {
      backgroundColor: COLORS.heavySoft,
   },
   lightBadge: {
      backgroundColor: COLORS.lightSoft,
   },
   badgeText: {
      fontSize: 14,
      fontWeight: "700",
   },
   heavyText: {
      color: COLORS.heavy,
   },
   lightText: {
      color: COLORS.light,
   },
});
