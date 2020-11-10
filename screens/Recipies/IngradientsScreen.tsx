import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing, Typ } from "../../components/Config";
import Button from "../../components/custom/ConfirmationButton";
import { Divider } from "../../components/MyComponents";
import server from "../../server";
import IngradientRow from "./Components/IngradientRow";

export default function IngradientScreen({ navigation }) {
  const { recipeId, editMode, toggleEdit } = useContext(AppContext);
  const [feed, setFeed] = useState<object>({});
  const [checked, setChecked] = useState<object>({});
  const [value, setValue] = useState<string>("");

  const getRecipeInfo = useCallback(async () => {
    const { data, ok } = await server.getRecipeInfo(recipeId);
    if(ok) {
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
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {!editMode ? (
          <View>
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
            <View style={{ ...styles.btnConatiner, marginTop: 8 }}>
              <Button
                title={"Add selected products to My Shoppping List"}
                onClickHandler={() => toggleEdit(!editMode)}
                bckColor={Col.Green1}
                textColor={Col.White}
                fts={Typ.Small}
                ftw={"500"}
                disabled={
                  !Object.values(checked).filter((el) => el).length
                    ? true
                    : false
                }
              />
            </View>
            <View style={styles.btnConatiner}>
              <Button
                title={"Add recipe to my meals"}
                onClickHandler={() => toggleEdit(!editMode)}
                bckColor={Col.Green1}
                textColor={Col.White}
                fts={Typ.Small}
                ftw={"500"}
              />
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.ingradientContainer}>
              <Text style={styles.ingradientTitle}>Ingredients</Text>
              <View style={styles.ingradientTextField}>
                <TextInput
                  multiline
                  value={value}
                  onChangeText={changeHandler}
                />
              </View>

              <Divider styler={styles.divider} />
            </View>
            <View>
              <Button
                title={"SAVE"}
                onClickHandler={saveChanges}
                bckColor={Col.Green1}
                textColor={Col.White}
                fts={Typ.Small}
                ftw={"500"}
              />
              <Button
                title={"Cancel"}
                onClickHandler={() => toggleEdit(!editMode)}
                bckColor={""}
                textColor={"#7A7A7A"}
                fts={Typ.Small}
                ftw={"500"}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
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
  divider: {
    borderBottomWidth: 1,
    marginVertical: Spacing.small,
    borderBottomColor: "rgba(0, 0, 0, 0.6)",
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
});
