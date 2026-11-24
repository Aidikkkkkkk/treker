import { useState } from "react";

export function useEntityModal<T>() {
   const [visible, setVisible] = useState(false);
   const [editing, setEditing] = useState<T | null>(null);

   return {
      visible,
      editing,
      openCreate: () => {
         setEditing(null);
         setVisible(true);
      },
      openEdit: (item: T) => {
         setEditing(item);
         setVisible(true);
      },
      close: () => setVisible(false),
   };
}
