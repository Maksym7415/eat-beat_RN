import React, { FC, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Col, Spacing } from "../Config";
import HealthCircle from "../HealthCircle";
import SvgMaker from "../SvgMaker";
import Text from "./Typography";
import { RecommendedMeals } from "../../components/interfaces";

interface Props {
  details: RecommendedMeals;
  actionHandler: (id: string, title: string, data: object) => void;
}

const RecipeCard: FC<Props> = ({ details, actionHandler, notShowScore }) => {
  const {
    id,
    image,
    title,
    healthScore,
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    veryPopular,
  } = details;
  const getImage = (
    vegetarian: boolean,
    vegan: boolean,
    glutenFree: boolean,
    dairyFree: boolean,
    veryPopular: boolean
  ): string[] => {
    const iconsArray = [];
    if (vegetarian) iconsArray.push("vegetarian");
    if (vegan) iconsArray.push("vegan");
    if (glutenFree) iconsArray.push("glutenFree");
    if (dairyFree) iconsArray.push("dairyFree");
    if (veryPopular) iconsArray.push("popular");
    return iconsArray;
  };
  return (
    <TouchableOpacity onPress={() => actionHandler(id, title, details)}>
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              {notShowScore ? <View style={{height: 32}}></View> : <HealthCircle
                showText
                radius={32}
                percentage={healthScore}
                textColor="white"
                background="#fff3"
              />}
              {/* <Icon
          onPress={addFavourMeal}
          name={!state ? 'heart-outline' : 'heart'}
          color={!state ? Col.White : Col.Red}
          size={24}
        /> */}
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.infoContainer}>
          <Text type="bodyBold2">{title}</Text>
          <View style={styles.catagoryContainer}>
            {
            getImage(
              vegetarian,
              vegan,
              glutenFree,
              dairyFree,
              veryPopular
            ).map((icon: string, index: number) => (
              <SvgMaker key={index} style={styles.icons} name={icon} />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
