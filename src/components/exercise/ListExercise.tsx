import { View, Text } from "react-native";
import { router } from "expo-router";
import List from "../global/CustomList";
import { IExerciseResult } from "@/types";
import ConfirmDelete from "../global/ConfirmDelete";
import { useStyles } from "@/context/ThemeContext";

type ListExerciseProps = {
   exercises: IExerciseResult[];
   deleteExercise: (id: number) => void;
};

export default function ListExercise({ exercises, deleteExercise }: ListExerciseProps) {
   const { LIST_ITEM_STYLES } = useStyles();
   function renderExercise({ item, index }: { item: IExerciseResult; index: number }) {
      return (
         <View style={LIST_ITEM_STYLES.row}>
            <Text style={LIST_ITEM_STYLES.title}>
               {index + 1} {item.nameExercise}
            </Text>
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
