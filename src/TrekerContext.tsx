import React, { createContext, useContext, useEffect, useState } from "react";
import { initdb } from "@/service/model";
import { TrekerRepository } from "@/service/repository";
import { TrekerService } from "@/service/service";

const TrekerContext = createContext<TrekerService | null>(null);

export function TrekerProvider({ children }: { children: React.ReactNode }) {
   const [service, setService] = useState<TrekerService | null>(null);
   useEffect(() => {
      async function initialize() {
         try {
            const db = await initdb();
            const repository = new TrekerRepository(db);
            const trekerService = new TrekerService(repository);

            setService(trekerService);
         } catch (error) {
            console.error("Ошибка инициализации БД:", error);
         }
      }

      initialize();
   }, []);

   return <TrekerContext.Provider value={service}>{children}</TrekerContext.Provider>;
}

export function useTreker() {
   const context = useContext(TrekerContext);
   if (context === undefined) {
      throw new Error("useTreker должен использоваться внутри TrekerProvider");
   }
   return context;
}
