import { View, Text } from "react-native";
import WeekModal from "./WeekModal";
import { useWeeks } from "@/hooks/useWeeks";
import CustomCreateButton from "../global/CustomCreateButton";
import ListWeeks from "@/components/week/ListWeeks";
import { SCREEN_STYLES } from "@/styles";

export default function Week() {
   const { showCreate, setShowCreate, createWeek } = useWeeks();
   return (
      <View style={SCREEN_STYLES.content}>
         <Text style={SCREEN_STYLES.title}>Недели</Text>
         <ListWeeks />
         <CustomCreateButton title="Новая неделя" onPress={() => setShowCreate(true)} />
         <WeekModal visible={showCreate} onClose={() => setShowCreate(false)} onCreate={createWeek} />
      </View>
   );
}
