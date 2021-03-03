import "react-native-gesture-handler";
import React from "react";
import { Dimensions } from 'react-native';
import { Col } from "../../components/Config";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PreviewInfo from "../../screens/Preview/PreviewInfo";
import PreviewIngredients from "../../screens/Preview/PreviewIngredients";
import PreviewInstructions from "../../screens/Preview/PreviewInstructions";

const TopTabs = createMaterialTopTabNavigator();

const PreviewRecipeTopNavigator = (props) => {
  const page = props.route.params.details.page
  const phoneWidth = Dimensions.get('window').width;
return (
  <TopTabs.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: Col.Header,
        elevation: 0,
      },
      tabStyle: {
        width: page === "recipes" ? phoneWidth/3 : phoneWidth/2,
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
      options={{ title: "info" }}
    >
      {(tabsProps) => <PreviewInfo {...tabsProps} page={page}/>}
    </TopTabs.Screen>
    {props.route.params.details.page === "recipes" ? <TopTabs.Screen
      name="previewIngredients"
      component={PreviewIngredients}
      options={{ title: "ingredients" }}
    /> : null}
    <TopTabs.Screen
      name="previewInstruction"
      component={PreviewInstructions}
      options={{ title: page === "recipes" ? "instruction" : "description" }}
    />
  </TopTabs.Navigator>
)};
export default PreviewRecipeTopNavigator;
