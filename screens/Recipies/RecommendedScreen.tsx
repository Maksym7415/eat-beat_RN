import React, { FC, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Spacing } from "../../components/Config";
import RecipeCard from "../../components/custom/RecipeCard";

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
  const [feed, setFeed] = useState([
    {
      image:
        "https://images.unsplash.com/photo-1603498195855-4f17930ee40b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      title: "hello this is a recipe title that is longer than other titles",
      percentage: 45,
      catagory: ["vegan", "popular"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1603498195855-4f17930ee40b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      title: "Lord of the Rings",
      percentage: 65,
      catagory: ["vegetarian", "vegan", "popular"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1603498195855-4f17930ee40b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      title: "Zibra Food",
      percentage: 15,
      catagory: ["vegetarian", "glutenFree", "paleo"],
    },
  ]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {feed.map((item, index) => (
            <View style={styles.cardContainer}>
              <RecipeCard key={`${index}`} item={item} />
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
