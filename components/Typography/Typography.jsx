import React from "react";
import { StyleSheet } from "react-native";
import ReText from "./ReText";

export const Text = ({ style, type, children }) => {
  return <ReText style={[styles[type], style]}>{children}</ReText>;
};
export default Text;
/*

export const H6 = ({ style, type, children }) => {
  return <Text style={[styles.h6, styles[type], style]}>{children}</Text>;
};

export const Sub = ({ style, type, children }) => {
  return <Text style={[styles.sub, styles[type], style]}>{children}</Text>;
};

export const Body = ({ style, type, children }) => {
  return <Text style={[styles.body, styles[type], style]}>{children}</Text>;
};

export const Cap = ({ style, type, children }) => {
  return <Text style={[styles.cap, styles[type], style]}>{children}</Text>;
};
*/
const Font = "Roboto";
const styles = StyleSheet.create({
  h4: {
    fontFamily: Font,
    fontWeight: "400",
    fontSize: 34,
  },
  h6: {
    fontFamily: Font,
    fontWeight: "500",
    fontSize: 20,
  },
  sub: {
    fontFamily: Font,
    fontWeight: "500",
    fontSize: 14,
  },
  body: {
    fontFamily: Font,
    fontWeight: "700",
    fontSize: 16,
  },
  body2: {
    fontFamily: Font,
    fontWeight: "400",
    fontSize: 14,
  },
  cap: {
    fontFamily: Font,
    fontWeight: "400",
    fontSize: 12,
  },
});
