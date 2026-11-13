import { useState, useEffect } from "react";

import { initdb } from "@/service/model";
import { TrekerRepository } from "@/service/repository";
import { TrekerService } from "@/service/service";

import { IWorkoutResult } from "@/types";

export function useWorkouts() {
   const [workouts, setWorkouts] = useState<IWorkoutResult[]>([]);
   const [loading, setLoading] = useState(true);

   async function loadWorkouts() {
      try {
         const db = await initdb();

         const repository = new TrekerRepository(db);
         const service = new TrekerService(repository);

         const result = await service.getAllWorkouts();

         setWorkouts(result);
      } catch (error) {
         console.error("Ошибка загрузки тренировок:", error);
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      loadWorkouts();
   }, []);

   return {
      workouts,
      loading,
      reload: loadWorkouts,
   };
}
