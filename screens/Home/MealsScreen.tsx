import React, { FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Col, Spacing, Database } from "../../components/Config";
import CookedMealCard from "../../components/CookedMealCard";
import { NavProps } from "../../components/interfaces";

const MealsScreen: FC<NavProps> = ({ navigation }) => {
  console.log("hi");
  return (
    <View style={styles.container}>
      <FlatList
        data={Database.meals}
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
    padding: Spacing.medium,
    backgroundColor: Col.Background,
  },
});
export default MealsScreen;
