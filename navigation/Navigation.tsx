import "react-native-gesture-handler";
import React from "react";
import { Col } from "../components/Config";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import DiaryScreen from "../screens/Diary/DiaryScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import RecipiesScreen from "../screens/Recipies/RecipiesScreen";
import TechScreen from "../screens/Tech/TechScreen";
import Register from "../screens/Auth/RegisterScreen";
import Login from "../screens/Auth/LoginScreen";
import Restore from "../screens/Auth/RestoreScreen";
import HomeScreen from "../screens/Home/HomeScreen";

import MealsScreen from "../screens/Home/MealsScreen";
import HistoryScreen from "../screens/Home/HistoryScreen";
import CalendarButton from "./common/CalendarButton";
import BurgerIcon from "./common/BurgerIcon";
import RecommendedScreen from "../screens/Recipies/RecommendedScreen";
import SearchScreen from "../screens/Recipies/SearchScreen";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export const Auth = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="restore" component={Restore} />
    </Stack.Navigator>
  </NavigationContainer>
);

// Top Tab Navigators
const HomeTopNavigator = () => (
  <TopTabs.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: "#EFF0F4",
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: Col.Green,
      },
    }}
    initialRouteName="home"
  >
    <TopTabs.Screen name="home" component={HomeScreen} />
    <TopTabs.Screen name="meals" component={MealsScreen} />
    <TopTabs.Screen name="history" component={HistoryScreen} />
  </TopTabs.Navigator>
);

const RecipesTopNavigator = () => (
  <TopTabs.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: "#EFF0F4",
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: Col.Green,
      },
    }}
    initialRouteName="recommended"
  >
    <TopTabs.Screen name="recommended" component={RecommendedScreen} />
    <TopTabs.Screen name="search" component={SearchScreen} />
    <TopTabs.Screen
      name="recipies"
      component={RecipiesScreen}
      options={{ title: "my recipies" }}
    />
  </TopTabs.Navigator>
);

// Stack Navigators
export const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="homePage">
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <BurgerIcon
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerRight: () => <CalendarButton />,
          title: "Food Diary",
          headerStyle: {
            elevation: 0,
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
        })}
        name="homePage"
        component={HomeTopNavigator}
      />
    </Stack.Navigator>
  );
};

export const RecommendedStack = () => {
  return (
    <Stack.Navigator initialRouteName="recommendedPage">
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <BurgerIcon
              name="menuWhite"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          title: "Eating at a Resturant",
          headerStyle: {
            elevation: 0,
            backgroundColor: Col.Green,
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
        name="recommendedPage"
        component={RecipesTopNavigator}
      />
    </Stack.Navigator>
  );
};

// Drawer Navigator
export const DrawerNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="HomeDrawer">
      <Drawer.Screen
        options={{ title: "Home" }}
        name="homeDrawer"
        component={MainStack}
      />
      <Drawer.Screen
        options={{ title: "Recommended" }}
        name="recommendedDrawer"
        component={RecommendedStack}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);