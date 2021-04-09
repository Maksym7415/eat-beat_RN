import React, { FC, useEffect, useState, useContext } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { NavProps } from "../../components/interfaces";
import { Divider } from "../../components/MyComponents";
import Nutrient from "../../components/Nutrient";
import { Col, Spacing } from "../../components/Config";
import NutritionItem from "../../components/Nutrition";
import LayoutScroll from "../../components/custom/LayoutScroll";
import Text from "../../components/custom/Typography";
import SvgMaker from "../../components/SvgMaker";
import { useIsFocused } from "@react-navigation/native";
import { Button } from "../../components/MyComponents";
import { pageSettings } from '../config'
import EditModal from '../../components/EditModal';
import { AppContext } from "../../components/AppContext";
import {
  Fetching,
  Memo,
} from "../../components/interfaces";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import AppBackend from '../../components/BackendSwitcher/store'


interface ModalData {
  id: number;
  name: string;
  servings: number;
  modalVisible: boolean;
  creationTime: number;
  data: object;
}

const empty = {
  image: "",
  name: "",
  servings: 0,
  recipeServings: 0,
  nutrients: [],
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  dairyFree: false,
  veryPopular: false,
};
const PreviewInfo: FC<NavProps> = ({ navigation, route, page, routeFrom, item, title }) => {
  let displayAddToMealsButton = true
  if (routeFrom && routeFrom === 'mealsScreen') {
    displayAddToMealsButton = false
  }
  if (item && item.from && item.from === 'mealsScreen') {
    displayAddToMealsButton = false
  }
  const { calendar, isFetching } = useContext<Memo>(AppContext);
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
  });
  const { date } = calendar;
  const [modalData, setModalData] = useState<ModalData>({
      id: 0,
      name: "",
      servings: 1,
      modalVisible: false,
      creationTime: new Date(date).getTime(),
    });
  const spoonacularUrl = 'https://spoonacular.com/cdn/ingredients_100x100/'
  const [feed, setFeed] = useState({ ...empty });
  const {
    image,
    name,
    servings,
    recipeServings,
    nutrients,
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    veryPopular,
    price,
  } = feed;
  const previewSettings = {
    'recipes': {
      name: "Number of servings",
      currentValue: (recipeServings || servings)
    },
    'snacks': {
      name: "Standart unit",
      currentValue: item.meal.standartUnit || item.meal.unit
    }
  }
  const getImage = (
    vegetarian: boolean,
    vegan: boolean,
    glutenFree: boolean,
    dairyFree: boolean,
    veryPopular: boolean
  ): string[] => {
    const iconsArray = [];
    if (vegetarian) iconsArray.push("vegetarian");
    if (vegan) iconsArray.push("vegan");
    if (glutenFree) iconsArray.push("glutenFree");
    if (dairyFree) iconsArray.push("dairyFree");
    if (veryPopular) iconsArray.push("popular");
    return iconsArray;
  };
  const mnarr = ["Calories", "Protein", "Total Fat", "Carbs"];
  const mainNutrients = nutrients
    ? nutrients.filter((el) => mnarr.includes(el.title))
    : [];

  const focus = useIsFocused();

  const addMeal = async (id, { servings, creationTime }) => {
    const pageData = {
      recipes: {
        date: creationTime,
        quantity: servings,
        mealId: id
      },
      restaurants: {
        date: creationTime,
        quantity: servings,
        meal: {...modalData.meal, title: modalData.meal.name},
      },
      snacks: {
        date: creationTime,
        quantity: servings,
        meal: {...modalData.meal, title: modalData.meal.name},
      }
    }
    const result = await pageSettings[page].add(pageData[page]);
    if(result.ok) {
      setModalData({ ...modalData, modalVisible: false });
      navigation.navigate('meals');

    }
  }

  const modalAction = (data: object) => {
    setModalData({
        ...modalData,
        id: data.id,
        name: data.meal.name,
        meal: data.meal,
        modalVisible: true,
        creationTime: new Date().getTime(),
    });
  }
  useEffect(() => {
    if (focus) {
      setFeed(item.meal)
    }
  }, [focus]);

  return Object.keys(feed).length ? (
    <>
    {page === 'snacks' ? <View style={styles.headerContainer}>
      <Icon
        style={{ marginLeft: 16, paddingTop: 5 }}
        onPress={() => navigation.goBack()}
        name={"arrow-back"}
        color={Col.White}
        size={24}
      />
      <Text style={styles.headerText}>{title}</Text>
    </View> : null}
    <View style={styles.container}>
      <LayoutScroll>
        <View>
        <EditModal
          clicked={fetching.clicked}
          data={modalData}
          date={date}
          setData={(id, body) => addMeal(id, body)}
          hideModal={() => {
          if (fetching.clicked) return;
          setModalData({ ...modalData, modalVisible: false });
          }}
          bg={pageSettings[page].bg}
        />
          <View style={styles.titleContainer}>
            <View style={styles.imageContainer}>
              {image !== "" ? (
                <Image
                  source={{
                    uri:
                      image && page === 'snacks' ? spoonacularUrl + image : image.slice(0, 4) === "http" ? image : `${AppBackend.getBaseUrl()}${image}`,
                  }}
                  style={styles.image}
                />
              ) : (
                <View style={styles.image} />
              )}
            </View>
            <View style={styles.nameContainer}>
            {item.meal.is_partner ?
                <View>
                  <View style={styles.restaurantContainer}>
                    <SvgMaker style={styles.icons} name={'partnerStar'} />
                    <Text type="cap">{item.meal.restName || 'without name'}</Text>
                  </View>
                  <Divider styler={styles.horizontalDivider} />
                </View> : null
              }
              <View style={styles.catagoryContainer}>
                {getImage(
                  vegetarian,
                  vegan,
                  glutenFree,
                  dairyFree,
                  veryPopular
                ).map((icon: string, index: number) => (
                  <SvgMaker key={index} style={styles.icons} name={icon} />
                ))}
              </View>
              <Text type="h6">{name}</Text>
            </View>
          </View>
          <View>
            <Nutrient
              name={previewSettings[page].name || 'Price'}
              currentValue={previewSettings[page].currentValue ||  `${price || 0}`}
              recipe={true}
              isUnit={true}
            />
            <View style={styles.boxContainer}>
              {mainNutrients.map((item, index) => (
                <View key={`${index}`} style={styles.box}>
                  <Nutrient
                    recipe={true}
                    name={item.title}
                    unit={item.unit}
                    intakeNorm={item.intakeNorm}
                    currentValue={item.amount}
                  />
                </View>
              ))}
            </View>
            <Divider style={styles.divider} />
            <View style={styles.detailsContainer}>
              <Text type="bodyBold" style={styles.detailTitle}>
                Nutrition Details (per serving)
              </Text>
              <View>
                {nutrients &&
                  nutrients.map((elm, index) => (
                    <NutritionItem
                      key={index}
                      item={{
                        recipe: true,
                        name: elm.title,
                        unit: elm.unit,
                        currentValue: elm.amount,
                      }}
                    />
                  ))}
              </View>
            </View>
          </View>
        </View>
      </LayoutScroll>
      {displayAddToMealsButton &&
        <View style={{left: 0, right: 0, bottom: 0}}>
          <Button
            label="ADD TO MEALS"
            style={styles[`addToMealsFrom${page}`]}
            onPress={() => modalAction(item)}
          />
        </View>}
  </View>
  </>
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Col.Black} />
    </View>

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.r_small,
    backgroundColor: Col.Background,
  },
  headerContainer: {
    height: 95,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: Col.Snacks,
    paddingTop: 30,
  },
  headerText: {
    color: Col.White,
    marginLeft: 30,
    fontSize: 20
  },
  border: {
    borderColor: Col.Grey2,
    borderWidth: 1,
  },
  titleContainer: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Col.White,
    marginVertical: Spacing.small,
  },
  nameContainer: {
    padding: Spacing.medium,
  },
  divider: {
    marginVertical: 0,
    marginBottom: Spacing.small,
  },
  imageContainer: {
    height: 200,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.medium,
    backgroundColor: Col.Background,
  },
  editContainer: {
    minHeight: 109,
    backgroundColor: Col.White,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  box: {
    width: "49%",
  },
  boxContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsContainer: {
    backgroundColor: Col.White,
    borderRadius: 8,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
  },
  detailTitle: {
    fontWeight: "bold",
    fontSize: Spacing.medium,
    paddingBottom: Spacing.small,
  },
  catagoryContainer: {
    flexDirection: "row",
  },
  icons: {
    margin: 2,
  },
  addToMealsFromrestaurants: {
    paddingHorizontal: 8,
    backgroundColor: Col.Restaurants
  },
  addToMealsFromrecipes: {
    paddingHorizontal: 8,
    backgroundColor: Col.Recipes
  },
  addToMealsFromsnacks: {
    paddingHorizontal: 8,
    backgroundColor: Col.Snacks
  },
  horizontalDivider: {
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderLeftColor: Col.Divider,
  },
  restaurantContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
});

export default PreviewInfo;
