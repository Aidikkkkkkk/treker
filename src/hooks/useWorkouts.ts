import { useState, useEffect } from "react";

import { useTreker } from "@/TrekerContext";
import { IWorkoutResult } from "@/types";

export function useWorkouts() {
   const treker = useTreker();
   const [workouts, setWorkouts] = useState<IWorkoutResult[]>([]);

   async function deleteWorkout(id: number) {
      if (!treker) return;
      try {
         await treker.deleteWorkout(id);
         setWorkouts((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
         console.error("Ошибка удаления тренировки:", error);
      }
   }
   async function loadWorkouts() {
      if (!treker) return;
      try {
         setWorkouts(await treker.getAllWorkouts());
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
      workouts,
      deleteWorkout,
   };
}
