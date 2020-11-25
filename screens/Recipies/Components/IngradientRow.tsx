import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Col, Spacing } from "../../../components/Config";
import CheckBox from "../../../components/custom/CheckBox";
import Text from "../../../components/custom/Typography";

interface IngProps {
  item: {
    image: string;
    name: string;
    amount: number;
    unit: string;
    nutrition: {
      weightPerServing: {
        amount: number;
        unit: string;
      };
    };
  };

  checked: object;
  checkHandler: () => void;
}

const RoundIt = (value: number) => {
  return Math.round(value * 10) / 10;
};

export default function IngradientRow({
  item,
  checked,
  checkHandler,
}: IngProps) {
  const { image, name, unit, amount, nutrition } = item;
  const weightAmount = nutrition?.weightPerServing?.amount;
  const weightUnit = nutrition?.weightPerServing?.unit;
  return (
    <TouchableOpacity onPress={checkHandler} style={styles.ingredient}>
      <CheckBox
        onCheck={checkHandler}
        blend={"#4C9C05"}
        checkColor={"#ffffff"}
        value={checked[name]}
        name={name}
        size={20}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: Spacing.r_small,
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: "https://spoonacular.com/cdn/ingredients_100x100/" + image,
          }}
        />
      </View>
      <Text type="h6" style={{ width: "15%" }}>
        {RoundIt(amount)}
      </Text>
      <Text type="cap" style={{ color: Col.Grey, width: "20%" }}>
        {unit}
      </Text>
      <Text type="cap" style={{ width: "25%", flexWrap: "wrap" }}>
        {name}
      </Text>
      <Text type="cap" style={{ width: "15%", textAlign: "right" }}>
        ({`${weightAmount || 0}${weightUnit || "g"}`})
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  ingredient: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 1,
    padding: Spacing.r_small,
  },
  image: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
  },
});
