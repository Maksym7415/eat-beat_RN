import React from "react";
import { StyleSheet, Text } from "react-native";

export const H1 = ({ style, type, children }) => {
  return <Text style={[styles.h1, styles[type], style]}>{children}</Text>;
};

export const H2 = ({ style, type, children }) => {
  return <Text style={[styles.h1, styles[type], style]}>{children}</Text>;
};

export const H3 = ({ style, type, children }) => {
  return <Text style={[styles.h1, styles[type], style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: "Roboto",
  },
});
