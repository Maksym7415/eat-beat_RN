import React, { FC, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavProps } from "../../components/interfaces";
import { Col, Spacing } from "../../components/Config";
import Text from "../../components/custom/Typography";
import LayoutScroll from "../../components/custom/LayoutScroll";

const PreviewInstructions: FC<NavProps> = ({ navigation }) => {
  const getInfo = () => {
    const fetcher = navigation.dangerouslyGetParent().dangerouslyGetState();
    const spread = fetcher.routes.filter((el) => el.name === "previewPage")[0]
      .params?.details;
    return spread ? { ...spread } : { instructions: "" };
  };
  const [feed, setFeed] = useState(getInfo());
  const { instructions } = feed;
  useEffect(() => {
    if (navigation.isFocused()) {
      const newFeed = getInfo();
      if (newFeed.instructions) setFeed(newFeed);
    }
  }, [navigation]);
  return (
    <LayoutScroll style={styles.container}>
      <Text type="body2">
        {instructions ? instructions : "No Instructions here"}
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
