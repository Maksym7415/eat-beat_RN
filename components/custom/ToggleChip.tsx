import React, { FC } from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
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
      disabled={disabled}
      onPress={() => onPress(title)}
      style={[
        styles.container,
        {
          backgroundColor: state ? selectedColor : Col.White,
        },
        style,
      ]}
    >
      <Text type="body2" style={{ color: state ? Col.White : selectedColor }}>
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
    marginVertical: Spacing.small,
    marginHorizontal: Spacing.tiny,
    borderWidth: 1,
    borderColor: Col.Divider,
    alignItems: "center",
  },
});
export default ToggleChip;
