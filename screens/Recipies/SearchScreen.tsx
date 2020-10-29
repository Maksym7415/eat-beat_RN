import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import server from "../../server";
import RecipeCard from "../../components/custom/RecipeCard";
import EditModal from "../../components/EditModal";
import { Memo, RecommendedMeals } from "../../components/interfaces";
import { Spacing } from "../../components/Config";
import { AppContext } from "../../components/AppContext";
import SearchModal from "../../components/SearchModal";

interface Props {
  recipe: string;
}

interface ModalData {
  id: string;
  name: string;
  time: string;
  servings: string;
  modalVisible: boolean;
  creationTime: number;
  data: object;
}

const SearchScreen = (props) => {
  const [state, setState] = useState<string>("");
  const [feed, setFeed] = useState<Array<object>>([]);
  const { isShow, showModal } = useContext<Memo>(AppContext);
  const [modalData, setModalData] = useState<ModalData>({
    id: "",
    name: "",
    time: "",
    servings: "",
    modalVisible: false,
    creationTime: 0,
    data: {},
  });

  const onChangeHandler = (text: string) => {
    console.log(text);
    setState(text);
  };

  const startSearch = async () => {
    const data = await server.getRecipeByName(state, [""]);
    showModal(false);
    setFeed(data);
  };

  const actionHandler = async (props: RecommendedMeals) => {
    const { actionHandler, ...data } = props;
    setModalData({
      id: props.title,
      name: props.title,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      servings: "0.5",
      modalVisible: true,
      creationTime: new Date().getTime(),
      data,
    });
    //serveData()
  };

  const addMeal = async (
    creationTime: number,
    time: object,
    amount: string,
    hideModal: (a: boolean) => boolean,
    id: number
  ) => {
    const t = `${new Date(creationTime).getMonth() + 1}/${new Date(
      creationTime
    ).getDate()}/${new Date(creationTime).getFullYear()} ${time.hour.value}:${
      time.minutes.value
    }`;
    await server.addCookedMeal({
      meal: modalData.data,
      quantity: +amount.replace(/[,-]/g, "."),
      date: new Date(t).getTime(),
    });
    hideModal(false);
    props.navigation.navigate("meals");
  };

  return (
    <View>
      {/* <Header {...props} onChangeHandler={onChangeHandler} value={state} searchHandler = {startSearch}/> */}
      <EditModal {...modalData} setModalData={setModalData} cb={addMeal} />
      <SearchModal
        modalVisible={isShow}
        hideModal={() => showModal(false)}
        onChangeHandler={onChangeHandler}
        value={state}
        searchHandler={startSearch}
      />
      <ScrollView>
        <View style={styles.container}>
          {feed.map((item, index) => (
            <View key={`${index}`} style={styles.cardContainer}>
              <RecipeCard {...item} actionHandler={actionHandler} />
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
});
