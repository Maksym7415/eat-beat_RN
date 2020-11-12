import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Divider } from "./MyComponents";
import { Col, Spacing } from "./Config";
import Chip from "./custom/ToggleChip";
import Text from "./custom/Typography";
import RadioInput from "./custom/RadioInput";
import { recipeSettings, Fetching } from "./interfaces";

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
  const [diet, setDiet] = useState(0);
  const [intole, setIntole] = useState(intolerances);
  const [types, setTypes] = useState(mealTypes);

  const getRadioState = () => {
    const arr = [...diets];
    arr.forEach((item) => {
      item.id == diet ? (item.isUsers = true) : (item.isUsers = false);
    });
    return arr;
  };

  const updateIntole = (index: number) => {
    const arr = [...intole];
    arr[index].isUsers = !arr[index].isUsers;
    setIntole(arr);
  };

  const updateTypes = (index: number) => {
    const arr = [...types];
    arr[index].isUsers = !arr[index].isUsers;
    setTypes(arr);
  };

  return (
    <View style={[styles.canvas, { backgroundColor }]}>
      <ScrollView overScrollMode="always">
        <View style={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text type="h6">Intolerances</Text>
            <View style={styles.chipsContainer}>
              {intole.map(({ id, name, isUsers }, index) => (
                <Chip
                  key={id + name}
                  title={name}
                  state={isUsers}
                  selectedColor={blend}
                  onPress={() => updateIntole(index)}
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
                  {types.map(({ id, name, isUsers }, index) => (
                    <Chip
                      key={id + name}
                      title={name}
                      state={isUsers}
                      selectedColor={blend}
                      onPress={() => updateTypes(index)}
                    />
                  ))}
                </View>
              </View>
            </>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.buttonContainer}>
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
      </ScrollView>
    </View>
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
