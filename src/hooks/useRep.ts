import { useTreker } from "@/context/TrekerContext";
import { useCrud } from "@/hooks/global/useCrud";
import { IDtoRep, IDtoRepChange, IRepResult } from "@/types";

export function useRep(exercise_id: number) {
   const treker = useTreker();

   const {
      items: reps,
      deleteItem: deleteRep,
      createItem: createRep,
      changeItem: changeRep,
      showCreate,
      setShowCreate,
      loadItems: loadRep,
   } = useCrud<IRepResult, IDtoRep, IDtoRepChange>({
      getAll: (id) => treker!.getAllReps(id!),
      create: (dto) => treker!.createRep(dto),
      remove: (id) => treker!.deleteRep(id),
      change: (dto) => treker!.changeRep(dto),
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
      changeRep,
   };
}
