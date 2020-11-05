import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "./Typography";
import { Col } from "../Config";

interface Props {
  title: string;
  setChipsState: (title: string, state: boolean) => void;
  chipBgColor: string;
  state: boolean;
  isEnabled?: boolean;
  chipsState: {
    Male: boolean;
    Female: boolean;
  };
}

const Chip: FC<Props> = ({
  title,
  setChipsState,
  state,
  chipBgColor,
  isEnabled,
  chipsState = {},
}) => {
  const { Male, Female } = chipsState;
  return (
    <TouchableOpacity onPress={() => setChipsState(title, !state)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: !state ? Col.White : chipBgColor,
            borderColor: isEnabled && Male && Female ? "red" : Col.Back3,
          },
        ]}
      >
        <Text type="body2" style={{ color: !state ? "#7A7A7A" : Col.White }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Col.White,
    borderRadius: 60,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 8,
    borderWidth: 1,
  },
});
export default Chip;
