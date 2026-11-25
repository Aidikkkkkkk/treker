import { View } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { TrekerProvider } from "@/context/TrekerContext";
import { ThemeProvider, useStyles } from "@/context/ThemeContext";
import { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";

function ThemedStack() {
   const { COLORS } = useStyles();
   const insets = useSafeAreaInsets();

   useEffect(() => {
      SystemUI.setBackgroundColorAsync(COLORS.background);
   }, [COLORS.background]);

   return (
      <View
         style={{
            flex: 1,
            backgroundColor: COLORS.background,
            paddingBottom: insets.bottom,
         }}
      >
         <StatusBar style="light" />
         <Stack
            screenOptions={{
               headerShown: false,
               contentStyle: { backgroundColor: COLORS.background },
            }}
         />
      </View>
   );
}

export default function RootLayout() {
   return (
      <SafeAreaProvider>
         <ThemeProvider>
            <TrekerProvider>
               <ThemedStack />
            </TrekerProvider>
         </ThemeProvider>
      </SafeAreaProvider>
   );
}
