import React, { FC, useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { Col, Spacing } from "../../components/Config";
import RecipeCard from "../../components/custom/RecipeCard";
import { Memo, NavProps, RecommendedMeals } from "../../components/interfaces";
import server from "../../server";
import { AppContext } from "../../components/AppContext";
import EditModal from "../../components/newEditModal";
import { useFocusEffect } from "@react-navigation/native";

interface ModalData {
  id: number;
  name: string;
  servings: number;
  modalVisible: boolean;
  creationTime: number;
  data: object;
}

const RecommendedScreen: FC<NavProps> = ({ navigation, route }) => {
  const { calendar } = useContext<Memo>(AppContext);
  const { date } = calendar;
  const [feed, setFeed] = useState<RecommendedMeals[]>([]);
  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    name: "",
    servings: 0.5,
    modalVisible: false,
    creationTime: new Date(date).getTime(),
    data: {},
  });

  const serveData = async () => {
    const response = await server.getRecommendedMeals(date);
    response.ok
      ? setFeed(response.data)
      : Alert.alert(`${response.status}`, `${response.data}`);
    console.log("getRecommendedMeals => request: ", response.ok);
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

  useEffect(() => {
    serveData();
  }, [calendar]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.refresh) {
        navigation.setParams({ refresh: false });
        serveData();
      }
    }, [route.params])
  );
  return (
    <View style={{ flex: 1, backgroundColor: Col.Background }}>
      <EditModal
        data={modalData}
        setData={(id, body) => addMeal(id, body)}
        hideModal={() => setModalData({ ...modalData, modalVisible: false })}
      />
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
