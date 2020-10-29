import "react-native-gesture-handler";
import React from "react";
import { Col } from "../components/Config";
import { createStackNavigator } from "@react-navigation/stack";
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
import TestOut from "../screens/TestOut";
import DrawerLayout from "./common/DrawerLayout";
import Success from "../screens/Auth/SuccessScreen";

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export const Auth = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="login"
      headerMode="none"
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="restore" component={Restore} />
      <Stack.Screen name="success" component={Success} />
    </Stack.Navigator>
  </NavigationContainer>
);

// Top Tab Navigators
const HomeTopNavigator = () => (
  <TopTabs.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: Col.Header,
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: Col.Main,
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
        backgroundColor: Col.Header,
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: Col.Main,
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

const ProfileTopNavigator = () => (
  <TopTabs.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: Col.Header,
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: Col.Main,
      },
    }}
    initialRouteName="subscription"
  >
    <TopTabs.Screen
      name="subscription"
      component={ProfileScreen}
      options={{ title: "subscription" }}
    />
    <TopTabs.Screen
      name="personalData"
      component={SearchScreen}
      options={{ title: "Personal data" }}
    />
    <TopTabs.Screen
      name="foodPreferences"
      component={RecipiesScreen}
      options={{ title: "Food preferences" }}
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
            backgroundColor: Col.Main,
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

export const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="recommendedPage">
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <BurgerIcon
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          title: "My Profile",
          headerStyle: {
            elevation: 0,
            backgroundColor: Col.White,
          },
          headerTitleStyle: {
            color: Col.Dark,
          },
        })}
        name="recommendedPage"
        component={ProfileTopNavigator}
      />
    </Stack.Navigator>
  );
};

// Drawer Navigator
export const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="homeDrawer"
        drawerContent={(props) => DrawerLayout(props)}
      >
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
        <Drawer.Screen
          options={{ title: "Profile" }}
          name="profileDrawer"
          component={ProfileStack}
        />
        <Drawer.Screen
          options={{ title: "sign Out" }}
          name="signOut"
          component={TestOut}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
