import { useTreker } from "@/context/TrekerContext";
import { useCrud } from "@/hooks/global/useCrud";
import { IWorkoutResult, IDtoWorkout } from "@/types";

export function useWorkouts(week_id: number) {
   const treker = useTreker();

   const {
      items: workouts,
      deleteItem: deleteWorkout,
      createItem: createWorkout,
      showCreate,
      setShowCreate,
      loadItems: loadWorkouts,
   } = useCrud<IWorkoutResult, IDtoWorkout>({
      getAll: (id) => treker!.getAllWorkouts(id!),
      create: (dto) => treker!.createWorkout(dto),
      remove: (id) => treker!.deleteWorkout(id),
      parentId: week_id,
      entityName: "тренировки",
   });

   return {
      workouts,
      deleteWorkout,
      createWorkout,
      showCreate,
      setShowCreate,
      loadWorkouts,
   };
}
