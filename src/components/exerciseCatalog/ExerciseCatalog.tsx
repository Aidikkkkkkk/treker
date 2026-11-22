import { View, Text } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import { useExerciseCatalog } from "@/hooks/useExerciseCatalog";
import ListExerciseCatalog from "./ListExerciseCatalog";
import ExerciseCatalogModal from "./ExerciseCatalogModal";
import CustomBackButton from "../global/CustomBackButton";
import { SCREEN_STYLES } from "@/styles";

export default function ExerciseCatalog() {
   const { showCreate, setShowCreate, createExerciseCatalog, exerciseCatalog, deleteFromExerciseCatalog } =
      useExerciseCatalog();
   return (
      <View style={SCREEN_STYLES.content}>
         <View style={SCREEN_STYLES.header}>
            <CustomBackButton />
            <Text style={SCREEN_STYLES.title}>Каталог упражнений</Text>
         </View>
         <ListExerciseCatalog exerciseCatalog={exerciseCatalog} deleteFromExerciseCatalog={deleteFromExerciseCatalog} />
         <CustomCreateButton title="Добавить" onPress={() => setShowCreate(true)} />
         <ExerciseCatalogModal
            visible={showCreate}
            onClose={() => setShowCreate(false)}
            onCreate={createExerciseCatalog}
         />
      </View>
   );
}
