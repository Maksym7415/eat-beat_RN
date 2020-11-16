import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Col } from "./Config";
import Text from "./custom/Typography";
interface Props {
  item: {
    name: string;
    currentValue: number;
    unit: string;
    defaultValue?: number;
    percenatage?: number;
    recipe?: boolean;
  };
}
const NutritionItem: FC<Props> = ({ item }) => {
  const {
    name,
    currentValue,
    unit,
    defaultValue,
    percenatage = 0,
    recipe,
  } = item;
  // const precent = Math.round((nutrition_measure / nutrition_number) * 100);
  const color =
    percenatage < 100
      ? `rgb(${45 + percenatage * 1.9},${175 - percenatage * 0.73},${
          12 + percenatage * 0.82
        })`
      : Col.Red;
  return (
    <View style={styles.itemContainer}>
      <Text type="cap" style={{ width: "30%" }}>
        {name}
      </Text>
      <Text type="cap" style={{ width: "15%", color: Col.Grey }}>
        ({unit})
      </Text>
      <Text type="cap" style={{ width: "15%", textAlign: "right" }}>
        {currentValue}
      </Text>
      {!recipe && (
        <Text type="cap" style={{ width: "15%", color: Col.Grey }}>
          /{defaultValue}
        </Text>
      )}
      {!recipe && (
        <Text type="cap" style={{ width: "15%" }}>{`${
          percenatage || 0
        } %`}</Text>
      )}
      {!recipe && (
        <View
          style={{ width: "8%", backgroundColor: color, borderRadius: 20 }}
        ></View>
      )}
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
