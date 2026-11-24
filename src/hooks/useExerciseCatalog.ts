import { useTreker } from "@/context/TrekerContext";
import { useCrud } from "@/hooks/global/useCrud";
import { IDtoExerciseCatalog, IExerciseCatalogResult } from "@/types";

export function useExerciseCatalog() {
   const treker = useTreker();

   const {
      items: exerciseCatalog,
      deleteItem: deleteFromExerciseCatalog,
      createItem: createExerciseCatalog,
      showCreate,
      setShowCreate,
      loadItems: loadExerciseCatalog,
   } = useCrud<IExerciseCatalogResult, IDtoExerciseCatalog>({
      getAll: () => treker!.getAllExerciseCatalog(),
      create: (dto) => treker!.createExerciseCatalog(dto),
      remove: (id) => treker!.deleteFromExerciseCatalog(id),
      entityName: "каталога",
   });

   return {
      exerciseCatalog,
      deleteFromExerciseCatalog,
      createExerciseCatalog,
      showCreate,
      setShowCreate,
      loadExerciseCatalog,
   };
}
