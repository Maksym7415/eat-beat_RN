import React from "react";
import UserCard from "./UserCard";
import { StyleSheet, View } from "react-native";
import SvgMaker from "../../components/SvgMaker";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Col } from "../../components/Config";

const Divider = () => (
  <View style={styles.cont}>
    <View style={styles.divider} />
  </View>
);

const DrawerLayout = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;
  console.log(navigation.isFocused());
  return (
    <DrawerContentScrollView {...props}>
      <UserCard />
      <DrawerItem
        icon={({ color, size }) => <SvgMaker name="profile" />}
        label="Profile"
        onPress={() => navigate("profileDrawer")}
      />
      <Divider />
      <DrawerItem
        icon={({ color, size }) => <SvgMaker name="foodDiary" />}
        label="Food Diary"
        onPress={() => navigate("homeDrawer")}
      />
      <DrawerItem
        icon={({ color, size }) => <SvgMaker name="recipes" />}
        label="Recipes"
        onPress={() => navigate("recommendedDrawer")}
      />
      <DrawerItem
        icon={({ color, size }) => <SvgMaker name="restaurants" />}
        label="Restaurants"
        onPress={() => console.log("hi")}
      />
      <DrawerItem
        icon={({ color, size }) => <SvgMaker name="snacks" />}
        label="Snacks"
        onPress={() => console.log("hi")}
      />
      <DrawerItem
        icon={({ color, size }) => <SvgMaker name="foodStocks" />}
        label="Food stocks"
        onPress={() => console.log("hi")}
      />
      <Divider />
      <DrawerItem
        icon={({ color, size }) => <SvgMaker name="shoppingList" />}
        label="Shopping List"
        onPress={() => console.log("hi")}
      />
      <Divider />
      <DrawerItem
        icon={({ color, size }) => <SvgMaker name="barcodeScanner" />}
        label="Barcode Scanner"
        onPress={() => console.log("hi")}
      />
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  cont: {
    paddingHorizontal: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Col.Divider,
  },
});
export default DrawerLayout;
