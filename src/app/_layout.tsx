import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TrekerProvider } from "@/TrekerContext";
import { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
   useEffect(() => {
      SystemUI.setBackgroundColorAsync("#14171C");
   }, []);

   return (
      <SafeAreaProvider>
         <TrekerProvider>
            <StatusBar style="light" />
            <Stack
               screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "#14171C" },
               }}
            />
         </TrekerProvider>
      </SafeAreaProvider>
   );
}
