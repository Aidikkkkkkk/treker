import { useState, useEffect } from "react";
import { useTreker } from "@/TrekerContext";
import { IWeekResult } from "@/types";

export function useWeeks() {
   const treker = useTreker();
   const [weeks, setWeeks] = useState<IWeekResult[]>([]);
   const [showCreate, setShowCreate] = useState(false);

   async function deleteWeek(id: number) {
      if (!treker) return;
      try {
         await treker.deleteWeek(id);
         setWeeks((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
         console.error("Ошибка удаления тренировки:", error);
      }
   }
   async function loadWeeks() {
      if (!treker) return;
      try {
         setWeeks(await treker.getAllWeeks());
      } catch (error) {
         console.error("Ошибка загрузки тренировок:", error);
      }
   }
   async function createWeek(intensity: "light" | "heavy") {
      setShowCreate(false);
      try {
         await treker?.createWeek({
            intensity,
         });
      } catch (e) {
         console.error("createWeek упал:", e);
      }
   }

   useEffect(() => {
      if (treker) {
         loadWeeks();
      }
   }, [treker]);

   return {
      weeks,
      deleteWeek,
      createWeek,
      showCreate,
      setShowCreate,
   };
}
