import { View, Text } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import CustomBackButton from "../global/CustomBackButton";
import ListWorkouts from "./ListWorkouts";
import WorkoutModal from "./WorkoutModal";
import { useWorkouts } from "@/hooks/useWorkout";
import { useEntityModal } from "@/hooks/global/useEntityModal";
import { IDtoWorkoutChange } from "@/types";
import { useStyles } from "@/context/ThemeContext";

interface WorkoutProps {
   week_id: number;
}

export default function Workout({ week_id }: WorkoutProps) {
   const { SCREEN_STYLES } = useStyles();
   const { workouts, createWorkout, changeWorkout, deleteWorkout } = useWorkouts(week_id);
   const modal = useEntityModal<IDtoWorkoutChange>();

   return (
      <View style={SCREEN_STYLES.content}>
         <View style={SCREEN_STYLES.header}>
            <CustomBackButton />
            <Text style={SCREEN_STYLES.title}>Тренировки</Text>
         </View>
         <ListWorkouts items={workouts} onDelete={deleteWorkout} onEdit={modal.openEdit} />
         <CustomCreateButton title="+ Новая тренировка" onPress={modal.openCreate} />

         {modal.editing ? (
            <WorkoutModal
               mode="edit"
               visible={modal.visible}
               initialData={modal.editing}
               onClose={modal.close}
               onChange={changeWorkout}
            />
         ) : (
            <WorkoutModal
               mode="create"
               visible={modal.visible}
               onClose={modal.close}
               onCreate={(dto) => createWorkout({ week_id, ...dto })}
            />
         )}
      </View>
   );
}
