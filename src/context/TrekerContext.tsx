import React, { createContext, useContext, useEffect, useState } from "react";
import { initdb } from "@/service/model";
import { TrekerRepository } from "@/service/repository";
import { TrekerService, ServiceError } from "@/service/service";
import { GlobalError } from "@/components/global/GlobalError";

const TrekerContext = createContext<TrekerService | null | undefined>(undefined);

export function TrekerProvider({ children }: { children: React.ReactNode }) {
   const [service, setService] = useState<TrekerService | null>(null);

   useEffect(() => {
      async function initialize() {
         try {
            const db = await initdb();
            const repository = new TrekerRepository(db);
            setService(new TrekerService(repository));
         } catch (error) {
            console.error("Ошибка инициализации БД:", error);

            if (error instanceof ServiceError) {
               GlobalError.show({ message: error.message, error: error.error });
            } else {
               GlobalError.show({
                  message: "Не удалось запустить приложение",
                  error: "Ошибка инициализации базы данных",
               });
            }
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
