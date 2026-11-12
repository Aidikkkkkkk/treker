import { TrekerRepository } from "@/service/repository";
import { initdb } from "@/service/model";
import { Button, View } from "react-native";
import { useState, useEffect } from "react";

function useInitDb() {
   const [trekerRepository, setTrekerRepository] = useState<TrekerRepository | null>(null);
   async function handlerInit() {
      const db = await initdb();
      const trekerRepository = new TrekerRepository(db);
      setTrekerRepository(trekerRepository);
      await trekerRepository.seedInitialData();
   }
   useEffect(() => {
      handlerInit();
   }, []);

   return {
      trekerRepository,
   };
}

export default function TestButton() {
   const { trekerRepository } = useInitDb();
   return (
      <View>
         <Button
            onPress={async () => {
               console.log(await trekerRepository?.getAllRowsWorkouts());
               console.log(await trekerRepository?.getAllRowsExercises());
               console.log(await trekerRepository?.getAllRowsSets());
            }}
            title="Test Button 1"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
         />
      </View>
   );
}
