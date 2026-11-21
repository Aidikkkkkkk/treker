import { View, Text } from "react-native";
import { useExercise } from "@/hooks/useExercise";
import { useExerciseCatalog } from "@/hooks/useExerciseCatalog";
import ListExercise from "./ListExercise";
import ExerciseModal from "./ExerciseModal";
import CustomBackButton from "../global/CustomBackButton";
import { SCREEN_STYLES } from "@/styles";
import CustomBottomBar from "../global/CustomBottomBar";
import { router } from "expo-router";

interface ExerciseProps {
   workout_id: number;
}

export default function Exercise({ workout_id }: ExerciseProps) {
   const { showCreate, setShowCreate, createExercise, exercises, deleteExercise } = useExercise(workout_id);
   const { exerciseCatalog, loadExerciseCatalog, createExerciseCatalog } = useExerciseCatalog();

   function openCreate() {
      loadExerciseCatalog();
      setShowCreate(true);
   }

   return (
      <View style={SCREEN_STYLES.content}>
         <View style={SCREEN_STYLES.header}>
            <CustomBackButton />
            <Text style={SCREEN_STYLES.title}>Упражнения</Text>
         </View>
         <ListExercise exercises={exercises} deleteExercise={deleteExercise} />
         <CustomBottomBar
            secondary={{ title: "Каталог", onPress: () => router.push("/catalog") }}
            primary={{ title: "Выбрать упражнение", onPress: openCreate }}
         />
         <ExerciseModal
            visible={showCreate}
            onClose={() => setShowCreate(false)}
            onCreate={createExercise}
            onCreateCatalog={createExerciseCatalog}
            workout_id={workout_id}
            catalog={exerciseCatalog}
         />
      </View>
   );
}
