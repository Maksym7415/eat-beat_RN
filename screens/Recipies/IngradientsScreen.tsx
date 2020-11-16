import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing } from "../../components/Config";
import { Button, Divider } from "../../components/MyComponents";
import server from "../../server";
import IngradientRow from "./Components/IngradientRow";
import LayoutScroll from "../../components/custom/LayoutScroll";

export default function IngradientScreen({ navigation }) {
  const { recipeId, editMode, toggleEdit } = useContext(AppContext);
  const [feed, setFeed] = useState<object>({});
  const [checked, setChecked] = useState<object>({});
  const [value, setValue] = useState<string>("");

  const getRecipeInfo = useCallback(async () => {
    const { data, ok } = await server.getRecipeInfo(recipeId);
    if (ok) {
      const { title, instruction, servings, nutrition } = data;
      setFeed({
        title,
        servings,
        instruction,
        nutrients: nutrition.nutrients,
        ingredients: nutrition.ingredients,
        mainNutrients: nutrition.nutrients.filter(
          (el) =>
            el.title === "Calories" ||
            el.title === "Protein" ||
            el.title === "Fat" ||
            el.title === "Carbs"
        ),
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
    feed.ingredients &&
      setValue(
        feed.ingredients
          .map((el) => `${el.amount} ${el.unit} ${el.name}`)
          .join("\n")
      );
  }, [feed]);

  const checkHandler = (name: string, check: boolean) => {
    setChecked((val) => ({ ...val, [name]: check }));
  };

  const changeHandler = (text) => {
    setValue(text);
  };

  const saveChanges = async () => {
    await server.updateRecipe(recipeId, { ingredientList: value });
    getRecipeInfo();
    toggleEdit(false);
  };

  return Object.keys(feed).length ? (
    <LayoutScroll style={{ flexGrow: 1, backgroundColor: Col.Background }}>
      <View style={{ flexGrow: 1 }}>
        {!editMode ? (
          <>
            <View>
              {feed.ingredients &&
                feed.ingredients.map((el, index) => {
                  return (
                    <IngradientRow
                      key={index}
                      checkHandler={checkHandler}
                      checked={checked}
                      name={el.name}
                      unit={el.unit}
                      title={el.unit}
                      servings={el.amount}
                    />
                  );
                })}
            </View>
            <View style={{ flexGrow: 1, paddingHorizontal: Spacing.medium }}>
              <Button
                label="Add selected products to My Shoppping List"
                onPress={() => console.log("")}
                style={{ backgroundColor: Col.Recipes }}
                deactivate={!Object.values(checked).filter((el) => el).length}
              />
            </View>
            <View style={styles.btnConatiner}>
              <Button
                label="Add recipe to my meals"
                onPress={() => toggleEdit(!editMode)}
                style={{ backgroundColor: Col.Recipes }}
                deactivate={Object.values(checked).filter((el) => el).length}
              />
            </View>
          </>
        ) : (
          <View style={{ flexGrow: 1 }}>
            <View style={styles.ingradientContainer}>
              <Text style={styles.ingradientTitle}>Ingredients</Text>
              <View style={styles.ingradientTextField}>
                <TextInput
                  multiline
                  value={value}
                  onChangeText={changeHandler}
                />
              </View>

              <Divider style={{ backgroundColor: "rgba(0,0,0,0.3)" }} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                label="SAVE CHANGES"
                onPress={saveChanges}
                style={{ backgroundColor: Col.Recipes }}
              />
              <Button
                label="CANCEL"
                type="text"
                onPress={() => toggleEdit(false)}
                labelStyle={{ color: Col.Grey }}
                style={{ marginVertical: 0 }}
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
  },
  ingradientTextField: {
    paddingHorizontal: 16,
    paddingTop: 22,
  },
  btnConatiner: {
    paddingHorizontal: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.medium,
    backgroundColor: Col.Background,
  },
  buttonContainer: {
    // flex: 1,
    padding: Spacing.medium,
    //justifyContent: 'flex-end'
  },
});
