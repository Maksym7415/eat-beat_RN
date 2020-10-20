import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DiaryScreen from "./Diary/DiaryScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import RecipiesScreen from "./Recipies/RecipiesScreen";
import TechScreen from "./Tech/TechScreen";
import Register from "./Auth/RegisterScreen";
import Login from "./Auth/LoginScreen";
import Restore from "./Auth/RestoreScreen";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const Auth = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Restore" component={Restore} />
    </Stack.Navigator>
  </NavigationContainer>
);

export const Main = () => (
  <NavigationContainer>
    <Tabs.Navigator initialRouteName="Diary">
      <Tabs.Screen name="Diary" component={DiaryScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
      <Tabs.Screen name="Recipies" component={RecipiesScreen} />
      <Tabs.Screen name="Tech" component={TechScreen} />
    </Tabs.Navigator>
  </NavigationContainer>
);
