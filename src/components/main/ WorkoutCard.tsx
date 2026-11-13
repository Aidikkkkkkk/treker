import { View, Text, StyleSheet } from "react-native";

import { IWorkoutResult } from "@/types";

interface WorkoutCardProps {
   workout: IWorkoutResult;
   weekNumber: number;
}

export default function WorkoutCard({ workout, weekNumber }: WorkoutCardProps) {
   const isHeavy = workout.intensity === "heavy";

   return (
      <View style={styles.card}>
         <View style={styles.header}>
            <Text style={styles.title}>Неделя {weekNumber}</Text>

            <View style={[styles.badge, isHeavy ? styles.heavyBadge : styles.lightBadge]}>
               <Text style={[styles.badgeText, isHeavy ? styles.heavyText : styles.lightText]}>
                  {isHeavy ? "Тяжёлая" : "Лёгкая"}
               </Text>
            </View>
         </View>

         <Text style={styles.date}>{new Date(workout.dateWorkout).toLocaleDateString()}</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   card: {
      width: "100%",
      backgroundColor: "#1b1924",
      borderColor: "#302c40",
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 17,
      borderRadius: 26,
      marginBottom: 14,
   },
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 7,
   },
   title: {
      color: "#ece8f4",
      fontSize: 20,
      fontWeight: "700",
   },
   date: {
      color: "#a59fb5",
      fontSize: 15,
   },
   badge: {
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 30,
   },
   heavyBadge: {
      backgroundColor: "#382519",
   },
   lightBadge: {
      backgroundColor: "#2c214d",
   },
   badgeText: {
      fontSize: 14,
      fontWeight: "700",
   },
   heavyText: {
      color: "#efb18d",
   },
   lightText: {
      color: "#c5b3ff",
   },
});
