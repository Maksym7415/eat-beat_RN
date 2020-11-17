import React from "react";
import UserCard from "./UserCard";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import { IconMaker } from "../../components/SvgMaker";
import { Col, Spacing } from "../../components/Config";

interface ItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  focus: number;
  index: number;
}

const Divider = () => (
  <View style={styles.cont}>
    <View style={styles.divider} />
  </View>
);

const Item = ({ icon, label, onPress, focus, index }: ItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.itemContainer,
      focus === index && { backgroundColor: Colors[index] },
    ]}
  >
    <IconMaker name={icon} fill={focus === index ? "#fff" : "#737373"} />
    <Text style={[styles.item, focus === index && { color: "white" }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const Colors = [Col.Main, Col.Recipes, Col.Profile];

const DrawerLayout = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;
  const cust = true;
  if (cust)
    return (
      <ScrollView {...props}>
        <UserCard color={Colors[props.state.index]} />
        <Item
          index={2}
          focus={props.state.index}
          icon="profile"
          label="Profile"
          onPress={() => navigate("profileDrawer")}
        />
        <Divider />
        <Item
          index={0}
          focus={props.state.index}
          icon="foodDiary"
          label="Food Diary"
          onPress={() => navigate("homeDrawer")}
        />
        <Item
          index={1}
          focus={props.state.index}
          icon="recipes"
          label="Recipes"
          onPress={() => navigate("recommendedDrawer")}
        />
        <Item
          index={3}
          focus={props.state.index}
          icon="restaurants"
          label="Restaurants"
          onPress={() => console.log("hi")}
        />
        <Item
          index={3}
          focus={props.state.index}
          icon="snacks"
          label="Snacks"
          onPress={() => console.log("hi")}
        />
        <Item
          index={3}
          focus={props.state.index}
          icon="foodStocks"
          label="Food Stocks"
          onPress={() => console.log("hi")}
        />
        <Divider />
        <Item
          index={3}
          focus={props.state.index}
          icon="shoppingList"
          label="Shopping List"
          onPress={() => console.log("hi")}
        />
        <Divider />
        <Item
          index={3}
          focus={props.state.index}
          icon="barcodeScanner"
          label="Barcode Scanner"
          onPress={() => console.log("hi")}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text>v 0.1.6</Text>
        </View>
      </ScrollView>
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
  itemContainer: {
    flexDirection: "row",
    padding: Spacing.medium,
    alignItems: "center",
  },
  item: {
    marginLeft: Spacing.large,
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
});
export default DrawerLayout;
