import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { useRep } from "@/hooks/useRep";
import CustomBackButton from "../global/CustomBackButton";
import RepForm from "./RepForm";
import ListRep from "./ListRep";
import { useStyles } from "@/context/ThemeContext";

interface RepProps {
   exercise_id: number;
}

export default function Rep({ exercise_id }: RepProps) {
   const { createRep, reps, deleteRep } = useRep(exercise_id);
   const { SCREEN_STYLES } = useStyles();
   return (
      <KeyboardAvoidingView style={SCREEN_STYLES.keyboardView} behavior={Platform.OS === "ios" ? "padding" : undefined}>
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
