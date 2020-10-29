import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/splash.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
