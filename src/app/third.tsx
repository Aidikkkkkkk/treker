import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Exercise from "@/components/exercise/Exercise";

export default function SecondScreen() {
   const { workout_id } = useLocalSearchParams<{ workout_id: string }>();
   return (
      <View style={{ flex: 1, padding: 20 }}>
         <Exercise workout_id={Number(workout_id)} />
      </View>
   );
}
