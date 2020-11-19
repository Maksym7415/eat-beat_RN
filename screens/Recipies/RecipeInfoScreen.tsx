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
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing } from "../../components/Config";
import { Button, Divider } from "../../components/MyComponents";
import Text from "../../components/custom/Typography";
import server from "../../server";
import Nutrient from "../../components/Nutrient";
import NutritionItem from "../../components/Nutrition";
import { NavProps } from "../../components/interfaces";
import { baseURL } from '../../url';
import useValidation from '../../utils/validation';

interface Item {
  title: string;
  max: number;
  value: undefined;
  error: string;
}

interface Data {
  [key: string]: Item;
}

const config = {
  title: {
    id: 0,
    title: 'title',
    maxLength: 50,
    value: null,
    required: true,
    errors: {
      maxLegnth: 'Title length can not be more than 50 symbols',
      value: 'This field can not be empty',
    }
  },
  servings: {
    id: 1,
    title: 'servings',
    maxLength: 1000,
    value: null,
    required: true,
    type: 'number',
    errors: {
      maxLegnth: 'error message for max length',
      isNumber: 'should be number',
      value: 'This field can not be empty',
    }
  },
}

const RecipeInfoScreen: FC<NavProps> = ({ navigation }) => {

  const { recipeId, editMode, toggleEdit } = useContext(AppContext);

  const [feed, setFeed] = useState<object>({});
  const [disabled, setDisabled] = useState<boolean>(false);
  const [image, setImage] = useState<null>(null);
  const [cfg, setCfg] = useState<object>(config);
  const [title, servings, fieldValues, changeHandler, startValidation, getDefaultConfig] = useValidation(cfg);
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
      setCfg((config) => ({ ...config, title: { ...config.title, value: title }, servings: { ...config.servings, value: servings } }))
    }
  }, [recipeId]);

  const ChangeTitle = (title: string) => {
    navigation.dangerouslyGetParent().setOptions({ title });
  };

  const saveChanges = async ([title, servings], error) => {
    if (error) return;
    setDisabled(true);
    const res = await server.updateRecipe(recipeId, {
      title: title.value || feed.title,
      instruction: feed.instruction,
      ingredients: feed.ingredients,
      servings: +servings.value || +feed.servings,
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
    ChangeTitle(title.value || feed.title);
    getRecipeInfo();
  }
  const cancelHandler = () => {
    toggleEdit(!editMode);
  };

  useEffect(() => {
    if (navigation.isFocused()) {
      toggleEdit(false);
      getRecipeInfo();

    }
  }, [navigation]);

  useEffect(() => {
    getRecipeInfo();
    getDefaultConfig();
  }, [editMode])

  return Object.keys(feed).length && !disabled ? (
    <View style={{ flex: 1, backgroundColor: Col.Background }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : `${baseURL}${feed?.uri}`,
                }}
                style={styles.image}
              >
                {editMode ? (
                  <Icon
                    onPress={pickAvatar}
                    name={"camera-plus"}
                    color={Col.White}
                    size={58}
                  />
                ) : (
                    <View />
                  )}
              </ImageBackground>
            </View>
            <View style={{ padding: Spacing.medium }}>
              {!editMode ? (
                <Text type="h6">{feed.title}</Text>
              ) : (
                  <View>
                    <Text
                      type="bodyBold"
                      style={{ color: Col.Grey, marginBottom: Spacing.small }}
                    >
                      Title*
                  </Text>
                    <TextInput
                      value={
                        fieldValues.title.value === null
                          ? feed.title
                          : fieldValues.title.value
                      }
                      onChangeText={(text) => changeHandler(text, "title")}
                      placeholder={"Add recipe title"}
                      style={{
                        borderColor: title.errors ? Col.Error : Col.Grey2,
                        fontFamily: "Inter_500Medium",
                        fontSize: 20,
                        color: Col.Dark,
                        borderBottomWidth: 1,
                      }}
                    />
                    <Text style={{ color: Col.Error, marginTop: 10 }}>
                      {title.errors}
                    </Text>
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
              <>
                <View style={styles.editContainer}>
                  <Text
                    type="bodyBold"
                    style={{ color: Col.Grey, marginBottom: Spacing.small }}
                  >
                    Servings
                </Text>
                  <TextInput
                    value={
                      fieldValues.servings.value === null
                        ? feed.servings + ""
                        : fieldValues.servings.value + ""
                    }
                    keyboardType="number-pad"
                    onChangeText={(text) => changeHandler(text, "servings")}
                    placeholder={"Add recipe serving"}
                    style={{
                      borderColor: servings.errors ? Col.Error : Col.Grey2,
                      fontFamily: "Inter_500Medium",
                      fontSize: 20,
                      color: Col.Dark,
                      borderBottomWidth: 1,
                    }}
                  />
                  <Text style={{ color: Col.Error, marginTop: 10 }}>
                    {servings.errors}
                  </Text>
                </View>
                <View>
                  <Button
                    label="SAVE"
                    onPress={() => startValidation(saveChanges)}
                    deactivate={disabled}
                    style={{ backgroundColor: Col.Recipes }}
                  />
                  <Button
                    label="CANCEL"
                    type="text"
                    deactivate={disabled}
                    onPress={cancelHandler}
                    labelStyle={{ color: Col.Grey }}
                    style={{ marginVertical: 0 }}
                  />
                </View>
              </>
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
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.medium,
    backgroundColor: Col.Background,
  },
  editContainer: {
    minHeight: 50,
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
