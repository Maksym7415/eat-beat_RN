import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import { AppContext } from "../../components/AppContext";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing } from "../../components/Config";
import { Button } from "../../components/MyComponents";
import { TextInput } from "react-native-gesture-handler";
import server from "../../server";
import Text from "../../components/custom/Typography";
import LayoutScroll from "../../components/custom/LayoutScroll";

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

export default function CreateRecipeScreen({ navigation }) {
  const { getRecipeId } = useContext(AppContext);
  const [image, setImage] = useState<null>(null);
  const [loading, setLoading] = useState<Loading>({
    loading: false,
    disabled: false,
  });
  const [data, setData] = useState<Data>({
    title: {
      title: "title",
      max: 64,
      value: "",
      error: "",
    },
    ingredients: {
      title: "ingredients",
      max: 10000,
      value: "",
      error: "",
    },
    instruction: {
      title: "instruction",
      max: 10000,
      value: "",
      error: "",
    },
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
      setImage(result.uri);
    }
  };

  const onCnangeHandler = (text: string, name: string) => {
    setData((state) => ({
      ...state,
      [name]: {
        ...state[name],
        value: text,
        error:
          text.length > state[name].max
            ? `Title length can not be more than ${state[name].max} symbols`
            : "",
      },
    }));
  };

  const saveChanges = async () => {
    let error = false;
    setData((state) => {
      const obj: Data = {};
      Object.values(state).forEach((item: Item) => {
        if (!item.value && item.title !== "instruction") {
          obj[item.title] = { ...item, error: "This field can not be empty" };
          error = true;
        } else obj[item.title] = item;
      });
      return obj;
    });
    if (error) return;
    setLoading({ ...loading, loading: true, disabled: true });
    const {
      data: { id },
      ok,
    } = await server.addRecipe({
      title: data.title.value,
      instruction: data.instruction.value,
      ingredientList: data.ingredients.value,
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
      navigation.navigate("user_recipe", {
        title: data.title.value,
      });
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
              value={data.title.value}
              onChangeText={(text) => onCnangeHandler(text, "title")}
              placeholder={"Add recipe title"}
              style={{
                borderColor: data.title.error ? Col.Error : Col.Grey2,
                borderBottomWidth: 1,
              }}
            />
            {data.title.error ? (
              <Text style={{ color: Col.Error, marginTop: 10 }}>
                {data.title.error}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={styles.editContainer}>
          <Text type="bodyBold" style={{ marginBottom: 10 }}>
            Ingradients*
          </Text>
          <TextInput
            value={data.ingredients.value}
            onChangeText={(text) => onCnangeHandler(text, "ingredients")}
            style={{
              borderColor: data.ingredients.error ? Col.Error : Col.Grey2,
              borderBottomWidth: 1,
            }}
            placeholder={"One ingredient per line"}
            multiline
          />
          {data.ingredients.error ? (
            <Text style={{ color: Col.Error, marginTop: 10 }}>
              {data.ingredients.error}
            </Text>
          ) : null}
        </View>
        <View style={styles.editContainer}>
          <Text type="bodyBold" style={{ marginBottom: 10 }}>
            Instruction
          </Text>
          <TextInput
            value={data.instruction.value}
            onChangeText={(text) => onCnangeHandler(text, "instruction")}
            style={{ borderColor: Col.Grey2, borderBottomWidth: 1 }}
            placeholder={"Add instruction for recipe"}
            multiline
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label="SAVE"
          onPress={saveChanges}
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
