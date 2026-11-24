import { useTreker } from "@/context/TrekerContext";
import { useCrud } from "@/hooks/global/useCrud";
import { IWeekResult, IDtoWeek, IDtoWeekChange } from "@/types";

export function useWeeks() {
   const treker = useTreker();

   const {
      items: weeks,
      deleteItem: deleteWeek,
      createItem: createWeek,
      changeItem: changeWeek,
      showCreate,
      setShowCreate,
      loadItems: loadWeeks,
   } = useCrud<IWeekResult, IDtoWeek, IDtoWeekChange>({
      getAll: () => treker!.getAllWeeks(),
      create: (dto) => treker!.createWeek(dto),
      remove: (id) => treker!.deleteWeek(id),
      entityName: "недели",
      change: (dto) => treker!.changeWeek(dto),
   });

   return {
      weeks,
      deleteWeek,
      createWeek,
      showCreate,
      setShowCreate,
      loadWeeks,
      changeWeek,
   };
}
