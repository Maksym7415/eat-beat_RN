import "react-native-gesture-handler";
import React, { useContext } from "react";
import { Col } from "../../components/Config";
import { AppContext } from "../../components/AppContext";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DrawerActions } from "@react-navigation/native";
import BurgerIcon from "../common/BurgerIcon";
import RestaurantMenu from '../../screens/Restaurants/RestaurantMenu';
import RecommendScreen from '../../components/RecommendedScreen';
import SearchRestaurantsScreen from "../../screens/Restaurants/SearchRestaurantsScreen";
import PreviewRecipeTopNavigator from "./PreviewTab";
import RestaurantMap from '../../screens/Restaurants/RestaurantMap';

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

const RestaurantsTopNavigator = () => (
  <TopTabs.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: Col.Header,
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: Col.Restaurants,
      },
      scrollEnabled: true,
      allowFontScaling: true,
    }}
    initialRouteName="recommended"
  >
    <TopTabs.Screen name="recommended">
      {(props) => <RecommendScreen {...props} page='restaurants' />}
    </TopTabs.Screen>
    <TopTabs.Screen name="search" >
      {(props) => <SearchRestaurantsScreen {...props} page={'restaurants'} />}
    </TopTabs.Screen>
    <TopTabs.Screen
      name="restaurant_map"
      component={RestaurantMap}
      options={{ title: "Map" }}
    />
  </TopTabs.Navigator>
);

export const RestaurantsStack = () => {
  return (
    <Stack.Navigator initialRouteName="restaurantsPage">
      <Stack.Screen
        options={({ navigation, ...other }) => {
          const { showModal } = useContext(AppContext);
          return {
            headerLeft: () => (
              <BurgerIcon
                name="menuWhite"
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              />
            ),
            headerRight: () => {
              if (other?.route?.state?.index === 1) {
                return (
                  <Icon
                    style={{ marginRight: 16 }}
                    onPress={() => showModal(true, 'restaurants')}
                    name={"search"}
                    color={Col.White}
                    size={24}
                  />
                );
              }
              return "";
            },
            title: "Restaurants",
            headerStyle: {
              elevation: 1,
              backgroundColor: Col.Restaurants,
            },
            headerTitleStyle: {
              color: "white",
            },
          };
        }}
        name="restaurantsPage"
        component={RestaurantsTopNavigator}
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
            backgroundColor: Col.Restaurants,
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
        name="previewRecommendedPage"
        component={PreviewRecipeTopNavigator}
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
          title: route.params?.title,
          headerStyle: {
            elevation: 1,
            backgroundColor: Col.Restaurants,
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
        name="restaurantMenu"
        component={RestaurantMenu}
      />
    </Stack.Navigator>
  );
};
