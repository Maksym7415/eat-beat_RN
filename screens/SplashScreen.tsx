import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../components/custom/Typography";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to EatBeat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
