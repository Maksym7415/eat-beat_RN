import React, { FC } from "react";
import { StyleSheet, ViewStyle, Pressable } from "react-native";
import Text from "./Typography";
import { Col, Spacing } from "../Config";

interface Props {
  title: string;
  onPress: (value: string) => void;
  state: boolean;
  style?: ViewStyle;
  selectedColor?: string;
  disabled?: boolean;
}

const ToggleChip: FC<Props> = ({
  title,
  state,
  style,
  onPress,
  disabled,
  selectedColor = Col.Grey,
}) => {
  return (
    <Pressable
      onPress={() => onPress(title)}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? styles.disabled : state ? selectedColor : Col.White,
        },
        style,
      ]}
    >
      <Text type="body2" style={{ color: disabled ? "#C2C2C2" : state ? Col.White : Col.Grey }}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Col.White,
    borderRadius: 60,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.medium,
    margin: Spacing.tiny,
    borderWidth: 1,
    borderColor: Col.Divider,
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "#EAEAEA"
  }
});
export default ToggleChip;
