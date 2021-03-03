import React, { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, Alert, Text } from "react-native";
import { Col, Spacing, Typ } from "../../components/Config";
import RecipeCard from "./RecipeCard";
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
import { resolve } from "path";

interface Navigation {
    title: string
    page: string
}

interface RecommendedScreens {
    [key:string]: {
        get: Function
        add: Function
        preview: Function
        navigation: Array<Navigation>
        color: string
    }
}

const restrauntsPreview = (id, item) => new Promise((resolve) => resolve(item));
            
    


const recommendedScreens: RecommendedScreens = {
    'recipes': {
        get: server.getRecommendedMeals,
        add: server.addCookedMeal,
        preview: server.getPreview,
        navigation: [{
            title: 'previewRecommendedPage',
            page: 'recipes'
        }],
        color: Col.Recipes

    },
    'restaurants': {
        get: server.getRecommendedRestaurant,
        add: server.addRestaurantsMeal,
        preview: restrauntsPreview,
        navigation: [{
            title: 'previewRecommendedPage',
            page: 'restaurant'
        }],
        color: Col.Restaurants

    }
}

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
const RecommendedScreen: FC<NavProps> = ({ navigation, route, restaurants, title, ...other }) => {
  const { calendar, isFetching } = useContext<Memo>(AppContext);
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
  });
  const { date } = calendar;
  const [feed, setFeed] = useState<RecommendedMeals[] | null>(null);
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
    const response = await recommendedScreens[title].get(date);
    if (response.ok) {
      setFetching({ clicked: false, deactivate: false });
      return setFeed(response.data);
    }
    if (response?.status < 401)
      Alert.alert(`${response.status}`, `${response.data}`);
    

   setFetching({ clicked: true, deactivate: true });
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
    await recommendedScreens[title].add({
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
    const data = await recommendedScreens[title].preview(item.id, item);
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
      analyzedInstructions,
      price,
      description
    } = item;
    let ing = "";
    if(title === 'recipes') {
        analyzedInstructions.forEach((el) => {
            el.steps.forEach((ele) => {
              ing += "\n\n" + ele.step;
            });
        });
    }
    const details = {
      image: image || 'https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/125:94/w_2393,h_1800,c_limit/meat-80049790.jpg',
      name: item.title,
      servings,
      nutrients: title === 'recipes' ? [...nutrition.nutrients] : Object.keys(item.nutritions).map((el) => ({amount: item.nutritions[el], title: el})),
      ingredients: title === 'recipes' ? data.code
        ? [...nutrition.ingredients]
        : [...data.nutrition.ingredients] : null,
      instructions: ing || description,
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      veryPopular,
      price
    };
    navigation.navigate(recommendedScreens[title].navigation[0].title, {
      title: item.title,
      details: {...details, page: recommendedScreens[title].navigation[0].page},
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

  return feed?.length ? (
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
    <>
    <View style={styles.noRecommendationContainer}>
        <Text style={styles.noRecommendationText}>
            No recommendations
        </Text>
    </View>
        <View style={styles.btnContainer}>
        <Button
            label="GET RECOMMENDATION"
            onPress={serveData}
            deactivate={fetching.deactivate}
            clicked={fetching.clicked}
            style={{ backgroundColor: recommendedScreens[title].color }}
        />
        </View>
    </>
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
  noRecommendationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  noRecommendationText: {
    fontWeight: '500',
    color: Col.Dark,
    fontSize: Typ.H3,
    lineHeight: Typ.H2,
  }
});

export default RecommendedScreen;
