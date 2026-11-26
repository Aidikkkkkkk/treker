import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useStyles } from "@/context/ThemeContext";
import { BaseListProps, IRepResult } from "@/types";
import CustomList from "../global/CustomList";
import ConfirmDelete from "../global/ConfirmDelete";

const MAX_REST_MINUTES = 10;

function formatDuration(ms: number): string {
   const diffSec = Math.max(0, Math.floor(ms / 1000));
   const mins = Math.floor(diffSec / 60);
   const secs = diffSec % 60;
   return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatStaticTime(isoString: string): string {
   const date = new Date(isoString);
   if (Number.isNaN(date.getTime())) return isoString;

   return date
      .toLocaleTimeString("ru-RU", {
         hour: "2-digit",
         minute: "2-digit",
         second: "2-digit",
      })
      .replaceAll(":", ".");
}

function useTimer(isoTime: string, maxMinutes = MAX_REST_MINUTES): string | null {
   const [now, setNow] = useState<number>(() => Date.now());
   const targetMs = new Date(isoTime).getTime();
   const maxMs = maxMinutes * 60 * 1000;

   const diffMs = Math.max(0, now - targetMs);
   const isExpired = Number.isNaN(targetMs) || diffMs >= maxMs;

   useEffect(() => {
      if (isExpired) return;

      setNow(Date.now());
      const intervalId = setInterval(() => {
         setNow(Date.now());
      }, 1000);

      return () => clearInterval(intervalId);
   }, [targetMs, isExpired]);

   if (isExpired) {
      return null;
   }

   return formatDuration(diffMs);
}

function RepTimer({ time }: { time: string }) {
   const elapsed = useTimer(time);
   if (!elapsed) return null;

   return <Text>Прошло {elapsed}</Text>;
}

export default function ListRep({ items, onDelete, onEdit }: BaseListProps<IRepResult>) {
   const { LIST_ITEM_STYLES } = useStyles();

   function renderRep({ item, index }: { item: IRepResult; index: number }) {
      const isLastRep = index === items.length - 1;
      const nextItem = items[index + 1];

      const completedAt = formatStaticTime(item.time);

      const restDuration =
         !isLastRep && nextItem
            ? formatDuration(new Date(nextItem.time).getTime() - new Date(item.time).getTime())
            : null;

      return (
         <View style={LIST_ITEM_STYLES.row}>
            <Text style={LIST_ITEM_STYLES.title}>Подход {index + 1}</Text>
            <Text style={LIST_ITEM_STYLES.secondary}>
               {item.weight} кг на {item.reps} повторений
            </Text>

            <Text>Выполнен в {completedAt}</Text>

            {isLastRep ? <RepTimer time={item.time} /> : restDuration && <Text>Отдых: {restDuration}</Text>}
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
