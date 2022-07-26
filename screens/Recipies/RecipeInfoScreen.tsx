import React, { useState, useEffect, useContext, useCallback, FC } from "react";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../../components/AppContext";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  Alert
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing } from "../../components/Config";
import { Button } from "../../components/MyComponents";
import Text from "../../components/custom/Typography";
import server from "../../server";
import Nutrient from "../../components/Nutrient";
import NutritionItem from "../../components/Nutrition";
import { NavProps } from "../../components/interfaces";
import useValidation from "../../utils/validation";
import * as ImageManipulator from "expo-image-manipulator";
import { useIsFocused } from "@react-navigation/native";
import AppBackend from '../../components/BackendSwitcher/store'


interface Item {
  title: string;
  max: number;
  value: undefined;
  error: string;
}

const config = {
  title: {
    id: 0,
    title: "title",
    maxLength: 50,
    value: null,
    required: true,
    errors: {
      maxLegnth: "Title length can not be more than 50 symbols",
      value: "This field can not be empty",
    },
  },
  servings: {
    id: 1,
    title: "servings",
    minLength: 1,
    maxLength: 1000,
    value: null,
    type: "number",
    integer: true,
    errors: {
      maxLength: "should be smaller than 1000",
      minLength: "should be bigger than 0",
      isNumber: "should be number",
      integer: "should not contain decimals",
    },
  },
};

const RecipeInfoScreen: FC<NavProps> = ({ navigation }) => {
  const { recipeId, editMode, toggleEdit } = useContext(AppContext);
  const [feed, setFeed] = useState<object>({});
  const [disabled, setDisabled] = useState<boolean>(false);
  const [image, setImage] = useState<null>(null);
  const [cfg, setCfg] = useState<object>(config);
  const [
    title,
    servings,
    fieldValues,
    changeHandler,
    startValidation,
    getDefaultConfig,
  ] = useValidation(cfg);

  const checkPermission = async () => {
    const { granted } = await ImagePicker.getCameraRollPermissionsAsync();
    if (granted) {
      pickAvatar();
    } else {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status === "granted") {
        pickAvatar();
      } else {
        Alert.alert(
          "Access Permission",
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    }
  };

  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 600, height: 600 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImage(manipResult.uri);
    }
  };

  const getRecipeInfo = useCallback(async () => {
    const response = await server.getRecipeInfo(recipeId);
    if (response.ok) {
      const { title, instructions, nutrition, servings, image } = response.data;
      setFeed({
        title,
        instruction: instructions,
        mainNutrients: nutrition.nutrients.filter(
          (el) =>
            el.title === "Calories" ||
            el.title === "Protein" ||
            el.title === "Total Fat" ||
            el.title === "Carbs"
        ),
        nutrients: nutrition.nutrients,
        servings,
        ingredients: nutrition.ingredients,
        uri: image,
      });
      setCfg((config) => ({
        ...config,
        title: { ...config.title, value: title },
        servings: { ...config.servings, value: servings },
      }));
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
    setImage("");
  };

  const focus = useIsFocused();
  useEffect(() => {
    if (focus) {
      toggleEdit(false);
      getRecipeInfo();
    }
  }, [focus]);

  useEffect(() => {
    getDefaultConfig();
    if (feed.uri) setImage(`${AppBackend.getBaseUrl()}${feed?.uri}`);
  }, [editMode]);

  return Object.keys(feed).length && !disabled ? (
    <View style={{ flex: 1, backgroundColor: Col.Background }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{
                  uri: image ? image : `${AppBackend.getBaseUrl()}${feed?.uri}`,
                }}
                style={styles.image}
              >
                {editMode ? (
                  <Icon
                    onPress={checkPermission}
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
                      fontFamily: "Roboto_500Medium",
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
                    fontFamily: "Roboto_500Medium",
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
                {/* <Button
                    label="CANCEL"
                    type="text"
                    deactivate={disabled}
                    onPress={cancelHandler}
                    labelStyle={{ color: Col.Grey }}
                    style={{ marginVertical: 0 }}
                  /> */}
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
