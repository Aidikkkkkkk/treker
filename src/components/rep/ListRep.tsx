import { Text, View } from "react-native";
import { useStyles } from "@/context/ThemeContext";
import { BaseListProps, IRepResult } from "@/types";
import CustomList from "../global/CustomList";
import ConfirmDelete from "../global/ConfirmDelete";
import { formatStaticTime, formatDuration } from "./timer";

export default function ListRep({ items, onDelete, onEdit }: BaseListProps<IRepResult>) {
   const { LIST_ITEM_STYLES } = useStyles();

   function renderRep({ item, index }: { item: IRepResult; index: number }) {
      const completedAt = formatStaticTime(item.time);
      return (
         <View style={LIST_ITEM_STYLES.row}>
            <Text style={LIST_ITEM_STYLES.title}>Подход {index + 1}</Text>
            <Text style={LIST_ITEM_STYLES.secondary}>
               {item.weight} кг на {item.reps} повторений
            </Text>
            <Text>Выполнен в {completedAt}</Text>
            <Text>Отдых : {formatDuration(Date.now() - new Date(item.time).getTime())}</Text>
         </View>
      );
   }
   return (
      <CustomList<IRepResult>
         data={items}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderRep}
         onEdit={onEdit}
         onDelete={(item) => ConfirmDelete(item, "подход", onDelete)}
      />
   );
}
