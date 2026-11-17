import { View, Text } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import ListWorkouts from "./ListWorkouts";
import { useWorkouts } from "@/hooks/useWorkout";
import WorkoutModal from "./WorkoutModal";
import CustomBackButton from "../global/CustomBackButton";
import { SCREEN_STYLES } from "@/styles";

interface WorkoutProps {
   week_id: number;
}

export default function Workout({ week_id }: WorkoutProps) {
   const { showCreate, setShowCreate, createWorkout, workouts, deleteWorkout } = useWorkouts(week_id);
   return (
      <View style={SCREEN_STYLES.content}>
         <View style={SCREEN_STYLES.header}>
            <CustomBackButton />
            <Text style={SCREEN_STYLES.title}>Тренировки</Text>
         </View>
         <ListWorkouts workouts={workouts} deleteWorkout={deleteWorkout} />
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
