import React, { useContext } from "react";
import { Text } from 'react-native';
import { Col } from "../../components/Config";
import { AppContext } from "../../components/AppContext";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DrawerActions } from "@react-navigation/native";
import BurgerIcon from "../common/BurgerIcon";
import SearchSnackScreen from '../../screens/Snacks/SearchSnackScreen';
import RecommendedScreen from '../../screens/Snacks/PopularSnacksScreen';
import SnacksScannerScreen from '../../screens/Snacks/SnacksScannerScreen';

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

const SnackTopNavigator = () => (
  <TopTabs.Navigator
      lazy={true}
      tabBarOptions={{
      style: {
        backgroundColor: Col.Header,
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: Col.Snacks,
      },
      scrollEnabled: true,
      allowFontScaling: true,
    }}
    initialRouteName="SnacksPopular"
  >
    <TopTabs.Screen
      name="SnacksPopular"
      options={() => ({
        title: 'Popular'
      })}
    >
      {(props) => <RecommendedScreen {...props} page='snacks'/>}
    </TopTabs.Screen>
    <TopTabs.Screen
      name="SnacksSearch"
      options={() => ({
        title: 'Search'
      })}
    >
        {(props) => <SearchSnackScreen {...props}  page='snacks'/>}
    </TopTabs.Screen>
    <TopTabs.Screen
      name="SnacksScanner"
      options={() => ({
        title: 'Scanner'
      })}
    >
        {(props) => <SnacksScannerScreen {...props} page='snacksScanner'/>}
    </TopTabs.Screen>
  </TopTabs.Navigator>
);

export const SnacksStack =  (props) => {
  return (
    <Stack.Navigator initialRouteName="snacksPage">
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
                    onPress={() => showModal(true, 'snacks')}
                    name={"search"}
                    color={Col.White}
                    size={24}
                  />
                );
              }
              return "";
            },
            title: "Snacks",
            headerStyle: {
              elevation: 1,
              backgroundColor: Col.Snacks,
            },
            headerTitleStyle: {
              color: "white",
            },
          };
        }}
        name="snacksPage"
        component={SnackTopNavigator}
      />
    </Stack.Navigator>
  );
};
