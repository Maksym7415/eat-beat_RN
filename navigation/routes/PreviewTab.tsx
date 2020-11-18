import "react-native-gesture-handler";
import React from "react";
import { Col } from "../../components/Config";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PreviewInfo from "../../screens/Preview/PreviewInfo";
import PreviewIngredients from "../../screens/Preview/PreviewIngredients";
import PreviewInstructions from "../../screens/Preview/PreviewInstructions";

const TopTabs = createMaterialTopTabNavigator();

const PreviewRecipeTopNavigator = () => (
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
    initialRouteName="previewInfo"
  >
    <TopTabs.Screen
      name="previewInfo"
      component={PreviewInfo}
      options={{ title: "info" }}
    />
    <TopTabs.Screen
      name="previewIngredients"
      component={PreviewIngredients}
      options={{ title: "ingredients" }}
    />
    <TopTabs.Screen
      name="previewInstruction"
      component={PreviewInstructions}
      options={{ title: "instruction" }}
    />
  </TopTabs.Navigator>
);
export default PreviewRecipeTopNavigator;
