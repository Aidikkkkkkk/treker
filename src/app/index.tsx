import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/styles";
import Week from "@/components/week/Week";

export default function Main() {
   return (
      <SafeAreaView style={styles.container}>
         <Week />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.background,
   },
});
