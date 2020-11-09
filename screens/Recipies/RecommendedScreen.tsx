import React, { FC, useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Col, Spacing } from "../../components/Config";
import RecipeCard from "../../components/custom/RecipeCard";
import { Memo, NavProps, RecommendedMeals } from "../../components/interfaces";
import server from "../../server";
import { AppContext } from "../../components/AppContext";
import EditModal from "../../components/newEditModal";
import { useFocusEffect } from "@react-navigation/native";
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

const RecommendedScreen: FC<NavProps> = ({ navigation, route }) => {
  const { calendar, isFetching } = useContext<Memo>(AppContext);
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
  };
  const actionHandler = (id: string, name: string, data: object) => {
    setModalData({
      id: Number(id),
      name,
      data,
      servings: 0.5,
      modalVisible: true,
      creationTime: new Date(date).getTime(),
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
  return feed.length ? (
    <View style={{ flex: 1, backgroundColor: Col.Background }}>
      <EditModal
        data={modalData}
        setData={(id, body) => addMeal(id, body)}
        hideModal={() => setModalData({ ...modalData, modalVisible: false })}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {feed.map((item, index) => (
            <View key={`${index}`} style={styles.cardContainer}>
              <RecipeCard details={item} actionHandler={actionHandler} />
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button
          label="SHOW MORE"
          onPress={() => console.log("show more")}
          style={{ backgroundColor: Col.Recipes }}
        />
      </View>
    </View>
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Col.Black} />
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

export default RecommendedScreen;
