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
  const [feed, setFeed] = useState<RecommendedMeals[] | null>(null);
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
    setFeed(null);
    showModal(false);
    setFetching({ ...fetching, myFetching: true });
    const response = await server.getRecipeByName(state, config);
    if (response.ok) setFeed(response.data);
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
  };

  const actionHandler = (id: string, name: string, data: object) => {
    setModalData({
      id: Number(id),
      name,
      data,
      servings: 1,
      modalVisible: true,
      creationTime: new Date(calendar.date).getTime(),
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
          <Text>Constraint({constraintNumber()})</Text>
          <Icon name="keyboard-arrow-right" size={22} color={Col.Ghost} />
        </View>
      </TouchableOpacity>
      <ScrollView>
        {!fetching.myFetching ? (
          <View style={styles.container}>
            {feed?.map((item, index) => (
              <View key={`${index}`} style={styles.cardContainer}>
                <RecipeCard details={item} actionHandler={actionHandler} />
              </View>
            ))}
          </View>
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
});
export default SearchScreen;
