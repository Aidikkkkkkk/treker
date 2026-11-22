import { View, Text } from "react-native";
import { useRep } from "@/hooks/useRep";
import CustomBackButton from "../global/CustomBackButton";
import { SCREEN_STYLES } from "@/styles";
import ListRep from "./ListRep";

interface repProps {
   exercise_id: number;
}
import { KeyboardAvoidingView, Platform } from "react-native";
import RepForm from "./RepForm";

export default function Rep({ exercise_id }: repProps) {
   const { createRep, reps, deleteRep } = useRep(exercise_id);

   return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
         <View style={SCREEN_STYLES.content}>
            <View style={SCREEN_STYLES.header}>
               <CustomBackButton />
               <Text style={SCREEN_STYLES.title}>Подходы</Text>
            </View>
            <ListRep reps={reps} deleteRep={deleteRep} />
            <RepForm exercise_id={exercise_id} lastRep={reps[reps.length - 1]} onCreate={createRep} />
         </View>
      </KeyboardAvoidingView>
   );
}
