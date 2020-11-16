import "react-native-gesture-handler";
import React, { useContext } from "react";
import { Col } from "../components/Config";
import { AppContext } from "../components/AppContext";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import ProfileScreen from "../screens/Profile/ProfileScreen";
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
import DrawerLayout from "./common/DrawerLayout";
import Success from "../screens/Auth/SuccessScreen";
import Confirmation from "../screens/Auth/ConfirmationScreen";
import ChangePassword from "../screens/Auth/ChangePassword";
import ResetSuccess from "../screens/Auth/ResetSuccessScreen";
import PersonalDataScreen from "../screens/Profile/PersonalDataScreen";
import FoodPreferences from "../screens/Profile/FoodPreferences";
import DialyNorm from "../screens/Profile/DailyNorm";
import UserRecipes from "../screens/Recipies/UserRecipe";
import NewRecipe from "../screens/Recipies/CreateRecipesScreen";
import RecipeInfoScreen from "../screens/Recipies/RecipeInfoScreen";
import IngradientScreen from "../screens/Recipies/IngradientsScreen";
import InstructionScreen from "../screens/Recipies/InstructionScreen";

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
      <Stack.Screen name="confirm" component={Confirmation} />
      <Stack.Screen name="changePassword" component={ChangePassword} />
      <Stack.Screen name="resetSuccess" component={ResetSuccess} />
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

const EditRecipeTopNAvigator = () => (
  <TopTabs.Navigator
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
    <TopTabs.Screen name="info" component={RecipeInfoScreen} />
    <TopTabs.Screen name="ingredients" component={IngradientScreen} />
    <TopTabs.Screen name="instruction" component={InstructionScreen} />
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
        backgroundColor: Col.Recipes,
      },
      scrollEnabled: true,
    }}
    initialRouteName="recommended"
  >
    <TopTabs.Screen name="recommended" component={RecommendedScreen} />
    <TopTabs.Screen name="search" component={SearchScreen} />
    <TopTabs.Screen
      name="user_recipies"
      component={UserRecipes}
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
        backgroundColor: Col.Grey,
      },
      scrollEnabled: true,
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
    </Stack.Navigator>
  );
};

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
        options={({ navigation }) => {
          const { userRecipeTitle } = useContext(AppContext)
          return ({
            title: userRecipeTitle,
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
        })}}
        component={EditRecipeTopNAvigator}
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
