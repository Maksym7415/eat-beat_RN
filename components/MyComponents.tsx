import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { Col, Spacing } from "./Config";

interface ButtonProps {
  type?: "fill" | "outline" | "text";
  onPress: () => void;
  label: string | number;
  clicked?: boolean;
}

interface ErrorProps {
  error: boolean | string | number;
  visible: boolean;
}

interface DividerProps {
  styler: ViewStyle;
}

export const Button: FC<ButtonProps> = ({
  type = "fill",
  clicked,
  onPress,
  label,
}) => {
  return (
    <TouchableWithoutFeedback disabled={clicked} onPress={onPress}>
      <View style={[styles.button, styles[type]]}>
        <Text style={type === "fill" ? styles.txt : styles.fill}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const ErrorMessage: FC<ErrorProps> = ({ error, visible }) => {
  if (!error || !visible) return null;

  return (
    <View style={styles.warningCont}>
      <Text style={styles.warning}>{error}</Text>
    </View>
  );
};

export const Divider: FC<DividerProps> = ({ styler }) => {
  return <View style={styler} />;
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.medium,
    marginVertical: Spacing.medium,
  },
  fill: {
    backgroundColor: Col.Blue,
  },
  text: {
    backgroundColor: "transparent",
  },
  outline: {
    borderWidth: 2,
    borderColor: Col.Blue,
    backgroundColor: "transparent",
  },
  txt: {
    color: "white",
  },
  warningCont: {
    width: "100%",
  },
  warning: {
    color: Col.Red,
  },
});
