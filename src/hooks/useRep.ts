import { useTreker } from "@/context/TrekerContext";
import { useCrud } from "@/hooks/global/useCrud";
import { IDtoRep, IRepResult } from "@/types";

export function useRep(exercise_id: number) {
   const treker = useTreker();

   const {
      items: reps,
      deleteItem: deleteRep,
      createItem: createRep,
      showCreate,
      setShowCreate,
      loadItems: loadRep,
   } = useCrud<IRepResult, IDtoRep>({
      getAll: (id) => treker!.getAllReps(id!),
      create: (dto) => treker!.createRep(dto),
      remove: (id) => treker!.deleteRep(id),
      parentId: exercise_id,
      entityName: "подходы",
   });

   return {
      reps,
      deleteRep,
      createRep,
      showCreate,
      setShowCreate,
      loadRep,
   };
}
