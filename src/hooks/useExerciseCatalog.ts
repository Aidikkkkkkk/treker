import { useTreker } from "@/context/TrekerContext";
import { useCrud } from "@/hooks/global/useCrud";
import { IDtoExerciseCatalog, IDtoExerciseCatalogChange, IExerciseCatalogResult } from "@/types";

export function useExerciseCatalog() {
   const treker = useTreker();

   const {
      items: exerciseCatalog,
      deleteItem: deleteFromExerciseCatalog,
      createItem: createExerciseCatalog,
      changeItem: changeExerciseCatalog,
      showCreate,
      setShowCreate,
      loadItems: loadExerciseCatalog,
   } = useCrud<IExerciseCatalogResult, IDtoExerciseCatalog, IDtoExerciseCatalogChange>({
      getAll: () => treker!.getAllExerciseCatalog(),
      create: (dto) => treker!.createExerciseCatalog(dto),
      remove: (id) => treker!.deleteFromExerciseCatalog(id),
      change: (dto) => treker!.changeExerciseCatalog(dto),
      entityName: "каталога",
   });

   return {
      exerciseCatalog,
      deleteFromExerciseCatalog,
      createExerciseCatalog,
      showCreate,
      setShowCreate,
      loadExerciseCatalog,
      changeExerciseCatalog,
   };
}
