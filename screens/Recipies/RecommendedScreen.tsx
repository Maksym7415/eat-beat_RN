import React, { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { Col, Spacing } from "../../components/Config";
import RecipeCard from "../../components/custom/RecipeCard";
import baseURL from '../../url';
import {
  Fetching,
  Memo,
  NavProps,
  RecommendedMeals,
} from "../../components/interfaces";
import server from "../../server";
import { AppContext } from "../../components/AppContext";
import EditModal from "../../components/newEditModal";
import { Button } from "../../components/MyComponents";
import { useIsFocused } from "@react-navigation/native";
import Axios from "axios";

interface ModalData {
  id: number;
  name: string;
  servings: number;
  modalVisible: boolean;
  creationTime: number;
  data: object;
}

interface AddMealsProps {
  creationTime: number;
  servings: number;
}

type AddMealsFun = (id: number, props: AddMealsProps) => void;
let DontRefresh = false;
const RecommendedScreen: FC<NavProps> = ({ navigation, route, ...other }) => {
  const { calendar, isFetching } = useContext<Memo>(AppContext);
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
  });
  const { date } = calendar;
  const [feed, setFeed] = useState<RecommendedMeals[]>([]);
  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    name: "",
    servings: 1,
    modalVisible: false,
    creationTime: new Date(date).getTime(),
    data: {},
  });

  const serveData = async () => {
    setFetching({ clicked: true, deactivate: true });
    const response = await server.getRecommendedMeals(date);
    if (response.ok) {
      setFetching({ clicked: false, deactivate: false });
      return setFeed(response.data);
    }
    if (response?.status < 401) Alert.alert(`${response.status}`, `${response.data}`);

  };
  const actionHandler = (id: string, name: string, data: object) => {
    setModalData({
      id: Number(id),
      name,
      data,
      servings: 1,
      modalVisible: true,
      creationTime: new Date().getTime(),
    });
  };

  const addMeal: AddMealsFun = async (id, { creationTime, servings }) => {
    setFetching({ clicked: true, deactivate: true });
    await server.addCookedMeal({
      mealId: modalData.data.id,
      quantity: servings,
      date: creationTime,
    });
    setFetching({ clicked: false, deactivate: false });
    setModalData({ ...modalData, modalVisible: false });
    navigation.navigate("meals");
    isFetching();
  };

  const onPreview = async (item) => {
    const title = item.title;
    const data = await server.getPreview(item.id);
    if (data.code) return;
    const {
      image,
      servings,
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      veryPopular,
      nutrition,
      analyzedInstructions
    } = item;
    let ing = "";
    analyzedInstructions.forEach((el) => {
      el.steps.forEach((ele) => {
        ing += "\n" + ele.step;
      });
    });
    const details = {
      image,
      name: modalData.name,
      servings,
      nutrients: [...nutrition.nutrients],
      ingredients: data.code ? [...nutrition.ingredients] : [...data.nutrition.ingredients],
      instructions: ing,
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      veryPopular,
    };
    navigation.navigate("previewRecommendedPage", {
      title,
      details,
    });
    DontRefresh = true;
  };

  const focus = useIsFocused();
  useEffect(() => {
    if (!focus) {
      setModalData({ ...modalData, modalVisible: false });
      DontRefresh ? (DontRefresh = false) : setFeed([]);
    }
  }, [focus]);

  return feed.length ? (
    <View style={styles.canvas}>
      <EditModal
        clicked={fetching.clicked}
        data={modalData}
        date={date}
        setData={(id, body) => addMeal(id, body)}
        hideModal={() => {
          if (fetching.clicked) return;
          setModalData({ ...modalData, modalVisible: false });
        }}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {feed.map((item, index) => (
            <View key={`${index}`} style={styles.cardContainer}>
              <RecipeCard
                details={item}
                actionHandler={actionHandler}
                onPreview={() => onPreview(item)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {/* <View style={styles.button}>
        <Button
          label="SHOW MORE"
          onPress={() => console.log("show more")}
          style={{ backgroundColor: Col.Recipes }}
        />
      </View> */}
    </View>
  ) : (
      <View style={styles.btnContainer}>
        <Button
          label="GET RECOMMENDATION"
          onPress={serveData}
          deactivate={fetching.deactivate}
          clicked={fetching.clicked}
          style={{ backgroundColor: Col.Recipes }}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: Col.Background,
  },
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
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: Spacing.r_small,
    backgroundColor: Col.Background,
  },
  button: {
    paddingHorizontal: Spacing.medium,
  },
});

export default RecommendedScreen;
