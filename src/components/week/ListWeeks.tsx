import { View, Text, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import List from "../global/CustomList";
import { useWeeks } from "@/hooks/useWeeks";
import { IWeekResult } from "@/types";
import { COLORS, LIST_ITEM_STYLES } from "@/styles";

export default function ListWeeks() {
   const { weeks, deleteWeek } = useWeeks();
   function confirmDelete(item: IWeekResult) {
      Alert.alert("Удалить неделю?", `Неделя ${item.id} будет удалена без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         { text: "Удалить", style: "destructive", onPress: () => deleteWeek(item.id) },
      ]);
   }
   function renderWeek({ item }: { item: IWeekResult; index: number }) {
      const isHeavy = item.intensity === "heavy";
      return (
         <View style={styles.header}>
            <Text style={LIST_ITEM_STYLES.title}>Неделя {item.id}</Text>
            <View style={[LIST_ITEM_STYLES.badge, isHeavy ? LIST_ITEM_STYLES.heavyBadge : LIST_ITEM_STYLES.lightBadge]}>
               <Text style={[LIST_ITEM_STYLES.badgeText, isHeavy ? LIST_ITEM_STYLES.heavyText : LIST_ITEM_STYLES.lightText]}>
                  {isHeavy ? "Тяжёлая" : "Лёгкая"}
               </Text>
            </View>
         </View>
      );
   }
   return (
      <List<IWeekResult>
         data={weeks}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderWeek}
         onDelete={confirmDelete}
         onPress={(item) => router.push({ pathname: "/second", params: { week_id: item.id } })}
      />
   );
}

const styles = StyleSheet.create({
   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: 38 },
});
