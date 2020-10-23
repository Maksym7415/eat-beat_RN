import React, { FC, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing } from "../Config";
import { Text } from "./Typography";

interface Props {
  onSelect: (value: number) => void;
  label: string;
  selected: number;
  value: number;
  disabled: boolean;
}

const RadioInput: FC<Props> = ({
  value,
  selected,
  disabled,
  onSelect,
  label,
}) => {
  const select = selected === value;
  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      onPress={() => onSelect(value)}
    >
      <View style={styles.container}>
        <Icon
          name={select ? "radiobox-marked" : "radiobox-blank"}
          color={disabled ? Col.Inactive : select ? Col.Blue : Col.Grey}
          size={20}
        />
        <Text
          style={disabled ? styles.disabled : select ? styles.on : styles.off}
        >
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: Spacing.small,
  },
  on: {
    marginLeft: Spacing.large,
    color: "black",
  },
  off: {
    marginLeft: Spacing.large,
    color: Col.Grey,
  },
  disabled: {
    marginLeft: Spacing.large,
    color: Col.Inactive,
  },
});
export default RadioInput;
