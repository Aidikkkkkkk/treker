import { View, Text, Alert } from "react-native";
import { LIST_ITEM_STYLES } from "@/styles";
import List from "../global/CustomList";
import { IExerciseCatalogResult } from "@/types";

type ListExerciseCatalogProps = {
   exerciseCatalog: IExerciseCatalogResult[];
   deleteExerciseCatalog: (id: number) => void;
};

export default function ListExerciseCatalog({ exerciseCatalog, deleteExerciseCatalog }: ListExerciseCatalogProps) {
   function confirmDelete(item: IExerciseCatalogResult) {
      Alert.alert("Удалить из каталога?", `«${item.nameExercise}» будет удалено без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         { text: "Удалить", style: "destructive", onPress: () => deleteExerciseCatalog(item.id) },
      ]);
   }
   function renderExerciseCatalog({ item }: { item: IExerciseCatalogResult }) {
      return (
         <View style={LIST_ITEM_STYLES.row}>
            <Text style={LIST_ITEM_STYLES.title}>{item.nameExercise}</Text>
         </View>
      );
   }
   return (
      <List<IExerciseCatalogResult>
         data={exerciseCatalog}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderExerciseCatalog}
         onDelete={confirmDelete}
         onPress={() => {}}
      />
   );
}
