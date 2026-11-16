import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Exercise from "@/components/exercise/Exercise";

export default function ExerciseScreen() {
   const { workout_id } = useLocalSearchParams<{ workout_id: string }>();
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7FA" }}>
         <Exercise workout_id={Number(workout_id)} />
      </SafeAreaView>
   );
}
