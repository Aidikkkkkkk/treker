import { useState, useEffect } from "react";

import { initdb } from "@/service/model";
import { TrekerRepository } from "@/service/repository";
import { TrekerService } from "@/service/service";

import { IWorkoutResult } from "@/types";

export function useWorkouts() {
   const [workouts, setWorkouts] = useState<IWorkoutResult[]>([]);

   async function loadWorkouts() {
      try {
         const db = await initdb();

         const repository = new TrekerRepository(db);
         const service = new TrekerService(repository);

         setWorkouts(await service.getAllWorkouts());
      } catch (error) {
         console.error("Ошибка загрузки тренировок:", error);
      }
   }

   useEffect(() => {
      loadWorkouts();
   }, []);

   return {
      workouts,
      reload: loadWorkouts,
   };
}
