import { View, Text, StyleSheet } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import { COLORS } from "@/styles";
import ListWorkouts from "./ListWorkouts";
import { useWorkouts } from "@/hooks/useWorkout";
import WorkoutModal from "./WorkoutModal";

interface WorkoutProps {
   week_id: number;
}

export default function Workout({ week_id }: WorkoutProps) {
   const { showCreate, setShowCreate, createWorkout } = useWorkouts(week_id);
   return (
      <View style={styles.content}>
         <Text style={styles.mainTitle}>Тренировки</Text>
         <ListWorkouts week_id={week_id} />
         <CustomCreateButton title="Новая тренировка" onPress={() => setShowCreate(true)} />
         <WorkoutModal
            visible={showCreate}
            onClose={() => setShowCreate(false)}
            onCreate={createWorkout}
            week_id={week_id}
         />
      </View>
   );
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.background,
   },
   content: {
      flex: 1,
      paddingHorizontal: 28,
      paddingTop: 22,
   },
   mainTitle: {
      color: COLORS.textPrimary,
      fontSize: 34,
      fontWeight: "800",
   },
});
