import React, { FC } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing } from "./Config";
import { Text } from "./custom/Typography";

interface Props {
    setSelect: (value: boolean) => void;
  label: string;
  defaultValue: boolean
  newState: object
  radioBtn: string
}

const RadioInput: FC<Props> = ({
    defaultValue,
    setSelect,
    label,
    newState,
    radioBtn
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => setSelect(true, label)}
    >
      <View style={styles.container}>
        <Icon
          name={defaultValue ? "radiobox-marked" : "radiobox-blank"}
          color={!defaultValue ? Col.Grey : radioBtn}
          size={20}
        />
        <Text
          style={!defaultValue ? styles.off : styles.on}
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
