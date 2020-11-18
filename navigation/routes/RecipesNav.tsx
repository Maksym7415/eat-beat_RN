import "react-native-gesture-handler";
import React, { useContext } from "react";
import { Col } from "../../components/Config";
import { AppContext } from "../../components/AppContext";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DrawerActions } from "@react-navigation/native";
import BurgerIcon from "../common/BurgerIcon";
import RecommendedScreen from "../../screens/Recipies/RecommendedScreen";
import SearchScreen from "../../screens/Recipies/SearchScreen";
import UserRecipes from "../../screens/Recipies/UserRecipe";
import NewRecipe from "../../screens/Recipies/CreateRecipesScreen";
import RecipeInfoScreen from "../../screens/Recipies/RecipeInfoScreen";
import IngradientScreen from "../../screens/Recipies/IngradientsScreen";
import InstructionScreen from "../../screens/Recipies/InstructionScreen";
import PreviewRecipeTopNavigator from "./PreviewTab";

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
        backgroundColor: Col.Recipes,
      },
    }}
    initialRouteName="info"
  >
    <EditTopTabs.Screen name="info" component={RecipeInfoScreen} />
    <EditTopTabs.Screen name="ingredients" component={IngradientScreen} />
    <EditTopTabs.Screen name="instruction" component={InstructionScreen} />
  </EditTopTabs.Navigator>
);

const RecipesTopNavigator = () => (
  <TopTabs.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: Col.Header,
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: Col.Recipes,
      },
      scrollEnabled: true,
      allowFontScaling: true,
    }}
    initialRouteName="recommended"
  >
    <TopTabs.Screen name="recommended" component={RecommendedScreen} />
    <TopTabs.Screen name="search" component={SearchScreen} />
    <TopTabs.Screen
      name="user_recipies"
      component={UserRecipes}
      options={{ title: "my recipes" }}
    />
  </TopTabs.Navigator>
);

export const RecommendedStack = () => {
  const { toggleEdit, editMode } = useContext(AppContext);
  return (
    <Stack.Navigator initialRouteName="recommendedPage">
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
                    onPress={() => showModal(true)}
                    name={"search"}
                    color={Col.White}
                    size={24}
                  />
                );
              }
              return "";
            },
            title: "Recipes",
            headerStyle: {
              elevation: 1,
              backgroundColor: Col.Recipes,
            },
            headerTitleStyle: {
              color: "white",
            },
          };
        }}
        name="recommendedPage"
        component={RecipesTopNavigator}
      />
      <Stack.Screen
        name="new"
        options={({ navigation }) => ({
          title: "Recipe creation",
          //headerShown: false,
          headerStyle: {
            elevation: 0,
            backgroundColor: Col.Recipes,
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
        component={NewRecipe}
      />
      <Stack.Screen
        name="user_recipe"
        options={({ navigation, route }) => {
          return {
            title: route.params.title,
            headerStyle: {
              elevation: 0,
              backgroundColor: Col.Recipes,
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
            backgroundColor: Col.Recipes,
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
