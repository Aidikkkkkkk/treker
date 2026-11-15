import { useEffect } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useExercise } from "@/hooks/useExercise";
import CreateButtonDisign from "@/components/global/CreateButton";
import ListWorkouts from "@/components/workout/ListWorkouts";
export default function SecondScreen() {
   const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

   // useEffect(() => {
   //    if (workoutId) {
   //       loadExercises(Number(workoutId));
   //       console.log(`workoutId = ${workoutId}`);
   //    }
   // }, [workoutId]);

   return (
      <View style={{ flex: 1, padding: 20 }}>
         <Text>Упражнения для тренировки #{workoutId}</Text>
         <ListWorkouts />
         <CreateButtonDisign title="Новая тренировка" onPress={() => console.log("Нажатие")} />
      </View>
   );
}
