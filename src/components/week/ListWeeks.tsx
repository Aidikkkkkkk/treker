import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { IWeekResult } from "@/types";
import ConfirmDelete from "../global/ConfirmDelete";
import List from "../global/CustomList";
import { useStyles } from "@/context/ThemeContext";

interface ListWeeksProps {
   weeks: IWeekResult[];
   deleteWeek: (id: number) => void;
}

export default function ListWeeks({ weeks, deleteWeek }: ListWeeksProps) {
   const { LIST_ITEM_STYLES } = useStyles();
   function renderWeek({ item, index }: { item: IWeekResult; index: number }) {
      const isHeavy = item.intensity === "heavy";
      return (
         <View style={styles.header}>
            <Text style={LIST_ITEM_STYLES.title}>Неделя {index + 1}</Text>
            <View style={[LIST_ITEM_STYLES.badge, isHeavy ? LIST_ITEM_STYLES.heavyBadge : LIST_ITEM_STYLES.lightBadge]}>
               <Text
                  style={[
                     LIST_ITEM_STYLES.badgeText,
                     isHeavy ? LIST_ITEM_STYLES.heavyText : LIST_ITEM_STYLES.lightText,
                  ]}
               >
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
         onDelete={(item) => ConfirmDelete(item, "Неделю", deleteWeek)}
         onPress={(item) => router.push({ pathname: "/second", params: { week_id: item.id } })}
      />
   );
}

const styles = StyleSheet.create({
   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: 38 },
});
