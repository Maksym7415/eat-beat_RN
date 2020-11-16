import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing } from "../../components/Config";
import { Memo } from "../../components/interfaces";
import { Button } from "../../components/MyComponents";
import server from "../../server";
import CreatedRecipeCard from "./Components/CreatedRecipeCard";

export default function UserRecipes({ navigation }) {
  const [feed, setFeed] = useState<null | []>(null);
  const { getRecipeId, changeUserRecipeTitle } = useContext<Memo>(AppContext);

  const getData = async () => {
    const { data, ok } = await server.getRecipes();
    if (ok) setFeed(data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let focus = navigation.addListener("focus", () => {
      getData();
    });
    () => {
      focus = null;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const actionHandler = ({ id, title }) => {
    getRecipeId(id);
    changeUserRecipeTitle(title);
    navigation.navigate("user_recipe");
    
  };

  return feed !== null ? (
    <View style={{ flex: 1, backgroundColor: Col.Background }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          {feed ? (
            feed.map(({ id, title, recipe }, index) => (
              <View key={`${index + title}`} style={styles.cardContainer}>
                <CreatedRecipeCard
                  id={id}
                  recipe={true}
                  title={title}
                  actionHandler={actionHandler}
                  image={`https://logisticbrocker.hopto.org/eat-beat/${recipe.image}`}
                />
              </View>
            ))
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
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
    padding: Spacing.r_small,
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
    padding: Spacing.medium,
  },
});
