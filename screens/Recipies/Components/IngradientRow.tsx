import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Col, Spacing } from "../../../components/Config";
import CheckBox from "../../../components/custom/CheckBox";
import Text from "../../../components/custom/Typography";

export default function IngradientRow({
  name,
  unit,
  uri,
  servings,
  checked,
  checkHandler,
  weight,
}) {
  return (
    <View style={styles.container}>
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
            uri: `https://spoonacular.com/cdn/ingredients_100x100/${uri}`,
          }}
        />
      </View>
      <Text type="h6" style={{ width: "15%", textAlign: "center" }}>
        {servings}
      </Text>
      <Text type="cap" style={{ color: Col.Grey, width: "15%" }}>
        {unit}
      </Text>
      <Text type="cap" style={{ width: "25%", flexWrap: "wrap" }}>
        {name}
      </Text>
      <Text type="cap" style={{ width: "15%", textAlign: "right" }}>
        ({`${weight.amount}${weight.unit}`})
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: Col.Grey3,
    backgroundColor: "white",
  },
  image: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
  },
});
