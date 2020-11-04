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

  const onChangeHandler = (text: string) => {
    console.log(text);
    setState(text);
  };

  const startSearch = async () => {
    console.log(filterConfig);
    const data = await server.getRecipeByName(state, filterConfig);
    showModal(false);
    setFeed(data);
  };

  const saveFilterConfig = (config) => {
    setFilterConfig(config);
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
    // console.log(!Object.keys(filter).length)
    if (!Object.keys(filter).length) return;
    let countConstraint = 0;
    Object.keys(filter).forEach((el) =>
      filter[el]?.forEach((constraint) =>
        constraint.isUsers === true ? (countConstraint += 1) : false
      )
    );
    return countConstraint;
  };

  useEffect(() => {
    const getSearchFilter = async () => {
      const data = await server.getSearchFilter();
      setFilter(data);
    };
    getSearchFilter();
  }, []);

  return (
    <View>
      <Header
        {...props}
        onChangeHandler={onChangeHandler}
        value={state}
        searchHandler={startSearch}
      />
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
      />
      <View style={styles.constraint}>
        <Text style={{ color: "#6E7882", fontSize: Typ.Normal }}>
          Constraint({constraintNumber(filter)})
        </Text>
        <Icon
          onPress={() => setShowFilterModal(true)}
          name="keyboard-arrow-right"
          size={22}
          color="#6E7882"
        />
      </View>
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
