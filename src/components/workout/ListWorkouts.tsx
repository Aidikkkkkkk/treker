import { View, Text, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";

import List from "../global/CustomList";
import { COLORS } from "@/styles";
import { useWorkouts } from "@/hooks/useWorkout";
import { IWorkoutResult } from "@/types";

function formatworkoutDate(iso: string) {
   const d = new Date(iso);
   const sameYear = d.getFullYear() === new Date().getFullYear();

   const date = d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      ...(sameYear ? {} : { year: "numeric" }),
   });

   const time = d.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
   });

   return `${date}, ${time}`;
}

export default function ListWorkouts() {
   const { workouts, deleteWorkout } = useWorkouts();

   function confirmDelete(item: IWorkoutResult) {
      const index = workouts.findIndex((workout) => workout.id === item.id);
      const workoutNumber = workouts.length - index;

      Alert.alert("Удалить неделю?", `Неделя ${workoutNumber} будет удалена без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         {
            text: "Удалить",
            style: "destructive",
            onPress: () => deleteWorkout(item.id),
         },
      ]);
   }

   function renderWorkout({ item, index }: { item: IWorkoutResult; index: number }) {
      const workoutNumber = workouts.length - index;

      return (
         <View style={styles.header}>
            <View>
               <Text style={styles.title}>Неделя {workoutNumber}</Text>
            </View>

            <View>
               <Text style={styles.badgeText}>{formatworkoutDate(item.dateWorkout)}</Text>
            </View>
         </View>
      );
   }

   return (
      <List<IWorkoutResult>
         data={workouts}
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
