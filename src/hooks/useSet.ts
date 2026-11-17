import { useState, useEffect } from "react";
import { useTreker } from "@/TrekerContext";
import { IDtoSet, ISetResult } from "@/types";

export function useSet(exercise_id: number) {
   const treker = useTreker();
   const [sets, setSets] = useState<ISetResult[]>([]);
   const [showCreate, setShowCreate] = useState(false);

   async function deleteSet(id: number) {
      if (!treker) return;
      try {
         await treker.deleteSet(id);
         setSets((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
         console.error("Ошибка удаления упражнения:", error);
      }
   }
   async function loadSet(id: number) {
      if (!treker) return;
      try {
         setSets(await treker.getAllSets(id));
      } catch (error) {
         console.error("Ошибка загрузки упражнения:", error);
      }
   }
   async function createSet(dto: IDtoSet) {
      setShowCreate(false);
      try {
         await treker?.createSet(dto);
         await loadSet(exercise_id);
      } catch (e) {
         console.error("Ошибка при создании упражнения:", e);
      }
   }
   useEffect(() => {
      if (!treker || !exercise_id) return;
      loadSet(exercise_id);
   }, [treker, exercise_id]);

   return {
      sets,
      deleteSet,
      createSet,
      setShowCreate,
      showCreate,
      loadSet,
   };
}
