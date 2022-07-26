import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing } from "../../components/Config";
import { Fetching, Memo } from "../../components/interfaces";
import { Button } from "../../components/MyComponents";
import server from "../../server";
import CreatedRecipeCard from "./Components/CreatedRecipeCard";
import LayoutScroll from "../../components/custom/LayoutScroll";
import EditModal from "../../components/EditModal";
import AppBackend from '../../components/BackendSwitcher/store'


interface ModalData {
  id: number;
  name: string;
  servings: number;
  modalVisible: boolean;
  creationTime: number;
  data: object;
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

  const handlerData = (recipe, id) => {
    setModalData({
      id,
      name: recipe.title,
      creationTime: new Date().getTime(),
      servings: 1,
      modalVisible: true,
      data: recipe,
    });
  };

  const getData = async () => {
    const { data, ok } = await server.getRecipes();
    if (ok) setFeed(data);
  };

  const addRecipe = async (id, { servings, creationTime }) => {
    setFetching({ clicked: true, deactivate: true });
    const data = {
      quantity: servings,
      date: creationTime,
      recipeId: modalData.id,
    };
    await server.addRecipeToMeals(data);
    setFetching({ clicked: false, deactivate: false });
    setModalData({ ...modalData, modalVisible: false });
    navigation.navigate("meals");
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
          <EditModal
            clicked={fetching.clicked}
            data={modalData}
            date={date}
            setData={(id, body) => addRecipe(id, body)}
            hideModal={() => {
              if (fetching.clicked) return;
              setModalData({ ...modalData, modalVisible: false });
            }}
            bg={Col.Recipes}
          />
          {feed ? (
            feed.map(({ id, title, recipe }, index) => (
              <View key={`${index + title}`} style={styles.cardContainer}>
                <CreatedRecipeCard
                  addRecipe={handlerData}
                  recipeData={recipe}
                  id={id}
                  recipe={true}
                  title={title}
                  actionHandler={actionHandler}
                  image={`${AppBackend.getBaseUrl()}/${recipe.image}`}
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
