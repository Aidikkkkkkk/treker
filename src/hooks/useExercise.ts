import { useState, useEffect } from "react";
import { useTreker } from "@/TrekerContext";
import { IDtoExercise, IExerciseResult } from "@/types";

export function useExercise(workout_id: number) {
   const treker = useTreker();
   const [exercises, setExercises] = useState<IExerciseResult[]>([]);
   const [showCreate, setShowCreate] = useState(false);

   async function deleteExercise(id: number) {
      if (!treker) return;
      try {
         await treker.deleteExercise(id);
         setExercises((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
         console.error("Ошибка удаления упражнения:", error);
      }
   }
   async function loadExercises(id: number) {
      if (!treker) return;
      try {
         setExercises(await treker.getAllExercises(id));
      } catch (error) {
         console.error("Ошибка загрузки упражнения:", error);
      }
   }
   async function createExercise(dto: IDtoExercise) {
      setShowCreate(false);
      try {
         await treker?.createExercise(dto);
      } catch (e) {
         console.error("Ошибка при создании упражнения:", e);
      }
   }
   useEffect(() => {
      if (!treker || !workout_id) return;
      loadExercises(workout_id);
   }, [treker, workout_id]);

   return {
      exercises,
      deleteExercise,
      createExercise,
      setShowCreate,
      showCreate,
      loadExercises,
   };
}
