import { View, Text } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import { useExercise } from "@/hooks/useExercise";
import ListExercise from "./ListExercise";
import ExerciseModal from "./ExerciseModal";
import CustomBackButton from "../global/CustomBackButton";
import { SCREEN_STYLES } from "@/styles";

interface ExerciseProps {
   workout_id: number;
}

export default function Exercise({ workout_id }: ExerciseProps) {
   const { showCreate, setShowCreate, createExercise, exercises, deleteExercise } = useExercise(workout_id);
   return (
      <View style={SCREEN_STYLES.content}>
         <View style={SCREEN_STYLES.header}>
            <CustomBackButton />
            <Text style={SCREEN_STYLES.title}>Упражнения</Text>
         </View>
         <ListExercise exercises={exercises} deleteExercise={deleteExercise} />
         <CustomCreateButton title="Новое упражнение" onPress={() => setShowCreate(true)} />
         <ExerciseModal
            visible={showCreate}
            onClose={() => setShowCreate(false)}
            onCreate={createExercise}
            workout_id={workout_id}
         />
      </View>
   );
}
