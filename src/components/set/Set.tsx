import { View, Text, StyleSheet } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import { COLORS } from "@/styles";
import { useExercise } from "@/hooks/useExercise";
import ListSet from "./ListSet";
import SetModal from "./SetModal";
import { useSet } from "@/hooks/useSet";

interface SetProps {
   exercise_id: number;
}

export default function Set({ exercise_id }: SetProps) {
   const { showCreate, setShowCreate, createSet } = useSet(exercise_id);
   return (
      <View style={styles.content}>
         <Text style={styles.mainTitle}>Подходы</Text>
         <ListSet exercise_id={exercise_id} />
         <CustomCreateButton title="Новый подход" onPress={() => setShowCreate(true)} />
         <SetModal
            visible={showCreate}
            onClose={() => setShowCreate(false)}
            onCreate={createSet}
            exercise_id={exercise_id}
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
