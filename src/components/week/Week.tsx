import { View, Text } from "react-native";
import { router } from "expo-router";
import WeekModal from "./WeekModal";
import ListWeeks from "./ListWeeks";
import CustomCreateButton from "../global/CustomCreateButton";
import { useWeeks } from "@/hooks/useWeeks";
import { useEntityModal } from "@/hooks/global/useEntityModal";
import { IDtoWeekChange } from "@/types";
import { useStyles } from "@/context/ThemeContext";

export default function Week() {
   const { SCREEN_STYLES } = useStyles();
   const { weeks, createWeek, changeWeek, deleteWeek } = useWeeks();
   const modal = useEntityModal<IDtoWeekChange>();

   return (
      <View style={SCREEN_STYLES.content}>
         <Text style={SCREEN_STYLES.title}>Недели</Text>
         <ListWeeks items={weeks} onDelete={deleteWeek} onEdit={modal.openEdit} />
         <CustomCreateButton title="+ Новая неделя" onPress={modal.openCreate} />
         <CustomCreateButton title="Темы" onPress={() => router.push("./Theme")} />

         {modal.editing ? (
            <WeekModal
               mode="edit"
               visible={modal.visible}
               initialData={modal.editing}
               onClose={modal.close}
               onChange={changeWeek}
            />
         ) : (
            <WeekModal mode="create" visible={modal.visible} onClose={modal.close} onCreate={createWeek} />
         )}
      </View>
   );
}
