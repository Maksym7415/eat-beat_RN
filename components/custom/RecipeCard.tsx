import React, { FC } from "react";
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
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Divider } from "../../components/MyComponents";

interface Props {
  details: RecommendedMeals;
  actionHandler: (id: string, title: string, data: object) => void;
  onPreview?: () => void;
  notShowScore?: boolean;
}

const RecipeCard: FC<Props> = ({
  details,
  actionHandler,
  onPreview,
  notShowScore,
}) => {
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
    name,
    is_partner,
    restName,
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
    return iconsArray;
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPreview}>
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
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              {notShowScore ? (
                <View style={{ height: 32 }} />
              ) : (
                  <HealthCircle
                    showText
                    radius={32}
                    percentage={healthScore}
                    textColor="white"
                    background="#fff3"
                  />
                )}
              <Icon
                onPress={() => actionHandler(id, title || name, details)}
                name={"add-box"}
                color={Col.White}
                size={32}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.infoContainer}>
          {is_partner !== undefined ? <View>
            <View style={styles.restaurantContainer}>
              <SvgMaker style={styles.icons} name={'partnerStar'} />
              <Text type="bodyBold2">{restName || 'without name'}</Text>
            </View>
            <Divider styler={styles.horizontalDivider} />
          </View> : null}
          <Text type="bodyBold2">{title || name}</Text>
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
  restaurantContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
    minHeight: 30
  },
  icons: {
    margin: 2,
  },
  horizontalDivider: {
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderLeftColor: Col.Divider,
  },
});

export default RecipeCard;
