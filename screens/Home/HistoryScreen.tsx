import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { NavProps } from "../../components/interfaces";

const HistoryScreen: FC<NavProps> = ({ navigation }) => {
  return <View />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HistoryScreen;
