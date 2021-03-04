import "react-native-gesture-handler";
import React from "react";
import { Col } from "../../components/Config";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PreviewInfo from "../../screens/Preview/PreviewInfo";
import PreviewIngredients from "../../screens/Preview/PreviewIngredients";
import PreviewInstructions from "../../screens/Preview/PreviewInstructions";
import { pageSettings } from '../../screens/config';

const TopTabs = createMaterialTopTabNavigator();

const PreviewRecipeTopNavigator = (props) => {
  const page = props.route.params.details.page;
return (
  <TopTabs.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: Col.Header,
        elevation: 0,
      },
      tabStyle: {
        width: pageSettings[page].width,
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
    {page === "recipes" ? <TopTabs.Screen
      name="previewIngredients"
      component={PreviewIngredients}
      options={{ title: "ingredients" }}
    /> : null}
    <TopTabs.Screen
      name="previewInstruction"
      component={PreviewInstructions}
      options={{ title: pageSettings[page].previewTabTitle }}
    />
  </TopTabs.Navigator>
)};
export default PreviewRecipeTopNavigator;
