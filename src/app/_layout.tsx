import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TrekerProvider } from "@/TrekerContext";

export default function RootLayout() {
   return (
      <SafeAreaProvider>
         <TrekerProvider>
            <Stack screenOptions={{ headerShown: false }}>
               <Stack.Screen name="index" options={{ title: "Главный экран" }} />
               <Stack.Screen name="second" options={{ title: "Второе окно" }} />
            </Stack>
         </TrekerProvider>
      </SafeAreaProvider>
   );
}
