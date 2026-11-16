import { View, Text, Alert } from "react-native";
import { router } from "expo-router";
import { LIST_ITEM_STYLES } from "@/styles";
import List from "../global/CustomList";
import { useExercise } from "@/hooks/useExercise";
import { IExerciseResult } from "@/types";

type Props = { workout_id: number };

export default function ListExercise({ workout_id }: Props) {
   const { exercises, deleteExercise } = useExercise(workout_id);
   function confirmDelete(item: IExerciseResult) {
      Alert.alert("Удалить упражнение?", `«${item.nameExercise}» будет удалено без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         { text: "Удалить", style: "destructive", onPress: () => deleteExercise(item.id) },
      ]);
   }
   function renderExercise({ item }: { item: IExerciseResult }) {
      return (
         <View style={LIST_ITEM_STYLES.row}>
            <Text style={LIST_ITEM_STYLES.title}>{item.nameExercise}</Text>
         </View>
      );
   }
   return (
      <List<IExerciseResult>
         data={exercises}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderExercise}
         onDelete={confirmDelete}
         onPress={(item) => router.push({ pathname: "./fourth", params: { exercise_id: item.id } })}
      />
   );
}
