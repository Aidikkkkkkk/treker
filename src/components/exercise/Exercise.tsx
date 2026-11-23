import { View, Text } from "react-native";
import { router } from "expo-router";
import { useExercise } from "@/hooks/useExercise";
import { useExerciseCatalog } from "@/hooks/useExerciseCatalog";
import CustomBackButton from "../global/CustomBackButton";
import CustomBottomBar from "../global/CustomBottomBar";
import ListExercise from "./ListExercise";
import ExerciseModal from "./ExerciseModal";
import { useStyles } from "@/context/ThemeContext";

interface ExerciseProps {
   workout_id: number;
}

export default function Exercise({ workout_id }: ExerciseProps) {
   const { SCREEN_STYLES } = useStyles();
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
