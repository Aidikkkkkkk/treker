import { useState, useEffect } from "react";

import { useTreker } from "@/context/TrekerContext";
import { IWorkoutResult } from "@/types";

export function useWorkouts() {
   const treker = useTreker();

   const [workouts, setWorkouts] = useState<IWorkoutResult[]>([]);

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
      reload: loadWorkouts,
   };
}
