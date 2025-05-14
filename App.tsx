import React from "react";
import { LogBox, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context"; // 🔥 Added SafeAreaProvider
import AppNavigator from "./src/navigator/AppNavigator";
import SafeAreaWrapper from "@/component/SafeAreaWrapper";
import { ThemeProvider } from "@/ThemeContext";

const App: React.FC = () => {
  // Ignore specific log notifications by message
  LogBox.ignoreLogs(["Warning: ..."]);

  // Ignore all log notifications
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeAreaWrapper>
          <NavigationContainer>
            <GestureHandlerRootView>
              <AppNavigator />
            </GestureHandlerRootView>
          </NavigationContainer>
        </SafeAreaWrapper>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
