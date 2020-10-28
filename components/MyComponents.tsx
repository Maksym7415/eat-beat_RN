import React, { FC } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Col, Spacing } from "./Config";
import Text from "./custom/Typography";

interface ButtonProps {
  type?: "fill" | "outline" | "text";
  onPress: () => void;
  label: string | number;
  clicked?: boolean;
  style?: object;
  labelStyle?: object;
}

interface ErrorProps {
  error: string;
  visible: boolean;
  style?: ViewStyle;
}

interface DividerProps {
  styler?: ViewStyle;
}

export const Button: FC<ButtonProps> = ({
  type = "fill",
  clicked,
  onPress,
  label,
  style,
  labelStyle,
}) => {
  return (
    <Pressable disabled={clicked} onPress={onPress}>
      <View style={[styles.button, styles[type], style]}>
        {clicked ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            type="sub"
            style={[
              type === "fill" ? styles.label : styles.labelFill,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export const ErrorMessage: FC<ErrorProps> = ({ error, visible, style }) => {
  if (!error || !visible) return null;

  return (
    <View style={[styles.warningCont, style]}>
      <Text style={styles.warning}>{error}</Text>
    </View>
  );
};

export const Divider: FC<DividerProps> = ({ styler = styles.divider }) => {
  return <View style={styler} />;
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    marginVertical: Spacing.medium,
  },
  fill: {
    backgroundColor: Col.Main,
  },
  text: {
    backgroundColor: "transparent",
  },
  outline: {
    borderWidth: 2,
    borderColor: Col.Main,
    backgroundColor: "transparent",
  },
  labelFill: {
    color: Col.Main,
  },
  label: {
    color: "white",
  },
  warningCont: {
    width: "100%",
  },
  warning: {
    color: Col.Error,
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: Spacing.small,
    borderBottomColor: Col.Divider,
  },
});
