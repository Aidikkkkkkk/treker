import { View, Text } from "react-native";
import { router } from "expo-router";
import List from "../global/CustomList";
import { BaseListProps, IExerciseResult } from "@/types";
import ConfirmDelete from "../global/ConfirmDelete";
import { useStyles } from "@/context/ThemeContext";

export default function ListExercise({ items, onDelete, onEdit }: BaseListProps<IExerciseResult>) {
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
         data={items}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderExercise}
         onEdit={onEdit}
         onDelete={(item) => ConfirmDelete(item, "упражнение", onDelete)}
         onPress={(item) => router.push({ pathname: "./RepScreen", params: { exercise_id: item.id } })}
      />
   );
}
