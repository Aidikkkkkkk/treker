import { View, Text } from "react-native";
import List from "../global/CustomList";
import { IRepResult, BaseListProps } from "@/types";
import ConfirmDelete from "../global/ConfirmDelete";
import { useStyles } from "@/context/ThemeContext";

export default function ListRep({ items, onDelete, onEdit }: BaseListProps<IRepResult>) {
   const { LIST_ITEM_STYLES } = useStyles();
   function renderRep({ item, index }: { item: IRepResult; index: number }) {
      return (
         <View style={LIST_ITEM_STYLES.row}>
            <Text style={LIST_ITEM_STYLES.title}>Подход {index + 1} </Text>
            <Text style={LIST_ITEM_STYLES.secondary}>
               {item.weight} кг на {item.reps} повторений
            </Text>
         </View>
      );
   }
   return (
      <List<IRepResult>
         data={items}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderRep}
         onEdit={onEdit}
         onDelete={(item) => ConfirmDelete(item, "подход", onDelete)}
      />
   );
}
