import { useState, useEffect } from "react";

import { useTreker } from "@/TrekerContext";
import { IWeekResult } from "@/types";

export function useWeeks() {
   const treker = useTreker();
   const [weeks, setWeeks] = useState<IWeekResult[]>([]);

   async function deleteWeek(id: number) {
      if (!treker) return;
      try {
         await treker.deleteWeek(id);
         setWeeks((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
         console.error("Ошибка удаления тренировки:", error);
      }
   }
   async function loadWorkouts() {
      if (!treker) return;
      try {
         setWeeks(await treker.getAllWeeks());
      } catch (error) {
         console.error("Ошибка загрузки тренировок:", error);
      }
   }

   useEffect(() => {
      if (treker) {
         loadWorkouts();
      }
   }, [treker]);

   return {
      weeks,
      deleteWeek,
   };
}
