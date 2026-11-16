import { View, Text, Alert } from "react-native";
import { router } from "expo-router";
import { LIST_ITEM_STYLES } from "@/styles";
import { useWorkouts } from "@/hooks/useWorkout";
import { IWorkoutResult } from "@/types";
import List from "../global/CustomList";

type Props = { week_id: number };

function formatWorkoutDate(iso: string) {
   const d = new Date(iso);
   const sameYear = d.getFullYear() === new Date().getFullYear();
   const date = d.toLocaleDateString("ru-RU", {
      day: "numeric", month: "long", ...(sameYear ? {} : { year: "numeric" }),
   });
   const time = d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
   return `${date}, ${time}`;
}

export default function ListWorkouts({ week_id }: Props) {
   const { workouts, deleteWorkout } = useWorkouts(week_id);
   function confirmDelete(item: IWorkoutResult) {
      Alert.alert("Удалить тренировку?", `Тренировка ${item.id} будет удалена без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         { text: "Удалить", style: "destructive", onPress: () => deleteWorkout(item.id) },
      ]);
   }
   function renderWorkout({ item }: { item: IWorkoutResult; index: number }) {
      return (
         <View style={LIST_ITEM_STYLES.row}>
            <Text style={LIST_ITEM_STYLES.title}>Тренировка №{item.id}</Text>
            <Text style={LIST_ITEM_STYLES.secondary}>{formatWorkoutDate(item.dateWorkout)}</Text>
         </View>
      );
   }
   return (
      <List<IWorkoutResult>
         data={workouts}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderWorkout}
         onDelete={confirmDelete}
         onPress={(item) => router.push({ pathname: "./third", params: { workout_id: item.id } })}
      />
   );
}
