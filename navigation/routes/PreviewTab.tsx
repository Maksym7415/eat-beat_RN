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
  const routeFrom = props.route.params.details.from;
  const item = props.route.params.item;
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
        backgroundColor: pageSettings[page].bg,
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
      {(tabsProps) => <PreviewInfo {...tabsProps} page={page} routeFrom={routeFrom} item={item}/>}
    </TopTabs.Screen>
    {page === "recipes" ? <TopTabs.Screen
      name="previewIngredients"
      component={PreviewIngredients}
      options={{ title: "ingredients" }}
    /> : null}
    <TopTabs.Screen
      name="previewInstruction"
      options={{ title: pageSettings[page].previewTabTitle }}
    >
      {(instructionProps) => <PreviewInstructions {...instructionProps} page={page}/>}
    </TopTabs.Screen>
  </TopTabs.Navigator>
)};
export default PreviewRecipeTopNavigator;
