import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Col } from "./Config";
interface Props {
  item: {
    name: string;
    currentValue: number;
    unit: string;
    defaultValue: number;
    percenatage: number;
    recipe: boolean
  };
}
const NutritionItem: FC<Props> = ({ item }) => {
  const { name, currentValue, unit, defaultValue, percenatage = 0, recipe } = item;
  // const precent = Math.round((nutrition_measure / nutrition_number) * 100);
  const color =
    percenatage < 100
      ? `rgb(${45 + percenatage * 1.9},${175 - percenatage * 0.73},${
          12 + percenatage * 0.82
        })`
      : Col.Red;
  return (
    <View style={styles.itemContainer}>
      <Text style={{ width: "25%" }}>{name}</Text>
      <Text style={{ width: "15%" }}>{unit}</Text>
      <Text style={{ width: "20%" }}>{currentValue}/</Text>
     {!recipe &&<Text style={{ width: "15%" }}>{defaultValue}</Text>}
      {!recipe &&<Text style={{ width: "15%" }}>{`${percenatage || 0} %`}</Text>}
      {!recipe && <View
        style={{ width: "8%", backgroundColor: color, borderRadius: 20 }}
      ></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
});

export default NutritionItem;
