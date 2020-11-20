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
import EditModal from "../../components/newEditModal";
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
import FilterModal from "../../components/FilterModal";
import Text from "../../components/custom/Typography";
import { Button } from "../../components/MyComponents";
import { useIsFocused } from "@react-navigation/native";

type constNum = () => number;

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

const SearchScreen: FC<NavProps> = ({ navigation }) => {
  const { isShow, showModal, calendar, isFetching } = useContext<Memo>(
    AppContext
  );
  const [state, setState] = useState<string>("");
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
    myFetching: false,
  });
  const [feed, setFeed] = useState<Feed | null | string>("Search the meals");
  const [filter, setFilter] = useState<recipeSettings>({
    intolerances: [],
    diets: [],
    mealTypes: [],
  });
  const [filterConfig, setFilterConfig] = useState({
    intolerances: "",
    diets: "",
    mealTypes: "",
  });
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
    let config = "";
    if (filterConfig.intolerances.length)
      config += `&intolerances=${filterConfig.intolerances}`;
    if (filterConfig.diets.length) config += `&diet=${filterConfig.diets}`;
    if (filterConfig.mealTypes.length)
      config += `&type=${filterConfig.mealTypes}`;
    showModal(false);
    setFetching({ ...fetching, myFetching: true });
    const response = await server.getRecipeByName(state, config, 0);
    if (response.ok) {
      if (!response.data.results.length) {
        setFetching({ ...fetching, myFetching: false });
        return setFeed("We couldn’t find any meals");
      }
      setFeed({
        ...feed,
        results: response.data.results,
        offset: response.data.offset,
        totalResults: response.data.totalResults,
      });
    }
    setFetching({ ...fetching, myFetching: false });
  };

  const saveFilterConfig = ({
    intolerances,
    diets,
    mealTypes,
  }: recipeSettings) => {
    setFilterConfig({
      mealTypes: mealTypes
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(", "),
      intolerances: intolerances
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(", "),
      diets: diets
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(),
    });
    setFilter({
      intolerances,
      diets,
      mealTypes,
    });
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
    await server.addCookedMeal({
      meal: modalData.data,
      quantity: servings,
      date: creationTime,
    });
    setModalData({ ...modalData, modalVisible: false });
    navigation.navigate("meals");
    isFetching();
  };

  const constraintNumber: constNum = () => {
    let countConstraint = 0;
    Object.keys(filter).forEach((el) =>
      filter[el]?.forEach((constraint) => {
        if (constraint.isUsers) {
          countConstraint++;
        }
      })
    );
    return countConstraint;
  };

  const getFilter = async () => {
    const response = await server.getSearchFilter();
    if (response.ok) {
      setFilter(response.data);
      saveFilterConfig(response.data);
    }
  };

  const showMore = async () => {
    if (feed.totalResults === feed.results.length) return;
    setFetching({ ...fetching, clicked: true, deactivate: true });
    let config = "";
    if (filterConfig.intolerances.length)
      config += `&intolerances=${filterConfig.intolerances}`;
    if (filterConfig.diets.length) config += `&diet=${filterConfig.diets}`;
    if (filterConfig.mealTypes.length)
      config += `&type=${filterConfig.mealTypes}`;
    showModal(false);
    const response = await server.getRecipeByName(
      state,
      config,
      feed.offset + 10
    );
    if (response.ok) {
      if (!response.data.results.length) {
        setFetching({ ...fetching, myFetching: false });
        return setFeed("We couldn’t find any meals");
      }
      setFeed({
        ...feed,
        results: [...feed.results, ...response.data.results],
        offset: response.data.offset,
      });
    }
    setFetching({ ...fetching, clicked: false, deactivate: false });
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
      analyzedInstructions,
    } = data;
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
      ingredients: [...nutrition.ingredients],
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
  };

  useEffect(() => {
    getFilter();
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) getFilter();
  }, [isFocused]);

  return (
    <View style={styles.canvas}>
      <EditModal
        data={modalData}
        date={calendar.date}
        setData={(id, body) => addMeal(id, body)}
        hideModal={() => setModalData({ ...modalData, modalVisible: false })}
      />
      <SearchModal
        modalVisible={isShow}
        hideModal={() => showModal(false)}
        onChangeHandler={onChangeHandler}
        value={state}
        searchHandler={startSearch}
      />
      <FilterModal
        data={filter}
        modalVisible={showFilterModal}
        saveFilterData={saveFilterConfig}
        hideModal={() => setShowFilterModal(false)}
        constaintNumber={constraintNumber()}
        fetching={fetching}
      />
      <TouchableOpacity onPress={() => setShowFilterModal(true)}>
        <View style={styles.constraint}>
          <Text>Filters({constraintNumber()})</Text>
          <Icon name="keyboard-arrow-right" size={22} color={Col.Ghost} />
        </View>
      </TouchableOpacity>
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
                <View style={styles.button}>
                  <Button
                    label="SHOW MORE"
                    onPress={showMore}
                    deactivate={
                      feed.totalResults === feed.results.length
                        ? true
                        : fetching.deactivate
                    }
                    clicked={fetching.clicked}
                    style={{ backgroundColor: Col.Recipes }}
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
  button: {
    paddingHorizontal: Spacing.medium,
  },
});
export default SearchScreen;
