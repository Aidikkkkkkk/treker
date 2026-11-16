import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Workout from "@/components/workout/Workout";

export default function WorkoutScreen() {
   const { week_id } = useLocalSearchParams<{ week_id: string }>();
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7FA" }}>
         <Workout week_id={Number(week_id)} />
      </SafeAreaView>
   );
}
