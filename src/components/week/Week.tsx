import { View, Text, StyleSheet } from "react-native";
import WeekModal from "./WeekModal";
import { useWeeks } from "@/hooks/useWeeks";
import CustomCreateButton from "../global/CustomCreateButton";
import ListWeeks from "@/components/week/ListWeeks";
import { COLORS } from "@/styles";

export default function Week() {
   const { showCreate, setShowCreate, createWeek } = useWeeks();
   return (
      <View style={styles.content}>
         <Text style={styles.mainTitle}>Недели</Text>
         <ListWeeks />
         <CustomCreateButton title="Новая неделя" onPress={() => setShowCreate(true)}></CustomCreateButton>
         <WeekModal visible={showCreate} onClose={() => setShowCreate(false)} onCreate={createWeek} />
      </View>
   );
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.background,
   },
   content: {
      flex: 1,
      paddingHorizontal: 28,
      paddingTop: 22,
   },
   mainTitle: {
      color: COLORS.textPrimary,
      fontSize: 34,
      fontWeight: "800",
   },
});
