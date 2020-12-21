import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Alert,
  Pressable,
  TextInput,
} from "react-native";
import { AppContext } from "../../components/AppContext";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing } from "../../components/Config";
import { Button } from "../../components/MyComponents";
import server from "../../server";
import Text from "../../components/custom/Typography";
import LayoutScroll from "../../components/custom/LayoutScroll";
import useValidation from "../../utils/validation";
import * as ImageManipulator from "expo-image-manipulator";

interface Item {
  title: string;
  max: number;
  value: string;
  error: string;
}

interface Data {
  [key: string]: Item;
}

interface Loading {
  loading: boolean;
  disabled: boolean;
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
  ingredients: {
    id: 2,
    title: "ingredients",
    maxLength: 10000,
    required: true,
    value: null,
    errors: {
      maxLength: "error message for max length",
      value: "This field can not be empty",
    },
  },
  instruction: {
    id: 3,
    title: "instruction",
    maxLength: 10000,
    value: null,
    errors: {
      maxLength: "error message for max length",
    },
  },
};

export default function CreateRecipeScreen({ navigation }) {
  const [
    title,
    servings,
    ingredients,
    instruction,
    fieldValues,
    changeHandler,
    startValidation,
  ] = useValidation(config);
  const { getRecipeId } = useContext(AppContext);
  const [image, setImage] = useState<null>(null);
  const [loading, setLoading] = useState<Loading>({
    loading: false,
    disabled: false,
  });
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

  const saveChanges = async (
    [title, servings, ingredients, instruction],
    error: boolean
  ) => {
    if (error) return;
    setLoading({ ...loading, loading: true, disabled: true });
    const {
      data: { id },
      ok,
    } = await server.addRecipe({
      title: title.value,
      instruction: instruction.value,
      ingredientList: ingredients.value,
      servings: servings.value === null ? "" : +servings.value,
    });
    if (ok) {
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
        await server.addRecipeAvatar(formData, id);
      }
      getRecipeId(id);
      setLoading({ ...loading, loading: false, disabled: false });
      navigation.navigate("user_recipe", { title: title.value });
    }
    setLoading({ ...loading, loading: false, disabled: false });
  };

  if (loading.loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Col.Black} />
      </View>
    );

  return (
    <LayoutScroll style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Pressable onPress={checkPermission}>
            <View style={styles.imageContainer}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Icon name={"camera-plus"} color={Col.White} size={58} />
              )}
            </View>
          </Pressable>
          <View style={{ padding: Spacing.medium }}>
            <Text type="bodyBold" style={{ marginBottom: 10 }}>
              Title*
            </Text>
            <TextInput
              value={fieldValues?.title?.value || ""}
              onChangeText={(text) => changeHandler(text, "title")}
              placeholder={"Add recipe title"}
              style={{
                borderColor: title.errors ? Col.Error : Col.Grey2,
                borderBottomWidth: 1,
              }}
            />
            <Text style={{ color: Col.Error, marginTop: 10 }}>
              {title?.errors}
            </Text>
          </View>
        </View>
        <View style={styles.editContainer}>
          <Text type="bodyBold" style={{ marginBottom: 10 }}>
            Servings
          </Text>
          <TextInput
            keyboardType="number-pad"
            value={fieldValues?.servings?.value || ""}
            onChangeText={(text) => changeHandler(text, "servings")}
            style={{
              borderColor: servings.errors ? Col.Error : Col.Grey2,
              borderBottomWidth: 1,
            }}
            placeholder={"Add serving for recipe"}
          />
          <Text style={{ color: Col.Error, marginTop: 10 }}>
            {servings?.errors}
          </Text>
        </View>
        <View style={styles.editContainer}>
          <Text type="bodyBold" style={{ marginBottom: 10 }}>
            Ingredients*
          </Text>
          <TextInput
            value={fieldValues?.ingredients?.value || ""}
            onChangeText={(text) => changeHandler(text, "ingredients")}
            style={{
              borderColor: ingredients.errors ? Col.Error : Col.Grey2,
              borderBottomWidth: 1,
            }}
            placeholder={"One ingredient per line"}
            multiline
          />

          <Text style={{ color: Col.Error, marginTop: 10 }}>
            {ingredients?.errors}
          </Text>
        </View>
        <View style={styles.editContainer}>
          <Text type="bodyBold" style={{ marginBottom: 10 }}>
            Instruction
          </Text>
          <TextInput
            value={fieldValues?.instruction?.value || ""}
            onChangeText={(text) => changeHandler(text, "instruction")}
            style={{
              borderColor: instruction.errors ? Col.Error : Col.Grey2,
              borderBottomWidth: 1,
            }}
            placeholder={"Add instruction for recipe"}
            multiline
          />
          <Text style={{ color: Col.Error, marginTop: 10 }}>
            {instruction?.errors}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label="SAVE"
          onPress={() => startValidation(saveChanges)}
          style={{ backgroundColor: Col.Recipes }}
        />
        <Button
          label="CANCEL"
          type="text"
          onPress={() => navigation.navigate("user_recipies")}
          style={{ marginVertical: 0 }}
          labelStyle={{ color: Col.Grey }}
        />
      </View>
    </LayoutScroll>
  );
}

const styles = StyleSheet.create({
  scroll: {
    // flex: 1,
    backgroundColor: Col.Background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.r_small,
  },
  border: {
    borderColor: Col.Grey2,
    borderWidth: 1,
  },
  titleContainer: {
    backgroundColor: Col.White,
    paddingBottom: Spacing.large,
    borderRadius: 8,
    marginBottom: Spacing.r_small,
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
  editContainer: {
    minHeight: 109,
    backgroundColor: Col.White,
    borderRadius: 8,
    padding: Spacing.medium,
    marginBottom: Spacing.r_small,
  },
  editText: {
    width: "90%",
    fontWeight: "500",
    fontSize: 20,
  },
  loading: {
    flex: 1,
    zIndex: 10,
    position: "absolute",
    top: "50%",
    right: "45%",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.medium,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.medium,
  },
});
