import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Col, Weight, Typ, Spacing } from "./Config";

export default function Nutrient({
  title = "",
  currentSize = "",
  maxSize = "",
  unit = "",
  child,
  children,
}) {
  return (
    <View style={styles.container}>
      {child ? (
        children
      ) : (
        <View>
          <Text style={styles.nutrient_title}>{`${title} (${unit})`}</Text>
          <View style={styles.nutrient_numbers}>
            <Text style={styles.unit}>{currentSize}</Text>
            <View style={styles.maxCount}>
              <Text style={styles.maxCountText}>{`of ${maxSize}`} </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Col.White,
    borderRadius: 8,
    padding: Spacing.small,
    margin: Spacing.tiny,
  },
  nutrient_title: {
    fontFamily: "Roboto",
    fontWeight: Weight.Normal,
    fontSize: Typ.Normal,
    color: Col.Grey2,
  },
  nutrient_numbers: {
    marginTop: Spacing.small,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  unit: {
    fontWeight: Weight.Normal1,
    fontSize: Typ.H3,
    fontFamily: "Roboto",
    color: Col.Grey1,
  },
  maxCount: {
    backgroundColor: Col.Green,
    minWidth: 70,
    borderRadius: 8,
    paddingTop: Spacing.tiny,
  },
  maxCountText: {
    color: Col.Green1,
    fontFamily: "Roboto",
    fontWeight: Weight.Normal,
    fontSize: Typ.Tiny,
    textAlign: "center",
  },
});
