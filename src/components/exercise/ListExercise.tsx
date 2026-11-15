import { View, Text, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { COLORS } from "@/styles";
import List from "../global/CustomList";
import { useExercise } from "@/hooks/useExercise";
import { IExerciseResult } from "@/types";

type Props = {
   workout_id: number;
};

export default function ListExercise({ workout_id }: Props) {
   const { exercises, deleteExercise } = useExercise(workout_id);
   function confirmDelete(item: IExerciseResult) {
      Alert.alert("Удалить тренировку?", `Тренировка ${item.id} будет удалена без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         {
            text: "Удалить",
            style: "destructive",
            onPress: () => deleteExercise(item.id),
         },
      ]);
   }
   function renderWorkout({ item }: { item: IExerciseResult }) {
      return (
         <View style={styles.header}>
            <Text style={styles.title}>{item.nameExercise}</Text>
         </View>
      );
   }
   return (
      <List<IExerciseResult>
         data={exercises}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderWorkout}
         onDelete={confirmDelete}
         onPress={(item) =>
            router.push({
               pathname: "./fourth",
               params: { exercise_id: item.id },
            })
         }
      />
   );
}

const styles = StyleSheet.create({
   header: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 6,
      paddingRight: 38,
   },
   title: {
      color: COLORS.textPrimary,
      fontSize: 20,
      fontWeight: "700",
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
