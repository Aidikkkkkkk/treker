import { View, Text } from "react-native";
import { router } from "expo-router";
import { BaseListProps, IWeekResult } from "@/types";
import ConfirmDelete from "../global/ConfirmDelete";
import List from "../global/CustomList";
import { useStyles } from "@/context/ThemeContext";

export default function ListWeeks({ items, onDelete, onEdit }: BaseListProps<IWeekResult>) {
   const { LIST_ITEM_STYLES } = useStyles();

   function renderWeek({ item, index }: { item: IWeekResult; index: number }) {
      const isHeavy = item.intensity === "heavy";
      return (
         <View style={LIST_ITEM_STYLES.row}>
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
         data={items}
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderWeek}
         onEdit={onEdit}
         onDelete={(item) => ConfirmDelete(item, "неделю", onDelete)}
         onPress={(item) => router.push({ pathname: "./WorkoutScreen", params: { week_id: item.id } })}
      />
   );
}
