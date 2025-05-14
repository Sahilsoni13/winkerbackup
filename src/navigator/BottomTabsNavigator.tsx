import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "../screens/Explore";
import Chats from "../screens/Chats";
import Winks from "../screens/Winks";
import Games from "../screens/Games";
import Settings from "../screens/Settings";
import NewBottomTabs from "./BottomTabs";
import UserDetails from "../screens/UserDetails"; // Assuming this is the UserDetails screen

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <NewBottomTabs {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{ tabBarLabel: "Explore" }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{ tabBarLabel: "Chats" }}
      />
      <Tab.Screen
        name="Winks"
        component={Winks}
        options={{ tabBarLabel: "Winks" }}
      />
      <Tab.Screen
        name="Games"
        component={Games}
        options={{ tabBarLabel: "Games" }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: "Settings" }}
      />
      {/* Add UserDetails as a screen but hide the tab bar */}
      <Tab.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          tabBarStyle: { display: "none" }, // Hide tab bar for UserDetails
          tabBarLabel: "UserDetails", // Optional, won't be visible
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;