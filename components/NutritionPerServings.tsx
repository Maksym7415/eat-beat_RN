import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Col } from "./Config";
interface Props {
  item: {
    name: string;
    currentValue: number;
    unit: string;
  };
}
const NutritionPerServings: FC<Props> = ({ item }) => {
  const { name, currentValue, unit } = item;
  return (
    <View style={styles.itemContainer}>
      <Text style={{ width: "25%" }}>{name}</Text>
      <Text style={{ width: "15%" }}>{unit}</Text>
      <Text style={{ width: "20%" }}>{currentValue}/</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
});

export default NutritionPerServings;
