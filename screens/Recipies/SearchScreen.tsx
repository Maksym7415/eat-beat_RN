import React, { useState, useContext, useEffect, FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import server from "../../server";
import RecipeCard from "../../components/custom/RecipeCard";
import EditModal from "../../components/newEditModal";
import { Memo, NavProps, RecommendedMeals } from "../../components/interfaces";
import { Col, Spacing, Typ } from "../../components/Config";
import { AppContext } from "../../components/AppContext";
import SearchModal from "../../components/SearchModal";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import Chip from "../../components/custom/Chip";
import FilterModal from "../../components/FilterModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Console } from "console";

interface Props {
  recipe: string;
}

interface ModalData {
  id: number;
  name: string;
  servings: number;
  modalVisible: boolean;
  creationTime: number;
  data: object;
}

const SearchScreen: FC<NavProps> = ({ navigation }) => {
  const [state, setState] = useState<string>("");
  const [feed, setFeed] = useState<Array<object>>([]);
  const [filter, setFilter] = useState<object>({});
  const [filterConfig, setFilterConfig] = useState<object>({});

  const { isShow, showModal } = useContext<Memo>(AppContext);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    name: "",
    servings: 0.5,
    modalVisible: false,
    creationTime: 0,
    data: {},
  });

  const [radioState, setRadioState] = useState<Array<object>>([]);
  const [chipsState, setChipsState] = useState<Array<object>>([]);
  const [mealsTypes, setMealsTypes] = useState<Array<object>>([]);

  const onChangeHandler = (text: string) => {
    setState(text);
  };

  const startSearch = async () => {
    if (!Object.keys(filterConfig).length) {
      let defaultConfig = {
        intolerances: chipsState
          .filter((el) => el.isUsers)
          .map((el) => el.name.toLowerCase())
          .join(" ,"),
        diets: radioState
          .filter((el) => el.isUsers)
          .map((el) => el.name.toLowerCase())
          .join(""),
      };
      const data = await server.getRecipeByName(state, defaultConfig);
      showModal(false);
      setFeed(data);
      return;
    }
    const data = await server.getRecipeByName(state, filterConfig);
    showModal(false);
    setFeed(data);
  };

  const saveFilterConfig = ({ intolerances, diets, meals }) => {
    setFilterConfig({
      intolerances: chipsState
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(" ,"),
      diets: radioState
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(""),
    });
  };

  const actionHandler = (id, name, data) => {
    setModalData({
      id,
      name,
      data,
      servings: 0.5,
      modalVisible: true,
      creationTime: new Date(date).getTime(),
    });
  };

  const addMeal = async (id, { creationTime, servings }) => {
    await server.addCookedMeal({
      meal: modalData.data,
      quantity: servings,
      date: creationTime,
    });
    setModalData({ ...modalData, modalVisible: false });
    navigation.navigate("meals", { refresh: true });
  };

  const constraintNumber = (filter) => {
    if (!Object.keys(filter).length) return;
    let countConstraint = 0;
    Object.keys(filter).forEach((el) =>
      filter[el]?.forEach((constraint) =>
        constraint.isUsers === true ? (countConstraint += 1) : false
      )
    );
    return countConstraint;
  };

  const getFilter = async () => {
    const data = await server.getSearchFilter();
    setFilter(data);
  };

  useEffect(() => {
    getFilter();
  }, []);

  useEffect(() => {
    setRadioState(filter.diets);
    setMealsTypes(filter.mealTypes);
    setChipsState(filter.intolerances);
  }, [filter]);

  return (
    <ScrollView>
      <View>
        {/* <Header {...props} onChangeHandler={onChangeHandler} value={state} searchHandler = {startSearch}/> */}
        <EditModal
          data={modalData}
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
          modalVisible={showFilterModal}
          hideModal={() => setShowFilterModal(false)}
          data={filter}
          saveFilterData={saveFilterConfig}
          constaintNumber={constraintNumber(filter)}
          radioState={radioState}
          setRadioState={setRadioState}
          chipsState={chipsState}
          setChipsState={setChipsState}
          mealsTypes={mealsTypes}
          setMealsTypes={setMealsTypes}
        />
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <View style={styles.constraint}>
            <Text style={{ color: "#6E7882", fontSize: Typ.Normal }}>
              Constraint({constraintNumber(filter)})
            </Text>
            <Icon name="keyboard-arrow-right" size={22} color="#6E7882" />
          </View>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.container}>
            {feed.map((item, index) => (
              <View key={`${index}`} style={styles.cardContainer}>
                <RecipeCard details={item} actionHandler={actionHandler} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.r_small,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 100,
  },
  cardContainer: {
    width: "50%",
  },
  constraint: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Spacing.r_small,
    backgroundColor: Col.White,
  },
});
