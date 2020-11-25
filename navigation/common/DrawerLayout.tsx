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
  onPress?: () => void;
  disabled?: boolean;
  focus: number;
  index: number;
}

const Divider = () => (
  <View style={styles.cont}>
    <View style={styles.divider} />
  </View>
);

const Item = ({
  icon,
  label,
  onPress,
  focus,
  index,
  disabled = false,
}: ItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.itemContainer,
      focus === index && { backgroundColor: Colors[index] },
    ]}
  >
    <View style={{ width: 24 }}>
      <IconMaker
        name={icon}
        fill={disabled ? Col.Inactive : focus === index ? "#fff" : "#737373"}
      />
    </View>
    <Text
      style={[
        styles.item,
        disabled
          ? { color: Col.Inactive }
          : focus === index && { color: "white" },
      ]}
    >
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
          disabled
        />
        <Item
          index={3}
          focus={props.state.index}
          icon="snacks"
          label="Snacks"
          disabled
        />
        <Item
          index={3}
          focus={props.state.index}
          icon="foodStocks"
          label="Food Stocks"
          disabled
        />
        <Divider />
        <Item
          index={3}
          focus={props.state.index}
          icon="shoppingList"
          label="Shopping List"
          disabled
        />
        <Divider />
        <Item
          index={3}
          focus={props.state.index}
          icon="barcodeScanner"
          label="Barcode Scanner"
          disabled
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ color: Col.Inactive }}>v 0.2.1</Text>
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
