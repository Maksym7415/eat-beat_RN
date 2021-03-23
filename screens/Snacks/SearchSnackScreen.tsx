import React, { useState, useContext, useEffect, FC } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import server from "../../server";
import RecipeCard from "../../components/custom/RecipeCard";
import EditModal from "../../components/EditModal";
import {
  Fetching,
  Memo,
  NavProps,
  recipeSettings,
  RecommendedMeals,
} from "../../components/interfaces";
import { Col, Spacing } from "../../components/Config";
import { AppContext } from "../../components/AppContext";
import SearchModal from "../../components/SearchModal";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import Text from "../../components/custom/Typography";
import { Button } from "../../components/MyComponents";


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

interface Feed {
  results: RecommendedMeals[];
  offset: number;
  totalResults: number;
}

const SearchSnackScreen: FC<NavProps> = ({ navigation, page }) => {
  const { isShow, showModal, calendar, isFetching } = useContext<Memo>(
    AppContext
  );
  const [state, setState] = useState<string>("");
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
    myFetching: false,
  });
  const [feed, setFeed] = useState<Feed | null | string>('Search the snacks');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    name: "",
    servings: 0.5,
    modalVisible: false,
    creationTime: 0,
    data: {},
  });

  const onChangeHandler = (text: string) => {
    setState(text);
  };

  const startSearch = async () => {
    console.log('start search')
    showModal(false, page);
    setFetching({ ...fetching, myFetching: true });

    setTimeout(() => {
      setFeed({
        results: [
          {
              id: 1,
              image: 'https://i.pinimg.com/originals/e5/a8/c3/e5a8c3b39aa8d0f5c8301f82d392b994.jpg',
              title: 'Apple',
              healthScore: 95,
              price: 10,
              vegetarian: true,
              vegan: true,
              glutenFree: true,
              dairyFree: false,
              veryPopular: true,
              nutrition: {
                nutrients: [{
                  "title": "Calories",
                  "amount": 505.2,
                  "unit": "cal",
                  "percentOfDailyNeeds": 25.26
                },
                {
                  "title": "Protein",
                  "amount": 250.2,
                  "unit": "prot",
                  "percentOfDailyNeeds": 25.26
                }]
              }
          },
          {
              id: 2,
              image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1280px-Orange-Fruit-Pieces.jpg',
              title: 'Orange',
              healthScore: 87,
              price: 8,
              vegetarian: true,
              vegan: true,
              glutenFree: false,
              dairyFree: false,
              veryPopular: true,
              nutrition: {
                nutrients: [{
                  "title": "Calories",
                  "amount": 505.2,
                  "unit": "cal",
                  "percentOfDailyNeeds": 25.26
                },
                {
                  "title": "Protein",
                  "amount": 250.2,
                  "unit": "prot",
                  "percentOfDailyNeeds": 25.26
                }]
              }
          }
      ]
      })
    setFetching({ ...fetching, myFetching: false });
    }, 500)
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
    console.log(id, modalData, 'add meal')
  };

  const showMore = async () => {
    console.log('show more')
  };

  const onPreview = async (item) => {
    const {
      image,
      servings,
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      veryPopular,
      nutrition,
      price,
      title,
    } = item;
    const details = {
      image: image ,
      name: title || name,
      servings,
      nutrients: [...nutrition.nutrients],
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      veryPopular,
      price
    };
    navigation.navigate('previewSnack', {
      title,
      details: { page: 'snacks' },
      item: details
    });
  };

  return (
    <View style={styles.canvas}>
      <EditModal
        data={modalData}
        date={calendar.date}
        setData={(id, body) => addMeal(id, body)}
        hideModal={() => setModalData({ ...modalData, modalVisible: false })}
        bg={Col.Snacks}
      />
      <SearchModal
        modalVisible={isShow[page]}
        hideModal={() => showModal(false, page)}
        onChangeHandler={onChangeHandler}
        value={state}
        searchHandler={startSearch}
        page={page}
      />
      <ScrollView>
        {!fetching.myFetching ? (
          typeof feed === "string" ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Text>{feed}</Text>
            </View>
          ) : (
            <>
              <View style={styles.container}>
                {feed.results?.map((item, index) => (
                  <View key={`${index}`} style={styles.cardContainer}>
                    <RecipeCard
                      details={item}
                      actionHandler={actionHandler}
                      notShowScore={true}
                      onPreview={() => onPreview(item)}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.btnContainer}>
                <Button
                  label="SHOW MORE"
                  onPress={showMore}
                  deactivate={
                    feed.totalResults === feed.results.length
                      ? true
                      : fetching.deactivate
                  }
                  clicked={fetching.clicked}
                  style={styles[`button${page}`]}
                />
              </View>
            </>
          )
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Col.Black} />
          </View>
        )}
      </ScrollView>
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
    flexWrap: "wrap",
    flexDirection: "row",
    padding: Spacing.r_small,
    marginTop: 25
  },
  cardContainer: {
    width: "50%",
  },
  constraint: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Spacing.r_small,
    backgroundColor: Col.White,
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
  buttonrecipes: {
    backgroundColor: Col.Recipes
  },
  buttonrestaurants: {
    backgroundColor: Col.Restaurants
  },
  buttonsnacks: {
    backgroundColor: Col.Snacks
  },
});
export default SearchSnackScreen;
