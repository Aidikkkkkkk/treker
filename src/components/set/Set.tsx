import { View, Text } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import ListSet from "./ListSet";
import SetModal from "./SetModal";
import { useSet } from "@/hooks/useSet";
import CustomBackButton from "../global/CustomBackButton";
import { SCREEN_STYLES } from "@/styles";

interface SetProps { exercise_id: number; }

export default function Set({ exercise_id }: SetProps) {
   const { showCreate, setShowCreate, createSet } = useSet(exercise_id);
   return (
      <View style={SCREEN_STYLES.content}>
         <View style={SCREEN_STYLES.header}>
            <CustomBackButton />
            <Text style={SCREEN_STYLES.title}>Подходы</Text>
         </View>
         <ListSet exercise_id={exercise_id} />
         <CustomCreateButton title="Новые подходы" onPress={() => setShowCreate(true)} />
         <SetModal visible={showCreate} onClose={() => setShowCreate(false)} onCreate={createSet} exercise_id={exercise_id} />
      </View>
   );
}
