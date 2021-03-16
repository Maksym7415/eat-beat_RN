import "react-native-gesture-handler";
import React, { useContext } from "react";
import { Col } from "../../components/Config";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import BurgerIcon from "../common/BurgerIcon";
import AboutPage from '../../screens/About';

const Stack = createStackNavigator();

export const AboutStack = () => {
  return (
    <Stack.Navigator initialRouteName="aboutPage">
      <Stack.Screen
        options={({ navigation, ...other }) => {
          return {
            headerLeft: () => (
                <Icon
                    style={{ marginLeft: 16 }}
                    onPress={() => navigation.goBack()}
                    name={"arrow-back"}
                    color={Col.Black}
                    size={24}
              />
            ),
            title: "About",
            headerStyle: {
              elevation: 1,
              backgroundColor: Col.White,
            },
            headerTitleStyle: {
              color: Col.Black,
            },
          };
        }}
        name="AboutPage"
        component={AboutPage}
      />
    </Stack.Navigator>
  );
};
