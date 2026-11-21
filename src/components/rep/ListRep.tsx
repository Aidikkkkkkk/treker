import { View, Text, Alert } from "react-native";
import { router } from "expo-router";
import { LIST_ITEM_STYLES } from "@/styles";
import List from "../global/CustomList";
import { IRepResult } from "@/types";

interface ListSetProps {
   reps: IRepResult[];
   deleteRep: (id: number) => void;
}

export default function ListRep({ reps, deleteRep }: ListSetProps) {
   function confirmDelete(item: IRepResult) {
      Alert.alert("Удалить подход?", `Подход №${item.id} будет удалён без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         { text: "Удалить", style: "destructive", onPress: () => deleteRep(item.id) },
      ]);
   }
   function renderRep({ item }: { item: IRepResult }) {
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
      <List<IRepResult>
         data={reps}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderRep}
         onDelete={confirmDelete}
         onPress={() => router.push("/")}
      />
   );
}
