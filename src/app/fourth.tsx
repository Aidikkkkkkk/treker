import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Rep from "@/components/rep/Rep";

export default function RepScreen() {
   const { exercise_id } = useLocalSearchParams<{ exercise_id: string }>();
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7FA" }}>
         <Rep exercise_id={Number(exercise_id)} />
      </SafeAreaView>
   );
}
