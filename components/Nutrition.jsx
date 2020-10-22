import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NutritionItem({
  color,
  nutrition_title,
  nutrition_measure,
  nutrition_unit,
  nutrition_number,
}) {
  const precent = Math.round((nutrition_measure / nutrition_number) * 100);
  return (
    <View style={styles.itemContainer}>
      <Text style={{ width: "25%" }}>{nutrition_title}</Text>
      <Text style={{ width: "15%" }}>{nutrition_unit}</Text>
      <Text style={{ width: "20%" }}>{nutrition_measure}/</Text>
      <Text style={{ width: "15%" }}>{nutrition_number}</Text>
      <Text style={{ width: "15%" }}>{`${precent} %`}</Text>
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
