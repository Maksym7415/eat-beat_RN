import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppContext } from "../components/AppContext";
import { Memo } from "../components/interfaces";

const TestOut = () => {
  const { signOut } = useContext<Memo>(AppContext);
  signOut();
  return (
    <View style={styles.cont}>
      <Text>Signing Out</Text>
    </View>
  );
};

export default TestOut;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
