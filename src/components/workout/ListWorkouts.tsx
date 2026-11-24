import { View, Text } from "react-native";
import { router } from "expo-router";
import List from "../global/CustomList";
import ConfirmDelete from "../global/ConfirmDelete";
import { useStyles } from "@/context/ThemeContext";
import { BaseListProps, IWorkoutResult } from "@/types";

function formatWorkoutDate(iso: string) {
   const d = new Date(iso);
   const sameYear = d.getFullYear() === new Date().getFullYear();
   const date = d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      ...(sameYear ? {} : { year: "numeric" }),
   });
   const time = d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
   return `${date}, ${time}`;
}

export default function ListWorkouts({ items, onDelete, onEdit }: BaseListProps<IWorkoutResult>) {
   const { LIST_ITEM_STYLES } = useStyles();
   function renderWorkout({ item, index }: { item: IWorkoutResult; index: number }) {
      return (
         <View style={LIST_ITEM_STYLES.row}>
            <Text style={LIST_ITEM_STYLES.title}>Тренировка №{index + 1}</Text>
            <Text style={LIST_ITEM_STYLES.secondary}>{formatWorkoutDate(item.dateWorkout)}</Text>
         </View>
      );
   }
   return (
      <List<IWorkoutResult>
         data={items}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderWorkout}
         onEdit={onEdit}
         onDelete={(item) => ConfirmDelete(item, "тренировку", onDelete)}
         onPress={(item) => router.push({ pathname: "./ExerciseScreen", params: { workout_id: item.id } })}
      />
   );
}
