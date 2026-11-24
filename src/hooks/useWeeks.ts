import { useTreker } from "@/context/TrekerContext";
import { useCrud } from "@/hooks/global/useCrud";
import { IWeekResult, IDtoWeek } from "@/types";

export function useWeeks() {
   const treker = useTreker();

   const {
      items: weeks,
      deleteItem: deleteWeek,
      createItem: createWeek,
      showCreate,
      setShowCreate,
      loadItems: loadWeeks,
   } = useCrud<IWeekResult, IDtoWeek>({
      getAll: () => treker!.getAllWeeks(),
      create: (dto) => treker!.createWeek(dto),
      remove: (id) => treker!.deleteWeek(id),
      entityName: "недели",
   });

   return {
      weeks,
      deleteWeek,
      createWeek,
      showCreate,
      setShowCreate,
      loadWeeks,
   };
}
