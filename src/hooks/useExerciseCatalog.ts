import { useState, useEffect } from "react";
import { useTreker } from "@/TrekerContext";
import { IDtoExerciseCatalog, IExerciseCatalogResult } from "@/types";

export function useExerciseCatalog() {
   const treker = useTreker();
   const [exerciseCatalog, setExerciseCatalog] = useState<IExerciseCatalogResult[]>([]);
   const [showCreate, setShowCreate] = useState(false);

   async function deleteExerciseCatalog(id: number) {
      if (!treker) return;
      try {
         await treker.deleteExerciseCatalog(id);
         setExerciseCatalog((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
         console.error("Ошибка удаления из каталога:", error);
      }
   }
   async function loadExerciseCatalog() {
      if (!treker) return;
      try {
         setExerciseCatalog(await treker.getAllExerciseCatalog());
      } catch (error) {
         console.error("Ошибка загрузки каталога:", error);
      }
   }
   async function createExerciseCatalog(dto: IDtoExerciseCatalog) {
      setShowCreate(false);
      try {
         await treker?.createExerciseCatalog(dto);
         await loadExerciseCatalog();
      } catch (e) {
         console.error("Ошибка при добавлении в каталог:", e);
      }
   }
   useEffect(() => {
      if (!treker) return;
      loadExerciseCatalog();
   }, [treker]);

   return {
      exerciseCatalog,
      deleteExerciseCatalog,
      createExerciseCatalog,
      setShowCreate,
      showCreate,
      loadExerciseCatalog,
   };
}
