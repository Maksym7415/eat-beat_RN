import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing } from "../../components/Config";
import { Memo } from "../../components/interfaces";
import { Button } from "../../components/MyComponents";
import server from "../../server";
import CreatedRecipeCard from "./Components/CreatedRecipeCard";
import LayoutScroll from "../../components/custom/LayoutScroll";
import { baseURL } from '../../url';

export default function UserRecipes({ navigation }) {
  const [feed, setFeed] = useState<null | []>(null);
  const { getRecipeId } = useContext<Memo>(AppContext);

  const getData = async () => {
    const { data, ok } = await server.getRecipes();
    if (ok) setFeed(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const focus = useIsFocused();
  useEffect(() => {
    if (focus) getData();
  }, [focus]);

  const actionHandler = ({ id, title }) => {
    getRecipeId(id);
    navigation.navigate("user_recipe", { title });
  };

  return feed !== null ? (
    <View style={{ backgroundColor: Col.Background, flexGrow: 1 }}>
      <LayoutScroll>
        <View style={styles.container}>
          {feed ? (
            feed.map(({ id, title, recipe }, index) => (
              <View key={`${index + title}`} style={styles.cardContainer}>
                <CreatedRecipeCard
                  id={id}
                  recipe={true}
                  title={title}
                  actionHandler={actionHandler}
                  image={`${baseURL}/${recipe.image}`}
                />
              </View>
            ))
          ) : (
              <View />
            )}
        </View>
      </LayoutScroll>
      <View style={styles.buttonContainer}>
        <Button
          label="NEW RECIPE"
          onPress={() => navigation.navigate("new")}
          style={{ backgroundColor: Col.Recipes }}
        />
      </View>
    </View>
  ) : (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Col.Black} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.r_small,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardContainer: {
    width: "50%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.medium,
    backgroundColor: Col.Background,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.medium,
  },
});
