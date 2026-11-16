import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Set from "@/components/set/Set";

export default function SetScreen() {
   const { exercise_id } = useLocalSearchParams<{ exercise_id: string }>();
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7FA" }}>
         <Set exercise_id={Number(exercise_id)} />
      </SafeAreaView>
   );
}
