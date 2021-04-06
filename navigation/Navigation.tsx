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
import { StockStack } from "./routes/StockNav";
import { ProfileStack } from "./routes/ProfileNav";
import { RestaurantsStack } from "./routes/RestaurantsNav";
import { AboutStack } from './routes/AboutNav';
import { SnacksStack } from './routes/SnacksNav';
import PreviewScreen from '../screens/Preview/PreviewInfo';
import { Col } from "../components/Config";
import { MaterialIcons as Icon } from "@expo/vector-icons";


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

export const Main = () => {
  return  (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="drawerMain"
        headerMode="none"
        screenOptions={{
          animationEnabled: false,
        }}
      >
        <Stack.Screen
          options={({ navigation, route, }) => {
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
              title: route.params.item.meal.name,
              headerStyle: {
                elevation: 1,
                backgroundColor: Col.Snacks,
              },
              headerTitleStyle: {
                color: "white",
              },
            };
          }}
          name="previewSnack"
        >
          {(previewProps) => <PreviewScreen page={'snacks'} {...previewProps} item={previewProps.route.params.item} title={previewProps.route.params.item.meal.name}/>}
      </Stack.Screen>
  
        <Stack.Screen name="drawerMain" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 




// Drawer Navigator
export const DrawerNavigator = () => {
  return (
    // <NavigationContainer>
      <Drawer.Navigator
        lazy={false}
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
          options={{ title: "Restaurants" }}
          name="restaurants"
          component={RestaurantsStack}
        />
        <Drawer.Screen
          options={{ title: "Snacks" }}
          name="snacks"
          component={SnacksStack}
        />
        <Drawer.Screen
          options={{ title: "Stock" }}
          name="stockDrawer"
          component={StockStack}
        />
        <Drawer.Screen
          options={{ title: "About" }}
          name="about"
          component={AboutStack}
        />
      </Drawer.Navigator>
    // </NavigationContainer>
  );
};
