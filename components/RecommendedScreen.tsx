import React, { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, Alert, Text } from "react-native";
import { Col, Spacing, Typ } from "./Config";
import RecipeCard from "./custom/RecipeCard";
import {
  Fetching,
  Memo,
  NavProps,
  RecommendedMeals,
} from "./interfaces";
import { AppContext } from "./AppContext";
import EditModal from "./EditModal";
import { Button } from "./MyComponents";
import { useIsFocused } from "@react-navigation/native";
import { pageSettings } from '../screens/config';
import { ModalData, AddMealsProps } from './interfaces'




type AddMealsFun = (id: number, props: AddMealsProps) => void;
let DontRefresh = false;
const RecommendedScreen: FC<NavProps> = ({ navigation, page }) => {
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
    const response = await pageSettings[page].get(date);
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
    const data = {
      recipes: {
        mealId: modalData.data.id,
        quantity: servings,
        date: creationTime,
      },
      restaurants: {
        meal: {...modalData.data, title: modalData.data.name}, 
        quantity: servings, 
        date: creationTime
      }
    }
    await pageSettings[page].add(data[page]);
    setFetching({ clicked: false, deactivate: false });
    setModalData({ ...modalData, modalVisible: false });
    navigation.navigate("meals");
    isFetching();
  };

  const onPreview = async (item) => {
    const data = await pageSettings[page].preview(item.id, item);
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
      description,
      title
    } = item;
    let ing = "";
    if(page === 'recipes') {
        analyzedInstructions.forEach((el:any) => {
            el.steps.forEach((elm:any) => {
              ing += "\n\n" + elm.step;
            });
        });
    }
    const details = {
      image: image || 'https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/125:94/w_2393,h_1800,c_limit/meat-80049790.jpg',
      name: title,
      servings,
      nutrients: [...nutrition.nutrients],
      nutrition: {
        nutrients: [...nutrition.nutrients]
      },
      ingredients: page === 'recipes' ? data.code
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
    navigation.navigate(pageSettings[page].navigation[0].title, {
      title: item.title,
      details: {...details, page: pageSettings[page].navigation[0].page},
      item: {meal: details, id: item.id}
    });
    DontRefresh = true;
  };

  const focus = useIsFocused();

  useEffect(() => {
    if (!focus) {
      setModalData({ ...modalData, modalVisible: false });
      DontRefresh ? (DontRefresh = false) : setFeed([]);
    }
    if(page === 'snacks') {
      pageSettings[page].get().then((res) => setFeed(res))

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
        bg={pageSettings[page].bg}
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
    </View>
  ) : (
    <>
    <View style={styles.noRecommendationContainer}>
        <Text style={styles.noRecommendationText}>
            {pageSettings[page].recommendText}
        </Text>
    </View>
        <View style={styles.btnContainer}>
        <Button
            label="GET RECOMMENDATION"
            onPress={serveData}
            deactivate={fetching.deactivate}
            isShow={pageSettings[page].isShowGetRecommendBtn}
            clicked={fetching.clicked}
            style={{ backgroundColor: pageSettings[page].bg }}
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
