import "react-native-gesture-handler";
import React from "react";
import { View, Image, Button, TouchableOpacity, Text } from "react-native";
import { Col, Typ, Weight } from "../components/Config";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import DiaryScreen from "./Diary/DiaryScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import RecipiesScreen from "./Recipies/RecipiesScreen";
import TechScreen from "./Tech/TechScreen";
import Register from "./Auth/RegisterScreen";
import Login from "./Auth/LoginScreen";
import Restore from "./Auth/RestoreScreen";
import HomeScreen from "./Home/HomeScreen";

import { getDate } from "../utils/date";
import MealsScreen from "./Home/MealsScreen";
import HistoryScreen from "./Home/HistoryScreen";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export const Auth = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Restore" component={Restore} />
    </Stack.Navigator>
  </NavigationContainer>
);

const TopNavigator = () => (
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
    initialRouteName="Home"
  >
    <TopTabs.Screen name="Home" component={HomeScreen} />
    <TopTabs.Screen name="Meals" component={MealsScreen} />
    <TopTabs.Screen name="History" component={HistoryScreen} />
    {/* <TopTabs.Screen name="Tech" component={TechScreen} /> */}
  </TopTabs.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen
      options={{ title: "Home" }}
      name=" "
      component={TopNavigator}
    />
  </Drawer.Navigator>
);

export const Main = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 5, paddingVertical: 5 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Image source={require("../assets/drawer_icon.png")} />
            </TouchableOpacity>
          ),
          headerRight: () => {
            const date = getDate(new Date());
            return (
              <TouchableOpacity
                style={{ paddingHorizontal: 5, paddingVertical: 5 }}
                onPress={() => console.log(123)}
              >
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 26,
                    backgroundColor: Col.Green1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: Col.White, fontSize: Typ.tiny }}>
                    {date.month}
                  </Text>
                  <Text
                    style={{
                      color: Col.White,
                      fontSize: Typ.Normal,
                      fontWeight: Weight.Normal1,
                    }}
                  >
                    {date.day}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          },
          headerLeftContainerStyle: { paddingLeft: 14 },
        })}
        name="Food Diary"
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
