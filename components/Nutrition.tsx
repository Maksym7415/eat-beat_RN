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
  const color =
    percenatage < 100
      ? `rgb(${45 + percenatage * 1.9},${175 - percenatage * 0.73},${
          12 + percenatage * 0.82
        })`
      : Col.Red;
  return (
    <View style={styles.itemContainer}>
      <Text type="body2" style={{ width: "37%", color: Col.Dark }}>
        {name}
      </Text>
      <Text type="body2" style={{ width: "15%", color: Col.Faded }}>
        ({unit})
      </Text>
      <Text
        type="body2"
        style={{ width: "20%", textAlign: "right", color: Col.Dark }}
      >
        {currentValue}
      </Text>
      {!recipe && (
        <Text type="body2" style={{ width: "18%", color: Col.Faded }}>
          /{defaultValue}
        </Text>
      )}
      {!recipe && (
        <Text type="body2" style={{ width: "15%", color }}>{`${
          percenatage || 0
        }%`}</Text>
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
