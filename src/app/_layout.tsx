import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TrekerProvider } from "@/context/TrekerContext";

export default function RootLayout() {
   return (
      <SafeAreaProvider>
         <TrekerProvider>
            <Stack screenOptions={{ headerShown: false }} />
         </TrekerProvider>
      </SafeAreaProvider>
   );
}
