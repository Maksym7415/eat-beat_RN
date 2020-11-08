import React, { useState, useContext, useEffect, FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import server from "../../server";
import RecipeCard from "../../components/custom/RecipeCard";
import EditModal from "../../components/newEditModal";
import { Memo, NavProps, recipeSettings } from "../../components/interfaces";
import { Col, Spacing, Typ } from "../../components/Config";
import { AppContext } from "../../components/AppContext";
import SearchModal from "../../components/SearchModal";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import FilterModal from "../../components/FilterModal";
import { TouchableOpacity } from "react-native-gesture-handler";

type constNum = (value: recipeSettings) => number;

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
  const [filter, setFilter] = useState<recipeSettings | null>();
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
      //const data = await server.getRecipeByName(state, defaultConfig);
      console.log(defaultConfig);
      showModal(false);
      //setFeed(data);
      return;
    }
    const data = await server.getRecipeByName(state, filterConfig);
    showModal(false);
    setFeed(data);
  };

  const saveFilterConfig = ({ intolerances, diets,mealTypes }: recipeSettings) => {
    setFilterConfig({
      meals: mealTypes
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(" ,"),
      intolerances: intolerances
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(" ,"),
      diets: diets
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(""),
    });

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

  const constraintNumber: constNum = (filter) => {
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
    saveFilterConfig(data);
  };

  useEffect(() => {
    getFilter();
  }, []);

  return (
    <ScrollView>
      <View>
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
          data={filter}
          modalVisible={showFilterModal}
          saveFilterData={saveFilterConfig}
          hideModal={() => setShowFilterModal(false)}
          constaintNumber={constraintNumber(filter)}
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
