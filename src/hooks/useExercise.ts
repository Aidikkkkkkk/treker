import { useState } from "react";

import { useTreker } from "@/TrekerContext";
import { IExerciseResult } from "@/types";

export function useExercise() {
   const treker = useTreker();
   const [exercises, setExercises] = useState<IExerciseResult[]>([]);

   // async function deleteWorkout(id: number) {
   //    if (!treker) return;
   //    try {
   //       await treker.deleteWorkout(id);
   //       setWorkouts((prev) => prev.filter((item) => item.id !== id));
   //    } catch (error) {
   //       console.error("Ошибка удаления тренировки:", error);
   //    }
   // }
   async function loadExercises(id: number) {
      if (!treker) return;
      try {
         setExercises(await treker.getAllExercises(id));
      } catch (error) {
         console.error("Ошибка загрузки тренировок:", error);
      }
   }

   return {
      exercises,
      loadExercises,
   };
}
