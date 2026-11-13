import { View, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { initdb } from "@/service/model";
import { TrekerRepository } from "@/service/repository";
import { TrekerService } from "@/service/service";
import { ROOT_STYLES } from "./constans";
import { IWorkoutResult } from "@/types";

import { useState, useEffect } from "react";

function useInit() {
   const [workouts, setWorkout] = useState<IWorkoutResult[]>([]);
   async function handlerInit() {
      try {
         const db = await initdb();
         const repository = new TrekerRepository(db);
         const service = new TrekerService(repository);
         setWorkout(await service.getAllWorkouts());
      } catch (error) {
         console.error("Ошибка инициализации БД:", error);
      }
   }
   useEffect(() => {
      handlerInit();
   }, []);
   return workouts;
}

export default function Main() {
   const workouts = useInit();

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.view1}>
            <Text style={ROOT_STYLES.mainText}>Тренировки</Text>

            <FlatList
               data={workouts}
               keyExtractor={(workout) => workout.id.toString()}
               renderItem={({ item: workout }) => (
                  <View style={styles.cardWorkout}>
                     <Text style={ROOT_STYLES.subText}>{new Date(workout.dateWorkout).toLocaleDateString()}</Text>
                     <Text style={ROOT_STYLES.subText}>{new Date(workout.dateWorkout).toLocaleTimeString()}</Text>
                  </View>
               )}
               showsVerticalScrollIndicator={true}
            />
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: ROOT_STYLES.background.backgroundColor,
      padding: 36,
   },
   view1: {
      flex: 1,
      justifyContent: "flex-start",
      alignSelf: "flex-start",
      margin: 6,
   },
   cardWorkout: {
      width: 300,
      backgroundColor: "#1b1824",
      borderColor: "#2e2a3d",
      padding: 16,
      borderRadius: 20,
   },
});
