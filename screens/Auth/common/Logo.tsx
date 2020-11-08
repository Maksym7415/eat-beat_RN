import React, { FC } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import SvgMaker from "../../../components/SvgMaker";

interface Props {
  onLongPress?: () => void;
}

const Logo: FC<Props> = ({ onLongPress }) => {
  return (
    <TouchableWithoutFeedback onLongPress={onLongPress}>
      <View style={styles.logoContainer}>
        <SvgMaker name="logo" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: "15%",
    marginBottom: "15%",
  },
});
export default Logo;
