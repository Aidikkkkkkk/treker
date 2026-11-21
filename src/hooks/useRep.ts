import { useState, useEffect } from "react";
import { useTreker } from "@/TrekerContext";
import { IDtoRep, IRepResult } from "@/types";

export function useRep(exercise_id: number) {
   const treker = useTreker();
   const [reps, setReps] = useState<IRepResult[]>([]);
   const [showCreate, setShowCreate] = useState(false);

   async function deleteRep(id: number) {
      if (!treker) return;
      try {
         await treker.deleteRep(id);
         setReps((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
         console.error("Ошибка удаления подхода:", error);
      }
   }
   async function loadRep(id: number) {
      if (!treker) return;
      try {
         setReps(await treker.getAllReps(id));
      } catch (error) {
         console.error("Ошибка загрузки подходов:", error);
      }
   }
   async function createRep(dto: IDtoRep) {
      setShowCreate(false);
      try {
         await treker?.createRep(dto);
         await loadRep(exercise_id);
      } catch (e) {
         console.error("Ошибка при создании подхода:", e);
      }
   }
   useEffect(() => {
      if (!treker || !exercise_id) return;
      loadRep(exercise_id);
   }, [treker, exercise_id]);

   return {
      reps,
      deleteRep,
      createRep,
      setShowCreate,
      showCreate,
      loadRep,
   };
}
