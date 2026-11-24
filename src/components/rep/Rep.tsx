import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { useRep } from "@/hooks/useRep";
import { IDtoRepChange } from "@/types";
import CustomBackButton from "../global/CustomBackButton";
import RepForm from "./RepForm";
import ListRep from "./ListRep";
import { useStyles } from "@/context/ThemeContext";

interface RepProps {
   exercise_id: number;
}

export default function Rep({ exercise_id }: RepProps) {
   const { reps, createRep, changeRep, deleteRep } = useRep(exercise_id);
   const [editing, setEditing] = useState<IDtoRepChange | null>(null);
   const { SCREEN_STYLES } = useStyles();

   return (
      <KeyboardAvoidingView style={SCREEN_STYLES.keyboardView} behavior={Platform.OS === "ios" ? "padding" : undefined}>
         <View style={SCREEN_STYLES.content}>
            <View style={SCREEN_STYLES.header}>
               <CustomBackButton />
               <Text style={SCREEN_STYLES.title}>Подходы</Text>
            </View>
            <ListRep items={reps} onDelete={deleteRep} onEdit={setEditing} />
            <RepForm
               lastRep={reps[reps.length - 1]}
               editing={editing}
               onCreate={(dto) => createRep({ exercise_id, ...dto })}
               onChange={changeRep}
               onCancelEdit={() => setEditing(null)}
            />
         </View>
      </KeyboardAvoidingView>
   );
}
