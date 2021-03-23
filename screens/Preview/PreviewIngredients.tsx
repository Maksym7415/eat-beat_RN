import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { NavProps } from "../../components/interfaces";
import Text from "../../components/custom/Typography";
import { Col, Spacing } from "../../components/Config";
import CheckBox from "../../components/custom/CheckBox";
import LayoutScroll from "../../components/custom/LayoutScroll";
import { Button } from "../../components/MyComponents";

interface IngProps {
  item: {
    image: string;
    name: string;
    amount: number;
    unit: string;
    weightPerServing: {
      amount: number;
      unit: string;
    };
  };
}

const Ingredient = ({ item }: IngProps) => {
  const { image, name, unit, amount, weightPerServing } = item;
  const [check, setCheck] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setCheck(!check)}
      style={styles.ingredient}
    >
      <CheckBox
        name={name}
        value={check}
        onCheck={(a, b) => setCheck(!check)}
        size={18}
        blend={Col.Dark}
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
        {amount}
      </Text>
      <Text type="cap" style={{ color: Col.Grey, width: "20%" }}>
        {unit}
      </Text>
      <Text type="cap" style={{ width: "25%", flexWrap: "wrap" }}>
        {name}
      </Text>
      <Text type="cap" style={{ width: "15%", textAlign: "right" }}>
        ({`${weightPerServing?.amount || 0}${weightPerServing?.unit || "g"}`})
      </Text>
    </TouchableOpacity>
  );
};

const PreviewIngredients: FC<NavProps> = ({ navigation, item }) => {

  return (
    <LayoutScroll style={styles.container}>
      {item.meal.ingredients.map((ele, ind) => (
        <Ingredient key={`_${ind}`} item={ele} />
      ))}
      <Button
        label="Add selected products to My Shopping List"
        onPress={() => console.log("")}
        style={{ backgroundColor: Col.Recipes }}
        deactivate={true}
      />
    </LayoutScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Col.Background,
  },
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
export default PreviewIngredients;
