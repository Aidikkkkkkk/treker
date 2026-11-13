import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { useWorkouts } from "@/hooks/useWorkouts";

import WorkoutList from "@/components/main/WorkoutList";
import CreateButton from "@/components/main/CreateButton";
import CreateWorkoutModal from "@/components/main/CreateWorkoutModal";

export default function Main() {
   const { workouts } = useWorkouts();

   const [showCreate, setShowCreate] = useState(false);

   async function handlerCreateWeek(intensity: "light" | "heavy") {
      console.log("Выбрана интенсивность:", intensity);

      setShowCreate(false);
   }

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.content}>
            <Text style={styles.mainTitle}>Тренировки</Text>

            <WorkoutList workouts={workouts} />

            <View style={styles.buttonContainer}>
               <CreateButton onPress={() => setShowCreate(true)} />
            </View>
         </View>

         <CreateWorkoutModal visible={showCreate} onClose={() => setShowCreate(false)} onCreate={handlerCreateWeek} />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#110f17",
   },
   content: {
      flex: 1,
      paddingHorizontal: 28,
      paddingTop: 22,
   },
   mainTitle: {
      color: "#ece8f4",
      fontSize: 34,
      fontWeight: "800",
   },
   buttonContainer: {
      paddingTop: 32,
      paddingBottom: 24,
      marginTop: 10,
      backgroundColor: "#110f17",
   },
});
