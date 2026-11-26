import { useState, useEffect } from "react";
import { formatDuration } from "@/components/rep/timer";

const MAX_REST_MINUTES = 10;

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
