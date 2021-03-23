import React, { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, Alert, Text } from "react-native";
import { Col, Spacing, Typ } from "../../components/Config";
import RecipeCard from "../../components/custom/RecipeCard";
import {
  Fetching,
  Memo,
  NavProps,
  RecommendedMeals,
  AddMealsProps,
  ModalData,
} from "../../components/interfaces";
import { AppContext } from "../../components/AppContext";
import EditModal from "../../components/EditModal";
import { Button } from "../../components/MyComponents";
import { useIsFocused } from "@react-navigation/native";
import server from "../../server";




type AddMealsFun = (id: number, props: AddMealsProps) => void;
let DontRefresh = false;
const RecommendedScreen: FC<NavProps> = ({ navigation, page }) => {
  const { calendar, isFetching } = useContext<Memo>(AppContext);
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
  });
  const { date } = calendar;
  const [feed, setFeed] = useState<RecommendedMeals[] | null>();
  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    name: "",
    servings: 1,
    modalVisible: false,
    creationTime: new Date(date).getTime(),
    data: {},
  });

  const serveData = async () => {
    setFetching({ clicked: true, deactivate: true });
    const response = await server.popularSnacks();
    console.log(response)
    if (response.ok) {
      setFetching({ clicked: false, deactivate: false });
      return setFeed(response.data);
    }
    if (response?.status < 401)
      Alert.alert(`${response.status}`, `${response.data}`);
    

   setFetching({ clicked: true, deactivate: true });
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
    console.log('add snack')
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
      name
    } = item;
    const details = {
      image: image || 'https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/125:94/w_2393,h_1800,c_limit/meat-80049790.jpg',
      name,
      servings,
      nutrients: [...nutrition.nutrients],
      nutrition: {
        nutrients: [...nutrition.nutrients]
      },
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      veryPopular,
      price: item.price || '0'
    };
    navigation.navigate('previewSnack', {
        name,
        details: { page: 'snacks' },
        item: {meal: details, id: item.id}
      });
    DontRefresh = true;
  };

  const focus = useIsFocused();

  useEffect(() => {
    serveData()
  }, [])

  return feed?.length ? (
    <View style={styles.canvas}>
      <EditModal
        clicked={fetching.clicked}
        data={modalData}
        date={date}
        setData={(id, body) => addMeal(id, body)}
        hideModal={() => {
          if (fetching.clicked) return;
          setModalData({ ...modalData, modalVisible: false });
        }}
        bg={Col.Snacks}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {feed.map((item, index) => (
            <View key={`${index}`} style={styles.cardContainer}>
              <RecipeCard
                details={item}
                actionHandler={actionHandler}
                onPreview={() => onPreview(item)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  ) : (
    <>
    <View style={styles.noRecommendationContainer}>
        <Text style={styles.noRecommendationText}>
            Popular Snacks
        </Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: Col.Background,
  },
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
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: Spacing.r_small,
    backgroundColor: Col.Background,
  },
  button: {
    paddingHorizontal: Spacing.medium,
  },
  noRecommendationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  noRecommendationText: {
    fontWeight: '500',
    color: Col.Dark,
    fontSize: Typ.H3,
    lineHeight: Typ.H2,
  }
});

export default RecommendedScreen;
