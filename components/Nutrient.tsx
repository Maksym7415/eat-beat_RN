import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Col, Spacing } from "./Config";
import { Text } from "./custom/Typography";

interface Props {
  name?: string;
  currentValue?: string;
  intakeNorm?: string;
  unit?: string;
  child?: boolean;
  children?: any;
}

const Nutrient: FC<Props> = ({
  name = "",
  currentValue = "",
  intakeNorm = "",
  unit = "",
  child,
  children,
}) => {
  return (
    <View style={styles.container}>
      {child ? (
        children
      ) : (
        <View>
          <Text style={styles.nutrient_title}>{`${name} (${unit})`}</Text>
          <View style={styles.nutrient_numbers}>
            <Text type="h6" style={styles.unit}>
              {currentValue}
            </Text>
            <View style={styles.maxCount}>
              <Text type="cap" style={styles.maxCountText}>
                {`of ${intakeNorm}`}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    margin: Spacing.tiny,
    padding: Spacing.small,
    backgroundColor: Col.White,
  },
  nutrient_title: {
    color: Col.Grey2,
  },
  nutrient_numbers: {
    flexDirection: "row",
    marginTop: Spacing.small,
    justifyContent: "space-between",
  },
  unit: {
    color: Col.Grey1,
  },
  maxCount: {
    minWidth: 70,
    borderRadius: 8,
    paddingTop: Spacing.tiny,
    backgroundColor: Col.LightGreen,
  },
  maxCountText: {
    color: Col.Green,
    textAlign: "center",
  },
});
export default Nutrient;