import { View, Text } from "react-native";
import List from "../global/CustomList";
import { IExerciseCatalogResult } from "@/types";
import ConfirmDelete from "../global/ConfirmDelete";
import { useStyles } from "@/context/ThemeContext";

type ListExerciseCatalogProps = {
   exerciseCatalog: IExerciseCatalogResult[];
   deleteFromExerciseCatalog: (id: number) => void;
};

export default function ListExerciseCatalog({ exerciseCatalog, deleteFromExerciseCatalog }: ListExerciseCatalogProps) {
   const { LIST_ITEM_STYLES } = useStyles();
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
         onDelete={(item) => ConfirmDelete(item, "упражнение из каталога", deleteFromExerciseCatalog)}
         onPress={() => {}}
      />
   );
}
