import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Week from "@/components/week/Week";
import { COLORS } from "@/styles";

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
