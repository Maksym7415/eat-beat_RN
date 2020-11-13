import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavProps } from "../../components/interfaces";

const PreviewIngredients: FC<NavProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>PreviewIngredients</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PreviewIngredients;
