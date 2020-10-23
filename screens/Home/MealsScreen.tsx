import React, { FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Spacing } from "../../components/Config";
import CookedMealCard from "../../components/CookedMealCard";
import { NavProps } from "../../components/interfaces";

const MealsScreen: FC<NavProps> = ({ navigation }) => {
  const data = [
    {
      id: 0,
      title: "Amaranth Breakfast Porridge with Blueberry Compote",
      image:
        "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 1,
      title: "Black coffee without sugar",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CookedMealCard
            key={item.id}
            item={item}
            onDelete={(id) => console.log(id)}
            onClick={(id) => console.log(id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.r_small,
  },
});
export default MealsScreen;
