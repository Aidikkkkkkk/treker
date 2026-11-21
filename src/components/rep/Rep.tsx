import { View, Text } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import Listrep from "./ListRep";
import RepModal from "./RepModal";
import { useRep } from "@/hooks/useRep";
import CustomBackButton from "../global/CustomBackButton";
import { SCREEN_STYLES } from "@/styles";

interface repProps {
   exercise_id: number;
}

export default function Rep({ exercise_id }: repProps) {
   const { showCreate, setShowCreate, createRep, reps, deleteRep } = useRep(exercise_id);
   return (
      <View style={SCREEN_STYLES.content}>
         <View style={SCREEN_STYLES.header}>
            <CustomBackButton />
            <Text style={SCREEN_STYLES.title}>Подходы</Text>
         </View>
         <Listrep reps={reps} deleteRep={deleteRep} />
         <CustomCreateButton title="Новые подходы" onPress={() => setShowCreate(true)} />
         <RepModal
            visible={showCreate}
            onClose={() => setShowCreate(false)}
            onCreate={createRep}
            exercise_id={exercise_id}
         />
      </View>
   );
}
