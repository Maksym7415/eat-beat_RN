import React, { Component, FC, ReactNode, ReactText } from "react";
import { StyleSheet, Text as ReText } from "react-native";
import { Col } from "../Config";

declare interface Props {
  style?: object;
  type?:
    | "h4"
    | "h6"
    | "sub"
    | "body"
    | "bodyBold"
    | "body2"
    | "bodyBold2"
    | "label"
    | "button"
    | "cap";
  children?: string | ReactText | ReactNode[];
  ellipsizeMode?: "head" | "middle" | "tail" | "clip" | undefined;
  numberOfLines?: number;
  onPress?: () => void;
}

export const Text: FC<Props> = (props) => {
  const {
    style,
    type = "body",
    children,
    ellipsizeMode,
    numberOfLines,
    onPress,
  } = props;
  return (
    <ReText
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles[type], style]}
      onPress={onPress}
    >
      {children}
    </ReText>
  );
};

const styles = StyleSheet.create({
  h4: {
    fontFamily: "Roboto_400Regular",
    fontSize: 34,
    color: Col.Grey,
  },
  h6: {
    fontFamily: "Roboto_500Medium",
    fontSize: 20,
    color: Col.Dark,
  },
  sub: {
    fontFamily: "Roboto_500Medium",
    fontSize: 14,
    color: Col.Black,
  },
  body: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: Col.Grey,
  },
  bodyBold: {
    fontFamily: "Roboto_700Bold",
    fontSize: 16,
    color: Col.Dark,
  },
  body2: {
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: Col.Grey,
  },
  bodyBold2: {
    fontFamily: "Roboto_700Bold",
    fontSize: 14,
    color: Col.Dark,
  },
  cap: {
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
    color: Col.Dark,
  },
  label: {
    fontFamily: "Roboto_700Bold",
    fontSize: 14,
    color: Col.Grey1
  },
  button: {
    fontFamily: "Roboto_500Medium",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1.25,
  }
});
export default Text;
