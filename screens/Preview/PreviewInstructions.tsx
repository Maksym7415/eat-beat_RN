import React, { FC, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavProps } from "../../components/interfaces";
import { Col, Spacing } from "../../components/Config";
import Text from "../../components/custom/Typography";
import LayoutScroll from "../../components/custom/LayoutScroll";
import { useIsFocused } from "@react-navigation/native";
import { pageSettings } from "../config";

const PreviewInstructions: FC<NavProps> = ({ navigation, page, item }) => {

  return (
    <LayoutScroll style={styles.container}>
      <Text type="body2">
        {item.meal.instructions ? item.meal.instructions : pageSettings[page].noInstractiontext}
      </Text>
    </LayoutScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Col.Background,
    padding: Spacing.medium,
  },
});
export default PreviewInstructions;
