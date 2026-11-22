import { View, Text } from "react-native";
import { router } from "expo-router";
import { LIST_ITEM_STYLES } from "@/styles";
import List from "../global/CustomList";
import { IExerciseResult } from "@/types";
import ConfirmDelete from "../global/ConfirmDelete";

type ListExerciseProps = {
   exercises: IExerciseResult[];
   deleteExercise: (id: number) => void;
};

export default function ListExercise({ exercises, deleteExercise }: ListExerciseProps) {
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
         onDelete={(item) => ConfirmDelete(item, "упражнение", deleteExercise)}
         onPress={(item) => router.push({ pathname: "./fourth", params: { exercise_id: item.id } })}
      />
   );
}
