import React from "react";
import { Col } from "../../components/Config";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../../screens/Profile/ProfileScreen";
import { DrawerActions } from "@react-navigation/native";
import BurgerIcon from "../common/BurgerIcon";
import PersonalDataScreen from "../../screens/Profile/PersonalDataScreen";
import FoodPreferences from "../../screens/Profile/FoodPreferences";
import DialyNorm from "../../screens/Profile/DailyNorm";

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

const ProfileTopNavigator = () => (
  <TopTabs.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: Col.Header,
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: Col.Grey,
      },
      scrollEnabled: true,
      allowFontScaling: true,
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
      component={PersonalDataScreen}
      options={{ title: "Personal data" }}
    />
    <TopTabs.Screen
      name="dailyNorm"
      component={DialyNorm}
      options={{ title: "Daily norm" }}
    />
    <TopTabs.Screen
      name="foodPreferences"
      component={FoodPreferences}
      options={{ title: "Food preferences" }}
    />
  </TopTabs.Navigator>
);

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
