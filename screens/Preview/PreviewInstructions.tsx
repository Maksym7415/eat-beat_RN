import React, { FC, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavProps } from "../../components/interfaces";
import { Col, Spacing } from "../../components/Config";
import Text from "../../components/custom/Typography";
import LayoutScroll from "../../components/custom/LayoutScroll";
import { useIsFocused } from "@react-navigation/native";
import { pageSettings } from "../config";

const PreviewInstructions: FC<NavProps> = ({ navigation, page }) => {
  const getInfo = () => {
    const fetcher = navigation.dangerouslyGetParent().dangerouslyGetState();
    const Page =
      fetcher.routes.map((el) => el.name)[0] === "homePage"
        ? "previewPage"
        : "previewRecommendedPage";
    const spread = fetcher.routes.filter((el) => el.name === Page)[0].params
      ?.details;
    return spread ? { ...spread } : { instructions: "" };
  };
  const [feed, setFeed] = useState({ instructions: "" });
  const { instructions } = feed;
  const focus = useIsFocused();
  useEffect(() => {
    if (focus) {
      const newFeed = getInfo();
      if (newFeed.instructions) setFeed(newFeed);
    }
  }, [focus]);
  return (
    <LayoutScroll style={styles.container}>
      <Text type="body2">
        {instructions ? instructions : pageSettings[page].noInstractiontext}
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
