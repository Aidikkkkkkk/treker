import { View, Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useTreker } from "@/TrekerContext";
import CreateWorkoutModal from "./CreateWorkoutModal";
import { COLORS } from "@/styles";

export default function CreateButton() {
   const treker = useTreker();
   const [showCreate, setShowCreate] = useState(false);

   async function handlerCreateWeek(intensity: "light" | "heavy", date: Date) {
      setShowCreate(false);
      try {
         await treker?.createWorkout({
            dateWorkout: date.toISOString(),
            intensity,
         });
      } catch (e) {
         console.error("createWorkout упал:", e);
      }
   }

   return (
      <>
         <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => setShowCreate(true)}>
               <Text style={styles.buttonText}>+ Новая неделя</Text>
            </Pressable>
         </View>

         <CreateWorkoutModal visible={showCreate} onClose={() => setShowCreate(false)} onCreate={handlerCreateWeek} />
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 32,
      paddingBottom: 24,
      marginTop: 10,
      backgroundColor: COLORS.background,
   },
   button: {
      height: 66,
      width: "100%",
      borderRadius: 40,
      backgroundColor: COLORS.accent,
      justifyContent: "center",
      alignItems: "center",
   },
   buttonText: {
      color: COLORS.textOnAccent,
      fontSize: 18,
      fontWeight: "700",
   },
});
