import React, { FC } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Col } from "../../../components/Config";
import SvgMaker from "../../../components/SvgMaker";

interface Props {
  style: ViewStyle;
  onPress: () => void;
}

const ActionButton: FC<Props> = ({ style, onPress }) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <View style={styles.actionContainer}>
        <SvgMaker name="actionButton" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    borderRadius: 50,
    padding: 18,
    backgroundColor: Col.Main,
    elevation: 5,
  },
});
export default ActionButton;
