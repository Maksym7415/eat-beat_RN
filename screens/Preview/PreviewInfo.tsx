import React, { FC, useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { NavProps } from "../../components/interfaces";
import { Divider } from "../../components/MyComponents";
import Nutrient from "../../components/Nutrient";
import { Col, Spacing } from "../../components/Config";
import NutritionItem from "../../components/Nutrition";
import LayoutScroll from "../../components/custom/LayoutScroll";
import Text from "../../components/custom/Typography";
import SvgMaker from "../../components/SvgMaker";
import { useIsFocused } from "@react-navigation/native";
const empty = {
  image: "",
  name: "",
  servings: 0,
  nutrients: [],
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  dairyFree: false,
  veryPopular: false,
};
const PreviewInfo: FC<NavProps> = ({ navigation, route }) => {
  const getInfo = () => {
    const fetcher = navigation.dangerouslyGetParent().dangerouslyGetState();
    const Page =
      fetcher.routes.map((el) => el.name)[0] === "homePage"
        ? "previewPage"
        : "previewRecommendedPage";
    const spread = fetcher.routes.filter((el) => el.name === Page)[0].params
      ?.details;
    return spread ? { ...spread } : { ...empty };
  };
  const [feed, setFeed] = useState({ ...empty });
  const {
    image,
    name,
    servings,
    nutrients,
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    veryPopular,
  } = feed;
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
  const mnarr = ["Calories", "Protein", "Fat", "Carbohydrates"];
  const mainNutrients = nutrients
    ? nutrients.filter((el) => mnarr.includes(el.title))
    : [];

  const focus = useIsFocused();
  useEffect(() => {
    if (focus) {
      const newFeed = getInfo();
      if (newFeed.name !== "" || newFeed.title !== "") setFeed(newFeed);
    }
  }, [focus]);
  return Object.keys(feed).length ? (
    <LayoutScroll>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.imageContainer}>
            {image !== "" ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.image} />
            )}
          </View>
          <View style={styles.nameContainer}>
            <View style={styles.catagoryContainer}>
              {getImage(
                vegetarian,
                vegan,
                glutenFree,
                dairyFree,
                veryPopular
              ).map((icon: string, index: number) => (
                <SvgMaker key={index} style={styles.icons} name={icon} />
              ))}
            </View>
            <Text type="h6">{name}</Text>
          </View>
        </View>
        <View>
          <Nutrient
            name={"Number of servings"}
            currentValue={servings}
            recipe={true}
            isUnit={true}
          />
          <View style={styles.boxContainer}>
            {mainNutrients.map((item, index) => (
              <View key={`${index}`} style={styles.box}>
                <Nutrient
                  recipe={true}
                  name={item.title}
                  unit={item.unit}
                  intakeNorm={item.intakeNorm}
                  currentValue={item.amount}
                />
              </View>
            ))}
          </View>
          <Divider style={styles.divider} />
          <View style={styles.detailsContainer}>
            <Text type="bodyBold" style={styles.detailTitle}>
              Nutrition Details (per serving)
            </Text>
            <View>
              {nutrients &&
                nutrients.map((elm, index) => (
                  <NutritionItem
                    key={index}
                    item={{
                      recipe: true,
                      name: elm.title,
                      unit: elm.unit,
                      currentValue: elm.amount,
                    }}
                  />
                ))}
            </View>
          </View>
        </View>
      </View>
    </LayoutScroll>
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Col.Black} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.r_small,
    backgroundColor: Col.Background,
  },
  border: {
    borderColor: Col.Grey2,
    borderWidth: 1,
  },
  titleContainer: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Col.White,
    marginVertical: Spacing.small,
  },
  nameContainer: {
    padding: Spacing.medium,
  },
  divider: {
    marginVertical: 0,
    marginBottom: Spacing.small,
  },
  imageContainer: {
    height: 200,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.medium,
    backgroundColor: Col.Background,
  },
  editContainer: {
    minHeight: 109,
    backgroundColor: Col.White,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  box: {
    width: "49%",
    //    marginRight: '1%',
  },
  boxContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsContainer: {
    backgroundColor: Col.White,
    borderRadius: 8,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
  },
  detailTitle: {
    fontWeight: "bold",
    fontSize: Spacing.medium,
    paddingBottom: Spacing.small,
  },
  catagoryContainer: {
    flexDirection: "row",
  },
  icons: {
    margin: 2,
  },
});
export default PreviewInfo;
