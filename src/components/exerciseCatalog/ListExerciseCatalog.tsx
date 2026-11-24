import { View, Text } from "react-native";
import List from "../global/CustomList";
import { IExerciseCatalogResult, BaseListProps } from "@/types";
import ConfirmDelete from "../global/ConfirmDelete";
import { useStyles } from "@/context/ThemeContext";

export default function ListExerciseCatalog({ items, onDelete, onEdit }: BaseListProps<IExerciseCatalogResult>) {
   const { LIST_ITEM_STYLES } = useStyles();
   function renderItem({ item }: { item: IExerciseCatalogResult }) {
      return (
         <View style={LIST_ITEM_STYLES.row}>
            <Text style={LIST_ITEM_STYLES.title}>{item.nameExercise}</Text>
         </View>
      );
   }
   return (
      <List<IExerciseCatalogResult>
         data={items}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderItem}
         onEdit={onEdit}
         onDelete={(item) => ConfirmDelete(item, "упражнение из каталога", onDelete)}
      />
   );
}
