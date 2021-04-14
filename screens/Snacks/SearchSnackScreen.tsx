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
    const result  = await server.snackSearch(state);
    if(result.ok) {
      setFeed({
        ...feed,
        results: result.data.results,
        offset: result.data.offset,
        totalResults: result.data.totalResults,
      });  
    }
    setFetching({ ...fetching, myFetching: false });
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
    const result = await server.addSnacks({meal: modalData.data, quantity: servings, date: creationTime});
    if(result.ok) {
      setFetching({ clicked: false, deactivate: false });
      setModalData({ ...modalData, modalVisible: false });
      navigation.navigate("meals");
      return isFetching();
    }
    setFetching({ clicked: false, deactivate: false });
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
      name,
      standartUnit
    } = item;
    const details = {
      image: image ,
      name,
      servings,
      nutrients: [...nutrition.nutrients],
      nutrition: {
        nutrients: [...nutrition.nutrients]
      },
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      veryPopular,
      standartUnit,
      price: price || '0'
    };
    navigation.navigate('previewSnack', {
      name,
      details: { page: 'snacks' },
      item: {meal: details, id: item.id}
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
                      page={'snacks'}
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
