import { useEffect } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useExercise } from "@/hooks/useExercise";

export default function SecondScreen() {
   const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
   const { exercises, loadExercises } = useExercise();

   useEffect(() => {
      if (workoutId) {
         loadExercises(Number(workoutId));
      }
   }, [workoutId]);

   return (
      <View style={{ flex: 1, padding: 20 }}>
         <Text>Упражнения для тренировки #{workoutId}</Text>
         {exercises.map((exercise) => (
            <View>
               <Text>{exercise.nameExercise}</Text>
            </View>
         ))}
      </View>
   );
}
