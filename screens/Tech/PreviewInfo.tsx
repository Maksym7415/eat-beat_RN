import React, { FC } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { NavProps } from "../../components/interfaces";
import { Button, Divider } from "../../components/MyComponents";
import Nutrient from "../../components/Nutrient";
import { Col, Spacing } from "../../components/Config";
import NutritionItem from "../../components/Nutrition";
import LayoutScroll from "../../components/custom/LayoutScroll";

const PreviewInfo: FC<NavProps> = ({ navigation, route }) => {
  const feed = route.params.details;
  return Object.keys(feed).length ? (
    <LayoutScroll>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://logisticbrocker.hopto.org/eat-beat/${feed.uri}`,
              }}
              style={styles.image}
            />
          </View>
          <Divider styler={styles.divider} />
          <View style={{ paddingHorizontal: 16 }}>
            <Text style={{ marginBottom: 10 }}>Title*</Text>
            <Text>{feed.title}</Text>
          </View>
        </View>
        <View>
          <View>
            <Nutrient
              name={"Number of servings"}
              currentValue={feed.servings}
              recipe={true}
              isUnit={true}
            />
          </View>
          <View style={styles.boxContainer}>
            {feed.mainNutrients &&
              feed.mainNutrients.map((item, index) => (
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
          <View style={styles.detailsContainer}>
            <Text style={styles.detailTitle}>
              Nutrition Details (per serving)
            </Text>
            <View>
              {feed.nutrients &&
                feed.nutrients.map((elm, index) => (
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
          <View>
            <Button
              label="Add recipe to my meals"
              onPress={() => console.log("")}
              style={{ backgroundColor: Col.Recipes }}
            />
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
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.r_small,
    flex: 1,
  },
  border: {
    borderColor: Col.Grey2,
    borderWidth: 1,
  },
  titleContainer: {
    backgroundColor: Col.White,
    paddingBottom: 23,
    borderRadius: 8,
    marginBottom: 12,
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: Spacing.small,
    borderBottomColor: Col.Divider,
  },
  imageContainer: {
    height: 194,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
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
});
export default PreviewInfo;
