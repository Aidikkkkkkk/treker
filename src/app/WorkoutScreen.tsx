import { useLocalSearchParams } from "expo-router";
import Workout from "@/components/workout/Workout";

export default function WorkoutScreen() {
   const { week_id } = useLocalSearchParams<{ week_id: string }>();
   return <Workout week_id={Number(week_id)} />;
}
