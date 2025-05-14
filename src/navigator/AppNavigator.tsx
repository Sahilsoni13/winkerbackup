import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsNavigator from './BottomTabsNavigator';
import Notification from '@/screens/Notification';
import PremiumPlans from '@/screens/PremiumPlans';
import PrivacySecurity from '@/screens/PrivacySecurity';
import GeneralSetting from '@/screens/GeneralSetting';
import UserDetails from '@/screens/UserDetails';
import RockPaperScissorsScreen from '@/screens/RockPaperScissorsScreen';
import CreateAccount from '@/screens/CreateAccount';
import LoginScreen from '@/screens/LoginScreen';
import OtpVerificationScreen from '@/screens/OtpVerificationScreen';
import ChatScreenchat from '@/screens/ChatBubble';
import AccountSetupScreen from '@/screens/AccountSetupScreen';
import OnboardingScreen from '@/screens/OnboardingScreen';
import ForgotPassword from '@/screens/ForgotPassword';
import SplashScreen from '@/screens/SplashScreen';
import ChatScreen from '@/screens/ChatScreen';
import { getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import color from '@/styles/global';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {

  const { isDarkMode } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: isDarkMode ? color.charcol90 : color.white },
      }}
      initialRouteName="AccountSetupScreen"
    >
      <Stack.Screen
        name="MainTab"
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="PremiumPlans"
        component={PremiumPlans}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="GeneralSetting"
        component={GeneralSetting}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="PrivacySecurity"
        component={PrivacySecurity}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false, animation: 'fade', animationDuration: 200 }}
      />
      <Stack.Screen
        name="AccountSetupScreen"
        component={AccountSetupScreen}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="OtpVerificationScreen"
        component={OtpVerificationScreen}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="ChatBubble"
        component={ChatScreenchat}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="RockPaperScissorsScreen"
        component={RockPaperScissorsScreen}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
