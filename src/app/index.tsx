import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
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
         <View style={styles.content}>
            <Text style={ROOT_STYLES.mainText}>Тренировки</Text>

            <FlatList
               data={workouts}
               keyExtractor={(workout) => workout.id.toString()}
               contentContainerStyle={styles.list}
               showsVerticalScrollIndicator={false}
               renderItem={({ item: workout, index }) => (
                  <Pressable style={styles.cardWorkout}>
                     <View style={styles.cardHeader}>
                        <Text style={styles.weekTitle}>Неделя {workouts.length - index}</Text>

                        <View
                           style={[styles.badge, workout.intensity === "heavy" ? styles.heavyBadge : styles.lightBadge]}
                        >
                           <Text
                              style={[
                                 styles.badgeText,
                                 workout.intensity === "heavy" ? styles.heavyText : styles.lightText,
                              ]}
                           >
                              {workout.intensity === "heavy" ? "Тяжёлая" : "Лёгкая"}
                           </Text>
                        </View>
                     </View>

                     <Text style={styles.cardDescription}>{new Date(workout.dateWorkout).toLocaleDateString()}</Text>
                  </Pressable>
               )}
            />

            <View style={styles.buttonContainer}>
               <Pressable style={styles.createButton}>
                  <Text style={styles.createButtonText}>+ Новая неделя</Text>
               </Pressable>
            </View>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: ROOT_STYLES.background.backgroundColor,
   },

   content: {
      flex: 1,
      paddingHorizontal: 28,
      paddingTop: 22,
   },

   list: {
      flexGrow: 1,
      justifyContent: "center",
      paddingTop: 22,
      paddingBottom: 16,
   },

   buttonContainer: {
      paddingTop: 32,
      paddingBottom: 24,
      marginTop: 10,
      backgroundColor: ROOT_STYLES.background.backgroundColor,
   },

   createButton: {
      height: 66,
      width: "100%",
      borderRadius: 40,
      backgroundColor: "#a78bfa",
      justifyContent: "center",
      alignItems: "center",
   },

   cardWorkout: {
      width: "100%",
      backgroundColor: "#1b1924",
      borderColor: "#302c40",
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 17,
      borderRadius: 26,
      marginBottom: 14,
   },

   cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 7,
   },

   weekTitle: {
      color: "#ece8f4",
      fontSize: 20,
      fontWeight: "700",
   },

   cardDescription: {
      color: "#a59fb5",
      fontSize: 15,
   },

   badge: {
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 30,
   },

   heavyBadge: {
      backgroundColor: "#382519",
   },

   lightBadge: {
      backgroundColor: "#2c214d",
   },

   badgeText: {
      fontSize: 14,
      fontWeight: "700",
   },

   heavyText: {
      color: "#efb18d",
   },

   lightText: {
      color: "#c5b3ff",
   },

   createButtonText: {
      color: "#171020",
      fontSize: 18,
      fontWeight: "700",
   },
});
