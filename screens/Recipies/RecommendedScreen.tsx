import React, { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { Spacing } from "../../components/Config";
import RecipeCard from "../../components/custom/RecipeCard";
import { Memo, RecommendedMeals } from "../../components/interfaces";
import server from "../../server";
import { AppContext } from "../../components/AppContext";
import EditModal from "../../components/EditModal";

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

const RecommendedScreen: FC<Props> = (props) => {
  const [feed, setFeed] = useState<Array<RecommendedMeals>>([]);
  const [modalData, setModalData] = useState<ModalData>({
    id: "",
    name: "",
    time: "",
    servings: "",
    modalVisible: false,
    creationTime: 0,
    data: {},
  });
  const { calendar } = useContext<Memo>(AppContext);
  const { date } = calendar;

  const serveData = async () => {
    const response = await server.getRecommendedMeals(date);
    response.ok
      ? setFeed(response.data)
      : Alert.alert(
          response.status?.toString(),
          `${response.problem}\n${JSON.stringify(response.config)}`
        );
    console.log("getRecommendedMeals => request: ", response.ok);
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
    console.log(1234);
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
    props.navigation.navigate("meals", { refresh: true });
  };

  // useEffect(() => {
  //   if (modalData.modalVisible || modalData.cancel) return;
  //   //serveData();
  // }, [modalData.modalVisible]);

  useEffect(() => {
    let focus = props.navigation.addListener("focus", () => {
      serveData();
    });
    serveData();
    () => {
      focus = null;
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <EditModal {...modalData} setModalData={setModalData} cb={addMeal} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.r_small,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardContainer: {
    width: "50%",
  },
});

export default RecommendedScreen;
