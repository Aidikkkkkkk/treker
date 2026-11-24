import { useLocalSearchParams } from "expo-router";
import Rep from "@/components/rep/Rep";

export default function RepScreen() {
   const { exercise_id } = useLocalSearchParams<{ exercise_id: string }>();
   return <Rep exercise_id={Number(exercise_id)} />;
}
