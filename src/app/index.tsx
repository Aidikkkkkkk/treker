import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ListWorkouts from "@/components/main/ListWorkouts";
import CreateButton from "@/components/main/CreateButton";
import { COLORS } from "@/styles";

export default function Main() {
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.content}>
            <Text style={styles.mainTitle}>Тренировки</Text>
            <ListWorkouts />
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
