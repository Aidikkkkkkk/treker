import { View, Text, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { COLORS } from "@/styles";
import List from "../global/CustomList";
import { useSet } from "@/hooks/useSet";
import { ISetResult } from "@/types";

type Props = {
   exercise_id: number;
};

export default function ListSet({ exercise_id }: Props) {
   const { sets, deleteSet } = useSet(exercise_id);
   function confirmDelete(item: ISetResult) {
      Alert.alert("Удалить тренировку?", `Тренировка ${item.id} будет удалена без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         {
            text: "Удалить",
            style: "destructive",
            onPress: () => deleteSet(item.id),
         },
      ]);
   }
   function renderWorkout({ item }: { item: ISetResult }) {
      return (
         <View style={styles.header}>
            <Text style={styles.title}>
               {item.id} Подход {item.count} на {item.replace}
            </Text>
         </View>
      );
   }
   return (
      <List<ISetResult>
         data={sets}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderWorkout}
         onDelete={confirmDelete}
         onPress={(item) =>
            router.push({
               pathname: "/",
               // params: { workoutId: item.id },
            })
         }
      />
   );
}

const styles = StyleSheet.create({
   header: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 6,
      paddingRight: 38,
   },
   title: {
      color: COLORS.textPrimary,
      fontSize: 20,
      fontWeight: "700",
   },
   badge: {
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 30,
   },
   heavyBadge: {
      backgroundColor: COLORS.heavySoft,
   },
   lightBadge: {
      backgroundColor: COLORS.lightSoft,
   },
   badgeText: {
      fontSize: 14,
      fontWeight: "700",
   },
   heavyText: {
      color: COLORS.heavy,
   },
   lightText: {
      color: COLORS.light,
   },
});
