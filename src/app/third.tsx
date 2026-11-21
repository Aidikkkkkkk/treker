import { useLocalSearchParams } from "expo-router";
import Exercise from "@/components/exercise/Exercise";

export default function ExerciseScreen() {
   const { workout_id } = useLocalSearchParams<{ workout_id: string }>();
   return <Exercise workout_id={Number(workout_id)} />;
}
