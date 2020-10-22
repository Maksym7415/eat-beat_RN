import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NutritionItem({
  color,
  name,
  currentValue,
  unit,
  defaultValue,
  percenatage
}) {
  // const precent = Math.round((nutrition_measure / nutrition_number) * 100);
  return (
    <View style={styles.itemContainer}>
      <Text style={{ width: "25%" }}>{name}</Text>
      <Text style={{ width: "15%" }}>{unit}</Text>
      <Text style={{ width: "20%" }}>{currentValue}/</Text>
      <Text style={{ width: "15%" }}>{defaultValue}</Text>
      <Text style={{ width: "15%" }}>{`${percenatage || 0} %`}</Text>
      <View
        style={{ width: "8%", backgroundColor: color, borderRadius: 20 }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
});
