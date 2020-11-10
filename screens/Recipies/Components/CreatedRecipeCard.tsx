import React, { FC, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Col, Spacing } from "../../../components/Config";
import Text from "../../../components/custom/Typography";
import { RecommendedMeals } from "../../../components/interfaces";

const CreatedRecipeCard: FC<RecommendedMeals> = (props) => {
  const {
    image,
    title,
    healthScore,
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    popular,
    actionHandler,
    id,
    recipe,
  } = props;
  const [state, setState] = useState<boolean>(false);

  return (
    <TouchableOpacity onPress={() => actionHandler(props)}>
      <View style={styles.container}>
        {console.log(image)}
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
              <View style={{ width: 64, height: 64 }} />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.infoContainer}>
          <Text type="bodyBold2">{title}</Text>
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

export default CreatedRecipeCard;