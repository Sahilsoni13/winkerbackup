// import React from "react";
// import { LogBox } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import AppNavigator from "./src/navigator/AppNavigator";
// import SafeAreaWrapper from "@/component/SafeAreaWrapper";
// import { ThemeProvider } from "@/ThemeContext";
// import Toast from "react-native-toast-message";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// // ✅ Create React Query Client
// const queryClient = new QueryClient();

// const App: React.FC = () => {
//   LogBox.ignoreAllLogs(); // optional

//   return (
//     <QueryClientProvider client={queryClient}>
//       <SafeAreaProvider>
//         <ThemeProvider>
//           <SafeAreaWrapper>
//             <NavigationContainer>
//               <GestureHandlerRootView>
//                 <AppNavigator />
//               </GestureHandlerRootView>
//             </NavigationContainer>
//           </SafeAreaWrapper>
//         </ThemeProvider>
//         {/* ✅ Toast should be rendered like this */}
//         <Toast />
//       </SafeAreaProvider>
//     </QueryClientProvider>
//   );
// };


// export default App;


import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigator/AppNavigator";
import SafeAreaWrapper from "@/component/SafeAreaWrapper";
import { ThemeProvider } from "@/ThemeContext";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 🔁 Redux
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./src/redux/store";

// ✅ Create React Query Client
const queryClient = new QueryClient();

const App: React.FC = () => {
  LogBox.ignoreAllLogs(); // optional

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
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
          <Toast />
        </SafeAreaProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default App;
