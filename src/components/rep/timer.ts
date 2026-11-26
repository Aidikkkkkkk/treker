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
