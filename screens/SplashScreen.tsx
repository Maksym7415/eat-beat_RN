import React from "react";
import { StyleSheet, View, Text } from "react-native";

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
