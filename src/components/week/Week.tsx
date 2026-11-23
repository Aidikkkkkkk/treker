import { View, Text } from "react-native";
import WeekModal from "./WeekModal";
import { useWeeks } from "@/hooks/useWeeks";
import CustomCreateButton from "../global/CustomCreateButton";
import ListWeeks from "@/components/week/ListWeeks";
import { router } from "expo-router";
import { useStyles } from "@/context/ThemeContext";

export default function Week() {
   const { weeks, showCreate, setShowCreate, createWeek, deleteWeek } = useWeeks();
   const { SCREEN_STYLES } = useStyles();
   return (
      <View style={SCREEN_STYLES.content}>
         <Text style={SCREEN_STYLES.title}>Недели</Text>
         <ListWeeks weeks={weeks} deleteWeek={deleteWeek} />
         <CustomCreateButton title="Новая неделя" onPress={() => setShowCreate(true)} />
         <CustomCreateButton title="Темы" onPress={() => router.push("./maket")} />
         <WeekModal visible={showCreate} onClose={() => setShowCreate(false)} onCreate={createWeek} />
      </View>
   );
}
