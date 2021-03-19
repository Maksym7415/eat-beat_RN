import React, { FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  style: ViewStyle;
}

const Layout: FC<Props> = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Layout;
