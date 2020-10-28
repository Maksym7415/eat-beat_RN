import React, { FC, useState, useEffect, useContext } from "react";
import axios from "axios";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { Spacing } from "../../components/Config";
import RecipeCard from "../../components/custom/RecipeCard";
import { Memo, RecommendedMeals } from "../../components/interfaces";
import server from "../../server";
import { AppContext } from "../../components/AppContext";

interface Props {
  recipe: string;
}
/*
    | "vegetarian"
    | "vegan"
    | "popular"
    | "paleo"
    | "glutenFree"
    | "dairyFree";
*/
const RecommendedScreen: FC<Props> = () => {
  const [feed, setFeed] = useState<Array<RecommendedMeals>>([]);
  const { calendar } = useContext<Memo>(AppContext);
  const { date } = calendar;

  const serveData = async () => {
    const response = await server.getRecommendedMeals(date);
    response.ok
      ? setFeed(response.data)
      : Alert.alert(
          response.status?.toString(),
          `${response.problem}\n${JSON.stringify(response.config)}`
        );
    console.log("getRecommendedMeals => request: ", response.ok);
  };

  useEffect(() => {
    serveData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {feed.map((item, index) => (
            <View key={`${index}`} style={styles.cardContainer}>
              <RecipeCard {...item} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.r_small,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardContainer: {
    width: "50%",
  },
});

export default RecommendedScreen;
