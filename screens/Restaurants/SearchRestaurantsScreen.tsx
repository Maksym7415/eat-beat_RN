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

const disabledItem = ['Side dish','Bread', 'Beverage', 'Fingerfood', 'Sauce', 'Marinade', 'Snack']


const SearchRestaurantScreen: FC<NavProps> = ({ navigation, page }) => {
  const { isShow, showModal, calendar, isFetching } = useContext<Memo>(
    AppContext
  );
  const [state, setState] = useState<string>("");
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
    myFetching: false,
  });
  const [feed, setFeed] = useState<Feed | null | string>('Search the restaurant meals');
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
  const [copyServerResponse, setCopyServerResponse] = useState({
    intolerances: [],
    diets: [],
    mealTypes: [],
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
      config += `&mealType=${filterConfig.mealTypes}`;
    showModal(false, page);
    setFetching({ ...fetching, myFetching: true });
    const response = await server.restaurantSearch(state, config, 0);
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
    setFetching((f) => ({ ...f, clicked: true, deactivate: true }));
    setTimeout(() => {
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
      setFetching((f) => ({ ...f, clicked: false, deactivate: false }));
      setShowFilterModal(false);
    }, 500);
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
    const data = {
      meal: { ...modalData.data, title: modalData.data.name },
      quantity: servings,
      date: creationTime,
    }
    const result = await server.addRestaurantsMeal(data);
    if(!result.ok) return;
    setModalData({ ...modalData, modalVisible: false });
    navigation.navigate("meals");
    isFetching();
  };

  const constraintNumber: constNum = () => {
    let countConstraint = 0;
    Object.keys(filter).forEach((el) =>
      filter[el]?.forEach((constraint) => {
        if (constraint.isUsers && !constraint.disabled) {
          countConstraint++;
        }
      })
    );
    return countConstraint;
  };

  const getPreferences = (data) => {
    const filterObject = {}
    filterObject.intolerances = data.intolerances.map((el) =>  {
        if(el.name === 'Dairy' || el.name === 'Gluten') {
            return {
                ...el,
                disabled: false
            }
        }
        return {
            ...el,
            disabled: true
        }
    });
    filterObject.diets = data.diets.map((el) => ({...el, disabled: false}));
    filterObject.mealTypes = data.mealTypes.map((el) => {
        if(disabledItem.includes(el.name)) {
            return {
                ...el,
                disabled: true
            }
        }
        return {
            ...el,
            disabled: false
        }
    })
    return filterObject
  }

  const getFilter = async () => {
    const response = await server.getSearchFilter();
    if (response.ok ) {
      let result = false;
      const [diets, intolerances, mealTypes] = Object.values(response.data);
      const [copyDiets, copyIntolerances, copyMealTypes] = Object.values(copyServerResponse);
      const copyElements = [...copyDiets, ...copyIntolerances, ...copyMealTypes];
      setCopyServerResponse(response.data)
      if(copyElements.length) {
        result = [...diets, ...intolerances, ...mealTypes].map((el, i) => el.isUsers === copyElements[i].isUsers).every((v) => v);
      }

      if(result) {
        setFilter(() => getPreferences(filter));
        saveFilterConfig(getPreferences(filter));
        
      } else {
        setFilter(() => getPreferences(response.data));
        saveFilterConfig(getPreferences(response.data));
      }   
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
      config += `&mealType=${filterConfig.mealTypes}`;
    showModal(false, page);
    const response = await server.restaurantSearch(
      state,
      config,
      Number(feed.offset) + 10
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
      description,
      title,
      name,
      restName,
      is_partner
    } = item;
      const details = {
        image: image ,
        name: title || name,
        servings,
        nutrients: [...nutrition.nutrients],
        ingredients:  null,
        instructions: description, 
        vegetarian,
        vegan,
        glutenFree,
        dairyFree,
        veryPopular,
        price,
        restName,
        is_partner
      };
      navigation.navigate('previewRestaurantScreen', {
        title,
        details: { ...details, page: 'restaurants' },
        item: {meal: {...details, title: details.name, nutrition: {nutrients: nutrition.nutrients}}}
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
        bg={Col.Restaurants}
      />
      <SearchModal
        modalVisible={isShow[page]}
        hideModal={() => showModal(false, page)}
        onChangeHandler={onChangeHandler}
        value={state}
        searchHandler={startSearch}
        page={page}
      />
      <FilterModal
        data={filter}
        modalVisible={showFilterModal}
        saveFilterData={saveFilterConfig}
        hideModal={() => setShowFilterModal(false)}
        constaintNumber={constraintNumber()}
        fetching={fetching}
        page={page}
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
                      page='restaurant'
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
                    feed.totalResults == feed.results.length
                      ? true
                      : fetching.deactivate
                  }
                  clicked={fetching.clicked}
                  style={styles.buttonrestaurants}
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
});
export default SearchRestaurantScreen;
