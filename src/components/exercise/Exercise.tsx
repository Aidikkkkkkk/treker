import { View, Text, StyleSheet } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import { COLORS } from "@/styles";
import { useExercise } from "@/hooks/useExercise";
import ListExercise from "./ListExercise";
import ExerciseModal from "./ExerciseModal";

interface ExerciseProps {
   workout_id: number;
}

export default function Exercise({ workout_id }: ExerciseProps) {
   const { showCreate, setShowCreate, createExercise } = useExercise(workout_id);
   return (
      <View style={styles.content}>
         <Text style={styles.mainTitle}>Упражнения</Text>
         <ListExercise workout_id={workout_id} />
         <CustomCreateButton title="Новая тренировка" onPress={() => setShowCreate(true)} />
         <ExerciseModal
            visible={showCreate}
            onClose={() => setShowCreate(false)}
            onCreate={createExercise}
            workout_id={workout_id}
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
