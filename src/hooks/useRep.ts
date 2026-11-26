import { useTreker } from "@/context/TrekerContext";
import { useCrud } from "@/hooks/global/useCrud";
import { IDtoRep, IDtoRepChange, IRepResult } from "@/types";
import { useState, useEffect } from "react";

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
const MAX_REST_MINUTES = 10;

export function formatDuration(ms: number): string {
   const diffSec = Math.max(0, Math.floor(ms / 1000));
   const mins = Math.floor(diffSec / 60);
   const secs = diffSec % 60;
   return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function formatStaticTime(isoString: string): string {
   const date = new Date(isoString);
   if (Number.isNaN(date.getTime())) return isoString;

   return date
      .toLocaleTimeString("ru-RU", {
         hour: "2-digit",
         minute: "2-digit",
         second: "2-digit",
      })
      .replaceAll(":", ".");
}

export function useTimer(isoTime: string, maxMinutes = MAX_REST_MINUTES): string | null {
   const [now, setNow] = useState<number>(() => Date.now());
   const targetMs = new Date(isoTime).getTime();
   const maxMs = maxMinutes * 60 * 1000;

   const diffMs = Math.max(0, now - targetMs);
   const isExpired = Number.isNaN(targetMs) || diffMs >= maxMs;

   useEffect(() => {
      if (isExpired) return;

      setNow(Date.now());
      const intervalId = setInterval(() => {
         setNow(Date.now());
      }, 1000);

      return () => clearInterval(intervalId);
   }, [targetMs, isExpired]);

   if (isExpired) {
      return null;
   }

   return formatDuration(diffMs);
}
