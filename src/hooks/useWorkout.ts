import { useState, useEffect } from "react";
import { useTreker } from "@/context/TrekerContext";
import { IWorkoutResult, IDtoWorkout } from "@/types";

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
         setWorkouts(await treker.getAllWorkouts(id));
         await loadWorkouts(week_id);
      } catch (error) {
         console.error("Ошибка загрузки тренировок:", error);
      }
   }

   async function createWorkout(dto: IDtoWorkout) {
      if (!treker) return;
      try {
         await treker.createWorkout(dto);
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
