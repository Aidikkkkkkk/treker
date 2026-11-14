import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListWeeks from "@/components/week/ListWeeks";
import CreateButton from "@/components/week/CreateButton";
import { COLORS } from "@/styles";

export default function Main() {
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.content}>
            <Text style={styles.mainTitle}>Тренировки</Text>

            <ListWeeks />
            <CreateButton />
         </View>
      </SafeAreaView>
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
