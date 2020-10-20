import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
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
