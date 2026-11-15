import { useEffect } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useExercise } from "@/hooks/useExercise";
import CreateButtonDisign from "@/components/global/CreateButton";

export default function SecondScreen() {
   const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
   const { exercises, loadExercises } = useExercise();

   useEffect(() => {
      if (workoutId) {
         loadExercises(Number(workoutId));
         console.log(`workoutId = ${workoutId}`);
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
         <CreateButtonDisign title="Новая тренировка" onPress={() => console.log("Нажатие")} />
      </View>
   );
}
