import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Col } from "./Config";

export function MyButton({ Color = Col.Primary, onPress, label }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.btn, { backgroundColor: Color }]}>
        <Text style={styles.txt}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export function ButtonOutline({ onPress, label, details }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.btnOutline}>
        <Text style={styles.txt2}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export function ErrorMessage({ error, visible }) {
  if (!error || !visible) return null;

  return (
    <View style={styles.warningCont}>
      <Text style={styles.warning}>{error}</Text>
    </View>
  );
}

export function TxtButton({ onPress, label, style }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.txtBtn, style]}>
        <Text style={styles.txt2}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
export function IconButton({ onPress, details, color }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <MaterialCommunityIcons
        name={details[0]}
        color={details[1]}
        size={details[2]}
      />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  btnOutline: {
    width: "80%",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Col.Primary,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 20,
  },
  txt: {
    color: "white",
    fontSize: 18,
  },
  txtBtn: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  txt2: {
    color: Col.Primary,
    fontSize: 16,
  },
  warningCont: {
    width: "75%",
  },
  warning: {
    color: Col.Primary,
  },
});
