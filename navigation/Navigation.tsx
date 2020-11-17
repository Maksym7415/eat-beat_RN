import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Register from "../screens/Auth/RegisterScreen";
import Login from "../screens/Auth/LoginScreen";
import Restore from "../screens/Auth/RestoreScreen";
import DrawerLayout from "./common/DrawerLayout";
import Success from "../screens/Auth/SuccessScreen";
import Confirmation from "../screens/Auth/ConfirmationScreen";
import ChangePassword from "../screens/Auth/ChangePassword";
import ResetSuccess from "../screens/Auth/ResetSuccessScreen";
import { MainStack } from "./routes/FoodDiaryNav";
import { RecommendedStack } from "./routes/RecipesNav";
import { ProfileStack } from "./routes/ProfileNav";

const Stack = createStackNavigator();
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
