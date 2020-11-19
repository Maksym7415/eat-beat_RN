import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing } from "../../components/Config";
import { Fetching, Memo } from "../../components/interfaces";
import { Button } from "../../components/MyComponents";
import server from "../../server";
import CreatedRecipeCard from "./Components/CreatedRecipeCard";
import LayoutScroll from "../../components/custom/LayoutScroll";
import { baseURL } from '../../url';
import EditModal from "../../components/newEditModal";

interface ModalData {
  creationTime: number;
  meal: object;
}

export default function UserRecipes({ navigation }) {
  const [feed, setFeed] = useState<null | []>(null);
  const { getRecipeId } = useContext<Memo>(AppContext);
  const { calendar, isFetching } = useContext<Memo>(AppContext);
  const { date } = calendar;
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
  });

  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    name: "",
    servings: 1,
    modalVisible: false,
    creationTime: new Date().getTime(),
    data: {},
  });

  const handlerData = (recipe) => {
    setModalData({
      meal: recipe,
      creationTime: new Date().getTime(),
      servings: recipe.servings,
      modalVisible: true,
    });
  }

  const getData = async () => {
    const { data, ok } = await server.getRecipes();
    if (ok) setFeed(data);
  };

  const addRecipe = async (id, { servings, creationTime }) => {
    setFetching({ clicked: true, deactivate: true });
    const data = {
      "quantity": servings,
      "date": creationTime,
      meal: modalData.meal
    }
    await server.addRecipeToMeals(data);
    setFetching({ clicked: false, deactivate: false });
    setModalData({ ...modalData, modalVisible: false });
    navigation.navigate("meals");
  }

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
          <EditModal
            clicked={fetching.clicked}
            data={modalData}
            date={date}
            setData={(id, body) => addRecipe(id, body)}
            hideModal={() => {
              if (fetching.clicked) return;
              setModalData({ ...modalData, modalVisible: false });
            }}
          />
          {feed ? (
            feed.map(({ id, title, recipe, ...other }, index) => (
              <View key={`${index + title}`} style={styles.cardContainer}>
                {/* {console.log(recipe)} */}
                <CreatedRecipeCard
                  addRecipe={handlerData}
                  recipeData={recipe}
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
