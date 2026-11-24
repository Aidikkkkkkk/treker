import { useState, useEffect } from "react";
import { useTreker } from "@/context/TrekerContext";

interface IUseCrud<T, D> {
   getAll: (id?: number) => Promise<T[]>;
   create: (dto: D) => Promise<unknown>;
   remove: (id: number) => Promise<unknown>;
   parentId?: number;
   entityName: string;
}

export function useCrud<T extends { id: number }, D>({ getAll, create, remove, parentId, entityName }: IUseCrud<T, D>) {
   const treker = useTreker();

   const [items, setItems] = useState<T[]>([]);
   const [showCreate, setShowCreate] = useState(false);

   async function deleteItem(id: number) {
      if (!treker) return;

      try {
         await remove(id);
         setItems((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
         console.error(`Ошибка удаления ${entityName}:`, error);
      }
   }

   async function loadItems(id?: number) {
      if (!treker) return;

      try {
         setItems(await getAll(id));
      } catch (error) {
         console.error(`Ошибка загрузки ${entityName}:`, error);
      }
   }

   async function createItem(dto: D) {
      if (!treker) return;

      try {
         await create(dto);
         await loadItems(parentId);
         setShowCreate(false);
      } catch (error) {
         console.error(`Ошибка создания ${entityName}:`, error);
      }
   }

   useEffect(() => {
      if (!treker) return;
      if (parentId === 0) return;

      loadItems(parentId);
   }, [treker, parentId]);

   return {
      items,
      setItems,
      deleteItem,
      createItem,
      showCreate,
      setShowCreate,
      loadItems,
   };
}
