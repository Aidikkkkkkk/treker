import { View, Text, StyleSheet } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import { COLORS } from "@/styles";
import ListWorkouts from "./ListWorkouts";
import { useWorkouts } from "@/hooks/useWorkout";
import WorkoutModal from "./WorkoutModal";
import CustomBackButton from "../global/CustomBackButton";

interface WorkoutProps {
   week_id: number;
}

export default function Workout({ week_id }: WorkoutProps) {
   const { showCreate, setShowCreate, createWorkout } = useWorkouts(week_id);
   return (
      <View style={styles.content}>
         <View style={styles.header}>
            <CustomBackButton />
            <Text style={styles.mainTitle}>Тренировки</Text>
         </View>
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
   header: {
      flexDirection: "row", // Выстраивает элементы в горизонтальный ряд
      alignItems: "center", // Выравнивает кнопку и текст по центру по вертикали
      gap: 12, // Добавляет отступ между кнопкой и текстом (вместо margin)
      paddingHorizontal: 16, // Отступы слева и справа от краев экрана
      paddingVertical: 12, // Отступы сверху и снизу
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
