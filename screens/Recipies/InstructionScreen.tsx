import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing } from "../../components/Config";
import { Button, Divider } from "../../components/MyComponents";
import server from "../../server";
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
        instruction: data.instruction,
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
          <View style={{ flex: 1 }}>
            <View>
              <TextInput multiline value={value} onChangeText={changeHandler} />
              <Divider styler={styles.divider} />
            </View>
            <View style={styles.buttons}>
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
    flexGrow: 1,
    paddingHorizontal: Spacing.medium,
    paddingVertical: 12,
  },
  ingradientTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: Spacing.r_small,
  },
  ingradientTextField: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.large,
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: Spacing.small,
    borderBottomColor: "rgba(0, 0, 0, 0.6)",
  },
  btnConatiner: {
    paddingHorizontal: Spacing.medium,
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
  buttons: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
