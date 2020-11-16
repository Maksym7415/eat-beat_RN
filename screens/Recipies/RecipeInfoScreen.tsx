import React, { useState, useEffect, useContext, useCallback, FC } from "react";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../../components/AppContext";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing } from "../../components/Config";
import { Button, Divider } from "../../components/MyComponents";
import Text from "../../components/custom/Typography";
import server from "../../server";
import Nutrient from "../../components/Nutrient";
import NutritionItem from "../../components/Nutrition";
import { NavProps } from "../../components/interfaces";

interface Item {
  title: string;
  max: number;
  value: undefined;
  error: string;
}

interface Data {
  [key: string]: Item;
}

const RecipeInfoScreen: FC<NavProps> = ({ navigation }) => {
  const { recipeId, editMode, toggleEdit } = useContext(AppContext);
  const [feed, setFeed] = useState<object>({});
  const [disabled, setDisabled] = useState<boolean>(false);
  const [image, setImage] = useState<null>(null);
  const [data, setData] = useState<Data>({
    title: {
      title: "title",
      max: 64,
      value: undefined,
      error: "",
    },
  });
  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onCnangeHandler = (text: string, name: string) => {
    setData({
      ...data,
      [name]: {
        ...data[name],
        value: text,
        error:
          text.length > data[name].max
            ? `Title length can not be more than ${data[name].max} symbols`
            : "",
      },
    });
  };

  const getRecipeInfo = useCallback(async () => {
    const response = await server.getRecipeInfo(recipeId);
    if (response.ok) {
      const { title, instruction, nutrition, servings, image } = response.data;
      setFeed({
        title,
        instruction,
        mainNutrients: nutrition.nutrients.filter(
          (el) =>
            el.title === "Calories" ||
            el.title === "Protein" ||
            el.title === "Fat" ||
            el.title === "Carbs"
        ),
        nutrients: nutrition.nutrients,
        servings,
        ingredients: nutrition.ingredient,
        uri: image,
      });
    }
  }, [recipeId]);

  const saveChanges = async () => {
    setDisabled(true);
    const res = await server.updateRecipe(recipeId, {
      title: data.title.value || feed.title,
      instruction: feed.instruction,
      ingredients: feed.ingredients,
    });
    if (!res.ok) {
      setDisabled(false);
      return;
    }
    let formData;
    if (image) {
      formData = new FormData();
      const part = image.split(".");
      const fileType = part[part.length - 1];
      formData.append("file", {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      const responce = await server.addRecipeAvatar(formData, recipeId);
    }
    setDisabled(false);
    toggleEdit(false);
    getRecipeInfo();
  };

  useEffect(() => {
    if (navigation.isFocused()) {
      toggleEdit(false);
      getRecipeInfo();
    }
  }, [navigation]);
  return Object.keys(feed).length && !disabled ? (
    <View style={{ flex: 1, backgroundColor: Col.Background }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.imageContainer}>
              {editMode && (
                <View
                  style={{
                    position: "absolute",
                    left: "40%",
                    top: "35%",
                    zIndex: 10,
                    opacity: 0.5,
                  }}
                >
                  <TouchableOpacity onPress={pickAvatar}>
                    <Icon name={"camera-plus"} color={Col.Grey1} size={58} />
                  </TouchableOpacity>
                </View>
              )}
              {
                <Image
                  source={{
                    uri: image
                      ? image
                      : `https://logisticbrocker.hopto.org/eat-beat/${feed?.uri}`,
                  }}
                  style={styles.image}
                />
              }
            </View>
            <View style={{ padding: Spacing.medium }}>
              {!editMode ? (
                <Text type="h6">{feed.title}</Text>
              ) : (
                <View>
                  <Text type="h6">Title*</Text>
                  <TextInput
                    value={
                      data.title.value === undefined
                        ? feed.title
                        : data.title.value
                    }
                    onChangeText={(text) => onCnangeHandler(text, "title")}
                    placeholder={"Add recipe title"}
                    style={{
                      borderColor: data.title.error ? "#FF364F" : Col.Grey2,
                      borderBottomWidth: 1,
                    }}
                  />
                  {data.title.error ? (
                    <Text style={{ color: "#FF364F", marginTop: 10 }}>
                      {data.title.error}{" "}
                    </Text>
                  ) : null}
                </View>
              )}
            </View>
          </View>
          {!editMode ? (
            <View>
              <View>
                <Nutrient
                  name={"Number of servings"}
                  currentValue={feed.servings}
                  recipe={true}
                  isUnit={true}
                />
              </View>
              <View style={styles.boxContainer}>
                {feed.mainNutrients &&
                  feed.mainNutrients.map((item, index) => (
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
              <View style={styles.detailsContainer}>
                <Text type="bodyBold" style={styles.detailTitle}>
                  Nutrition Details (per serving)
                </Text>
                <View>
                  {feed.nutrients &&
                    feed.nutrients.map((elm, index) => (
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
              <View>
                <Button
                  label="Add recipe to my meals"
                  onPress={() => console.log("")}
                  deactivate={disabled}
                  style={{ backgroundColor: Col.Recipes }}
                />
              </View>
            </View>
          ) : (
            <View>
              <Button
                label="SAVE"
                onPress={saveChanges}
                deactivate={disabled}
                style={{ backgroundColor: Col.Recipes }}
              />
              <Button
                label="CANCEL"
                type="text"
                deactivate={disabled}
                onPress={() => toggleEdit(!editMode)}
                labelStyle={{ color: Col.Grey }}
                style={{ marginVertical: 0 }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Col.Black} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
  },
  border: {
    borderColor: Col.Grey2,
    borderWidth: 1,
  },
  titleContainer: {
    backgroundColor: Col.White,
    borderRadius: 8,
    marginBottom: 12,
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: Spacing.small,
    borderBottomColor: Col.Divider,
  },
  imageContainer: {
    height: 194,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    overflow: "hidden",
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
    //    marginRight: '1%',
  },
  boxContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //justifyContent: "center",

    //paddingHorizontal: Spacing.r_small,
  },
  detailsContainer: {
    backgroundColor: Col.White,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  detailTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 8,
  },
});
export default RecipeInfoScreen;
