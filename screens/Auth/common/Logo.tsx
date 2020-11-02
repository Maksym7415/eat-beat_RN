import React, { FC } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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

const ScrHight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: Math.round(ScrHight * 0.09),
    marginBottom: Math.round(ScrHight * 0.05),
  },
});
export default Logo;
