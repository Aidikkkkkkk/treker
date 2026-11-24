import { View, Text } from "react-native";
import { router } from "expo-router";
import { useExercise } from "@/hooks/useExercise";
import { useExerciseCatalog } from "@/hooks/useExerciseCatalog";
import { useEntityModal } from "@/hooks/global/useEntityModal";
import { IDtoExerciseChange } from "@/types";
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
   const { exercises, createExercise, changeExercise, deleteExercise } = useExercise(workout_id);
   const { exerciseCatalog, loadExerciseCatalog } = useExerciseCatalog();
   const modal = useEntityModal<IDtoExerciseChange>();

   function openCreate() {
      loadExerciseCatalog();
      modal.openCreate();
   }
   function openEdit(item: IDtoExerciseChange) {
      loadExerciseCatalog();
      modal.openEdit(item);
   }

   return (
      <View style={SCREEN_STYLES.content}>
         <View style={SCREEN_STYLES.header}>
            <CustomBackButton />
            <Text style={SCREEN_STYLES.title}>Упражнения</Text>
         </View>
         <ListExercise items={exercises} onDelete={deleteExercise} onEdit={openEdit} />
         <CustomBottomBar
            secondary={{ title: "Каталог", onPress: () => router.push("/catalog") }}
            primary={{ title: "Выбрать упражнение", onPress: openCreate }}
         />

         {modal.editing ? (
            <ExerciseModal
               mode="edit"
               visible={modal.visible}
               initialData={modal.editing}
               onClose={modal.close}
               onChange={changeExercise}
               catalog={exerciseCatalog}
            />
         ) : (
            <ExerciseModal
               mode="create"
               visible={modal.visible}
               onClose={modal.close}
               onCreate={(dto) => createExercise({ workout_id, ...dto })}
               catalog={exerciseCatalog}
            />
         )}
      </View>
   );
}
