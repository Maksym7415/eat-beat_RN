import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing, Typ } from "../../components/Config";
import { Button, Divider } from "../../components/MyComponents";
import server from "../../server";
import IngradientRow from "./Components/IngradientRow";
import LayoutScroll from "../../components/custom/LayoutScroll";
import Text from "../../components/custom/Typography";

export default function InstructionScreen({ navigation }) {
  const { recipeId, editMode, toggleEdit } = useContext(AppContext);
  const [feed, setFeed] = useState<object>({});
  const [value, setValue] = useState<string>("");

  const getRecipeInfo = useCallback(async () => {
    const { data, ok } = await server.getRecipeInfo(recipeId);
    if (ok) {
      setFeed({
        title: data.title,
        instruction: data.instruction,
        mainNutrients: data.nutrition.nutrients.filter(
          (el) =>
            el.title === "Calories" ||
            el.title === "Protein" ||
            el.title === "Fat" ||
            el.title === "Carbs"
        ),
        nutrients: data.nutrition.nutrients,
        servings: data.servings,
        ingredients: data.nutrition.ingredients,
      });
    }
  }, [recipeId]);

  useEffect(() => {
    getRecipeInfo();
    let focus = navigation.addListener("focus", () => {
      toggleEdit(false);
    });
    () => {
      focus = null;
    };
  }, []);

  useEffect(() => {
    feed.instruction && setValue(feed.instruction);
  }, [feed]);

  const changeHandler = (text) => {
    setValue(text);
  };

  const saveChanges = async () => {
    await server.updateRecipe(recipeId, { instruction: value });
    getRecipeInfo();
    toggleEdit(false);
  };

  return Object.keys(feed).length ? (
    <LayoutScroll style={{ flexGrow: 1, backgroundColor: Col.Background }}>
      <View style={styles.ingradientContainer}>
        {!editMode ? (
          <View style={styles.InstructionContainer}>
            <Text type="body2">
              {feed.instruction ||
                "You have not added any instruction for your recipe yet"}
            </Text>
          </View>
        ) : (
          <View>
            <View>
              <TextInput multiline value={value} onChangeText={changeHandler} />
              <Divider styler={styles.divider} />
            </View>
            <View>
              <Button
                label="SAVE"
                onPress={saveChanges}
                style={{ backgroundColor: Col.Recipes }}
              />
              <Button
                label="CANCEL"
                type="text"
                onPress={() => toggleEdit(!editMode)}
                style={{ marginVertical: 0 }}
                labelStyle={{ color: Col.Grey }}
              />
            </View>
          </View>
        )}
      </View>
    </LayoutScroll>
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Col.Black} />
    </View>
  );
}

const styles = StyleSheet.create({
  ingradientContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  ingradientTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  ingradientTextField: {
    paddingHorizontal: 16,
    paddingTop: 22,
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: Spacing.small,
    borderBottomColor: "rgba(0, 0, 0, 0.6)",
  },
  btnConatiner: {
    paddingHorizontal: 16,
  },
  InstructionContainer: {
    paddingHorizontal: Spacing.xlarge,
    paddingVertical: Spacing.medium,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.medium,
    backgroundColor: Col.Background,
  },
});
