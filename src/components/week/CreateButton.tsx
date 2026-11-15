import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { useTreker } from "@/TrekerContext";
import CreateWorkoutModal from "./CreateWeekModal";
import { COLORS } from "@/styles";
import CreateButtonDisign from "../global/CreateButton";

export default function CreateButton() {
   const treker = useTreker();
   const [showCreate, setShowCreate] = useState(false);

   async function handlerCreateWeek(intensity: "light" | "heavy") {
      setShowCreate(false);
      try {
         await treker?.createWeek({
            intensity,
         });
      } catch (e) {
         console.error("createWeek упал:", e);
      }
   }

   return (
      <>
         <View style={styles.container}>
            <CreateButtonDisign title="Новая неделя" onPress={() => setShowCreate(true)}></CreateButtonDisign>
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
});
