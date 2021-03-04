import "react-native-gesture-handler";
import React, { useContext } from "react";
import { Col } from "../../components/Config";
import { AppContext } from "../../components/AppContext";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DrawerActions } from "@react-navigation/native";
import BurgerIcon from "../common/BurgerIcon";
import RecommendFromRestaurantsScreen from "../../screens/Restaurants/RecommendFromRestaurants";
import RecommendScreen from '../../components/custom/RecommendedScreen';
import SearchScreen from "../../screens/Recipies/SearchScreen";
import UserRecipes from "../../screens/Recipies/UserRecipe";
import NewRecipe from "../../screens/Recipies/CreateRecipesScreen";
import PreviewRecipeTopNavigator from "./PreviewTab";
import { View, Text } from 'react-native'

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const EditTopTabs = createMaterialTopTabNavigator();

const EditRecipeTopNAvigator = () => (
  <EditTopTabs.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: Col.Header,
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: Col.Restaurants,
      },
    }}
    initialRouteName="info"
  >
    <EditTopTabs.Screen name="recommend" component={() => <Text>recommend</Text>} />
    <EditTopTabs.Screen name="ingredients" component={() => <Text>page 2</Text>} />
    <EditTopTabs.Screen name="instruction" component={() => <Text>page 3</Text>} />
  </EditTopTabs.Navigator>
);

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
        {(props) => <RecommendScreen {...props} page='restaurants'/>}
    </TopTabs.Screen>
    <TopTabs.Screen name="search" >
      {(props) => <SearchScreen {...props} page={'restaurants'}/>}
    </TopTabs.Screen>
    <TopTabs.Screen
      name="user_recipies"
      component={() => <Text>page 5</Text>}
      options={{ title: "my recipes" }}
    />
  </TopTabs.Navigator>
);

export const RestaurantsStack = () => {
  const { toggleEdit, editMode } = useContext(AppContext);
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
        name="new"
        options={({ navigation }) => ({
          title: "Recipe creation",
          //headerShown: false,
          headerStyle: {
            elevation: 0,
            backgroundColor: Col.Restaurants,
          },
          headerTitleStyle: {
            color: "white",
          },
          headerLeft: () => (
            <Icon
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate("user_recipies")}
              name={"arrow-back"}
              color={Col.White}
              size={24}
            />
          ),
        })}
        component={() => <Text>page 6</Text>}
      />
      <Stack.Screen
        name="user_recipe"
        options={({ navigation, route }) => {
          return {
            title: route.params.title,
            headerStyle: {
              elevation: 0,
              backgroundColor: Col.Restaurants,
            },
            headerTitleStyle: {
              color: "white",
            },
            headerLeft: () => (
              <Icon
                style={{ marginLeft: 16 }}
                onPress={() => navigation.navigate("user_recipies")}
                name={"arrow-back"}
                color={Col.White}
                size={24}
              />
            ),
            headerRight: () => (
              <Icon
                style={{ marginRight: 16 }}
                onPress={() => toggleEdit(!editMode)}
                name={!editMode ? "edit" : "close"}
                color={Col.White}
                size={24}
              />
            ),
          };
        }}
        component={EditRecipeTopNAvigator}
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
    </Stack.Navigator>
  );
};
