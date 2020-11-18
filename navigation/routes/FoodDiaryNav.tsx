import "react-native-gesture-handler";
import React from "react";
import { Col } from "../../components/Config";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DrawerActions } from "@react-navigation/native";
import HomeScreen from "../../screens/Home/HomeScreen";
import MealsScreen from "../../screens/Home/MealsScreen";
import HistoryScreen from "../../screens/Home/HistoryScreen";
import CalendarButton from "../common/CalendarButton";
import BurgerIcon from "../common/BurgerIcon";
import PreviewRecipeTopNavigator from "./PreviewTab";

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

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
            elevation: 1,
            backgroundColor: Col.Background,
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
        })}
        name="homePage"
        component={HomeTopNavigator}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
              name={"arrow-back"}
              color={Col.White}
              size={24}
            />
          ),
          title: route.params?.title || "Preview",
          headerStyle: {
            elevation: 1,
            backgroundColor: Col.Recipes,
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
        name="previewPage"
        component={PreviewRecipeTopNavigator}
      />
    </Stack.Navigator>
  );
};
