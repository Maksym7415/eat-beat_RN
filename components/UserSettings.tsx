import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Divider } from "./MyComponents";
import { Col, Spacing } from "./Config";
import Chip from "./custom/ToggleChip";
import Text from "./custom/Typography";
import RadioInput from "./custom/RadioInput";
import { recipeSettings, Fetching } from "./interfaces";
import { useIsFocused } from "@react-navigation/native";
import LayoutScroll from "./custom/LayoutScroll";

interface Props {
  data: recipeSettings;
  onSave: (value: recipeSettings) => void;
  blend: string;
  showMealsTypes: boolean;
  backgroundColor?: string;
  fetching: Fetching;
}

const UserSettings: FC<Props> = ({
  data,
  onSave,
  blend,
  showMealsTypes,
  backgroundColor,
  fetching,
}) => {
  const { diets, intolerances, mealTypes } = data;
  if (!diets || !intolerances || !mealTypes) return <View />;
  const [diet, setDiet] = useState(diets.filter((item) => item.isUsers)[0].id);
  const [intole, setIntole] = useState(intolerances.map((el) => ({ ...el })));
  const [types, setTypes] = useState(mealTypes.map((el) => ({ ...el })));

  const getRadioState = () => {
    const arr = [...diets];
    arr.forEach((item) => {
      item.id == diet ? (item.isUsers = true) : (item.isUsers = false);
    });
    return arr;
  };

  const updateIntole = (index: number) => {
    const arr = [...intole];
    console.log(index)
    arr[index].isUsers = !arr[index].isUsers;
    setIntole(arr);
  };

  const updateTypes = (index: number) => {
    const arr = [...types];
    arr[index].isUsers = !arr[index].isUsers;
    setTypes(arr);
  };

  const refreshPage = () => {
    setDiet(diets.filter((item) => item.isUsers)[0].id);
    setIntole(intolerances.map((el) => ({ ...el })));
    setTypes(mealTypes.map((el) => ({ ...el })));
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) refreshPage();
  }, [isFocused]);

  return (
    <LayoutScroll style={{ backgroundColor, flexGrow: 1 }}>
      <View style={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text type="h6">Intolerances</Text>
          <View style={styles.chipsContainer}>
            {intole.map(({ id, name, isUsers, disabled }, index) => (
              <Chip
                key={id + name}
                title={name}
                state={isUsers}
                selectedColor={blend}
                onPress={() => updateIntole(index)}
                disabled={disabled}
              />
            ))}
          </View>
        </View>
        <Divider />
        <View style={styles.container}>
          <Text type="h6">Diet</Text>
          {diets.map(({ id, name, isUsers }) => (
            <RadioInput
              key={id + name}
              value={id}
              label={name}
              selected={diet}
              disabled={false}
              onSelect={() => setDiet(id)}
              blend={blend}
            />
          ))}
        </View>
        {showMealsTypes ? (
          <>
            <Divider />
            <View style={styles.container}>
              <Text type="h6">Meal Types</Text>
              <View style={styles.chipsContainer}>
                {types.map(({ id, name, isUsers, disabled }, index) => (
                  <Chip
                    key={id + name}
                    title={name}
                    state={isUsers}
                    selectedColor={blend}
                    onPress={() => updateTypes(index)}
                    disabled={disabled}
                  />
                ))}
              </View>
            </View>
          </>
        ) : (
          <View />
        )}
      </View>
      <View style={[styles.buttonContainer, { backgroundColor }]}>
        <Button
          deactivate={fetching.deactivate}
          clicked={fetching.clicked}
          label="SAVE CHANGES"
          onPress={() =>
            onSave({
              intolerances: intole,
              diets: getRadioState(),
              mealTypes: types,
            })
          }
          style={{ backgroundColor: blend }}
        />
      </View>
    </LayoutScroll>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: Col.White,
  },
  container: {
    marginTop: Spacing.medium,
    paddingHorizontal: Spacing.medium,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: Spacing.small,
  },
  buttonContainer: {
    flex: 1,
    padding: Spacing.medium,
    justifyContent: "flex-end",
  },
});
export default UserSettings;
