import React, { FC, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { StyleSheet, ScrollView, View } from "react-native";
import { Spacing } from "../../components/Config";
import RecipeCard from "../../components/custom/RecipeCard";
import { RecommendedMeals } from '../../components/interfaces'

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

useEffect(() => {
    const recommendedRecipes = async () => {
      try{
        const { data } = await axios(`/meals/recommend-meals?date=2020-01-01`);
        setFeed(data)
      }catch(error) {
        console.log(error)
      }
    }
    recommendedRecipes() 
}, [])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {feed.map((item, index) => (
            <View style={styles.cardContainer}>
              <RecipeCard key={`${index}`} {...item} />
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
