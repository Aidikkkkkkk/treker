import { View, Text } from "react-native";
import CustomCreateButton from "../global/CustomCreateButton";
import CustomBackButton from "../global/CustomBackButton";
import ListExerciseCatalog from "./ListExerciseCatalog";
import ExerciseCatalogModal from "./ExerciseCatalogModal";
import { useExerciseCatalog } from "@/hooks/useExerciseCatalog";
import { useEntityModal } from "@/hooks/global/useEntityModal";
import { IDtoExerciseCatalogChange } from "@/types";
import { useStyles } from "@/context/ThemeContext";

export default function ExerciseCatalog() {
   const { SCREEN_STYLES } = useStyles();
   const { exerciseCatalog, createExerciseCatalog, changeExerciseCatalog, deleteFromExerciseCatalog } =
      useExerciseCatalog();
   const modal = useEntityModal<IDtoExerciseCatalogChange>();

   return (
      <View style={SCREEN_STYLES.content}>
         <View style={SCREEN_STYLES.header}>
            <CustomBackButton />
            <Text style={SCREEN_STYLES.title}>Каталог упражнений</Text>
         </View>
         <ListExerciseCatalog items={exerciseCatalog} onDelete={deleteFromExerciseCatalog} onEdit={modal.openEdit} />
         <CustomCreateButton title="Добавить" onPress={modal.openCreate} />

         {modal.editing ? (
            <ExerciseCatalogModal
               mode="edit"
               visible={modal.visible}
               initialData={modal.editing}
               onClose={modal.close}
               onChange={changeExerciseCatalog}
            />
         ) : (
            <ExerciseCatalogModal
               mode="create"
               visible={modal.visible}
               onClose={modal.close}
               onCreate={createExerciseCatalog}
            />
         )}
      </View>
   );
}
