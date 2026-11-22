import { View, Text } from "react-native";
import { LIST_ITEM_STYLES } from "@/styles";
import List from "../global/CustomList";
import { IRepResult } from "@/types";
import ConfirmDelete from "../global/ConfirmDelete";

interface ListSetProps {
   reps: IRepResult[];
   deleteRep: (id: number) => void;
}

export default function ListRep({ reps, deleteRep }: ListSetProps) {
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
         data={reps}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderRep}
         onDelete={(item) => ConfirmDelete(item, "подход", deleteRep)}
         onPress={(item) => {}}
      />
   );
}
