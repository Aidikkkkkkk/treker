import { View } from "react-native";
import Workout from "@/components/workout/Workout";
import { useLocalSearchParams } from "expo-router";

export default function SecondScreen() {
   const { week_id } = useLocalSearchParams<{ week_id: string }>();
   return (
      <View style={{ flex: 1, padding: 20 }}>
         <Workout week_id={Number(week_id)} />
      </View>
   );
}
