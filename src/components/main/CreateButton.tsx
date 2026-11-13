import { View, Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";

import CreateWorkoutModal from "./CreateWorkoutModal";

export default function CreateButton() {
   const [showCreate, setShowCreate] = useState(false);

   async function handlerCreateWeek(intensity: "light" | "heavy") {
      console.log("Выбрана интенсивность:", intensity);

      // сюда добавится запись в БД

      setShowCreate(false);
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
