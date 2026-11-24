import { useTreker } from "@/context/TrekerContext";
import { useCrud } from "@/hooks/global/useCrud";
import { IDtoExercise, IExerciseResult } from "@/types";

export function useExercise(workout_id: number) {
   const treker = useTreker();

   const {
      items: exercises,
      deleteItem: deleteExercise,
      createItem: createExercise,
      showCreate,
      setShowCreate,
      loadItems: loadExercises,
   } = useCrud<IExerciseResult, IDtoExercise>({
      getAll: (id) => treker!.getAllExercises(id!),
      create: (dto) => treker!.createExercise(dto),
      remove: (id) => treker!.deleteExercise(id),
      parentId: workout_id,
      entityName: "упражнения",
   });

   return {
      exercises,
      deleteExercise,
      createExercise,
      showCreate,
      setShowCreate,
      loadExercises,
   };
}
