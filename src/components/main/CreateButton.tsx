import { View, Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useTreker } from "@/TrekerContext";
import CreateWorkoutModal from "./CreateWorkoutModal";

export default function CreateButton() {
   const treker = useTreker();
   const [showCreate, setShowCreate] = useState(false);

   async function handlerCreateWeek(intensity: "light" | "heavy") {
      setShowCreate(false);
      console.log("treker:", treker ? "есть" : "НЕТ (нет Provider над кнопкой)");
      try {
         const res = await treker?.createWorkout({
            dateWorkout: new Date().toISOString(),
            intensity,
         });
         console.log("createWorkout результат:", res);
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
      backgroundColor: "#110f17",
   },
   button: {
      height: 66,
      width: "100%",
      borderRadius: 40,
      backgroundColor: "#a78bfa",
      justifyContent: "center",
      alignItems: "center",
   },
   buttonText: {
      color: "#171020",
      fontSize: 18,
      fontWeight: "700",
   },
});
