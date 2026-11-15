import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Set from "@/components/set/Set";

export default function SecondScreen() {
   const { exercise_id } = useLocalSearchParams<{ exercise_id: string }>();
   return (
      <View style={{ flex: 1, padding: 20 }}>
         <Set exercise_id={Number(exercise_id)} />
      </View>
   );
}
