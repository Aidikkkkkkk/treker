import { View, Text, Alert } from "react-native";
import { router } from "expo-router";
import { LIST_ITEM_STYLES } from "@/styles";
import List from "../global/CustomList";
import { ISetResult } from "@/types";

interface ListSetProps {
   sets: ISetResult[];
   deleteSet: (id: number) => void;
}

export default function ListSet({ sets, deleteSet }: ListSetProps) {
   function confirmDelete(item: ISetResult) {
      Alert.alert("Удалить подход?", `Подход №${item.id} будет удалён без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         { text: "Удалить", style: "destructive", onPress: () => deleteSet(item.id) },
      ]);
   }
   function renderSet({ item }: { item: ISetResult }) {
      return (
         <View style={LIST_ITEM_STYLES.row}>
            <Text style={LIST_ITEM_STYLES.title}>Подход {item.id}</Text>
            <Text style={LIST_ITEM_STYLES.secondary}>
               {item.count} повторений · {item.replace} кг
            </Text>
         </View>
      );
   }
   return (
      <List<ISetResult>
         data={sets}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderSet}
         onDelete={confirmDelete}
         onPress={() => router.push("/")}
      />
   );
}
