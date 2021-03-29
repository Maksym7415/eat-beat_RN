import "react-native-gesture-handler";
import React from "react";
import { Col } from "../../components/Config";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DrawerActions } from "@react-navigation/native";
import BurgerIcon from '../common/BurgerIcon';
import MyFridgeScreen from '../../screens/Stock/MyFridgeScreen';
import ShoppingListScreen from '../../screens/Stock/ShoppingListScreen';
import ScannerScreen from '../../screens/Stock/ScannerScreen';
import FoodOrderingScreen from '../../screens/Stock/FoodOrderingScreen'
import { MaterialIcons as Icon } from '@expo/vector-icons';

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

const StockTopNavigator = () => (
  <TopTabs.Navigator
    tabBarOptions={{
      style: {
          backgroundColor: Col.Header,
          elevation: 0,
      },
      indicatorStyle: {
          backgroundColor: Col.DarkBlue,
      },
      scrollEnabled: true,
      allowFontScaling: true,
    }}
    initialRouteName="myFridge"
  >
    <Stack.Screen
      name={'myFridge'}
      options={() => ({
        title: 'My Fridge'
      })}
      component={MyFridgeScreen}
    />
    <Stack.Screen
      name={'shoppingList'}
      options={() => ({
        title: 'Shopping List'
      })}
      component={ShoppingListScreen}
    />
    <Stack.Screen
      name={'scanner'}
      options={() => ({
        title: 'Scanner'
      })}
      component={ScannerScreen}
    />
  </TopTabs.Navigator>
)

export const StockStack = () => {
  return (
    <Stack.Navigator initialRouteName={'stock'}>
      <Stack.Screen
        options={({ navigation, ...other }) => {
          return {
            headerLeft: () => (
              <BurgerIcon name="menuWhite" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
            ),
            title: "My Food Stocks",
            headerStyle: {
              elevation: 1,
              backgroundColor: Col.Stocks,
            },
            headerTitleStyle: {
              color: "white",
            },
          };
        }}
        name={'stock'} component={StockTopNavigator}
      />
      <Stack.Screen
        options={({ navigation, ...other }) => {
          return {
            headerLeft: () => (
              <Icon
                style={{ marginLeft: 16 }}
                onPress={() => navigation.goBack()}
                name={"arrow-back"}
                color={Col.White}
                size={24}
              />
            ),
            title: "Food Ordering",
            headerStyle: {
              elevation: 1,
              backgroundColor: Col.Stocks,
            },
            headerTitleStyle: {
              color: "white",
            },
          };
        }}
        name={'foodOrdering'} component={FoodOrderingScreen}
      />
    </Stack.Navigator>
  )
}
