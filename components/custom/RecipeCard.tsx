import React, { FC } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Col, Spacing } from "../Config";
import HealthCircle from "../HealthCircle";
import SvgMaker from "../SvgMaker";
import Text from "./Typography";

interface Props {
  item: {
    image: string;
    title: string;
    percentage: number;
    catagory: string[];
  };
}

const RecipeCard: FC<Props> = ({ item }) => {
  const { image, title, percentage, catagory } = item;
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageContainer} source={{ uri: image }}>
        <LinearGradient
          start={[0, 0]}
          end={[0, 1]}
          colors={["transparent", "transparent", "#000"]}
          style={{
            padding: Spacing.small,
          }}
        >
          <View style={{ height: 80 }} />
          <View>
            <HealthCircle
              showText
              radius={32}
              percentage={percentage}
              textColor="white"
              background="#fff3"
            />
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.infoContainer}>
        <Text type="bodyBold2">{title}</Text>
        <View style={styles.catagoryContainer}>
          {catagory.map((item) => (
            <SvgMaker style={styles.icons} name={item} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: Col.White,
    margin: Spacing.tiny,
  },
  imageContainer: {
    borderRadius: 8,
    resizeMode: "cover",
    overflow: "hidden",
  },
  infoContainer: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.r_small,
  },
  catagoryContainer: {
    flexDirection: "row",
  },
  icons: {
    margin: 2,
  },
});

export default RecipeCard;
