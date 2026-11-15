import { useState, useEffect } from "react";
import { useTreker } from "@/TrekerContext";
import { IWorkoutResult } from "@/types";

export function useWorkouts(week_id: number) {
   const treker = useTreker();

   const [workouts, setWorkouts] = useState<IWorkoutResult[]>([]);
   const [showCreate, setShowCreate] = useState(false);

   async function deleteWorkout(id: number) {
      if (!treker) return;

      try {
         await treker.deleteWorkout(id);
         setWorkouts((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
         console.error("Ошибка удаления тренировки:", error);
      }
   }

   async function loadWorkouts(id: number) {
      if (!treker) return;

      try {
         const result = await treker.getAllWorkouts(id);
         setWorkouts(result);
      } catch (error) {
         console.error("Ошибка загрузки тренировок:", error);
      }
   }

   async function createWorkout(week_id: number, dateWorkout: string) {
      if (!treker) return;

      try {
         await treker.createWorkout({
            week_id,
            dateWorkout,
         });

         await loadWorkouts(week_id);
         setShowCreate(false);
      } catch (error) {
         console.error("Ошибка создания тренировки:", error);
      }
   }

   useEffect(() => {
      if (!treker || !week_id) return;

      loadWorkouts(week_id);
   }, [treker, week_id]);

   return {
      workouts,
      deleteWorkout,
      createWorkout,
      setShowCreate,
      showCreate,
      loadWorkouts,
   };
}
