import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Divider } from "./MyComponents";
import { Col, Spacing } from "./Config";
import Chip from "./custom/ToggleChip";
import Text from "./custom/Typography";
import RadioInput from "./custom/RadioInput";
import { recipeSettings } from "./interfaces";

interface Props {
  data: recipeSettings;
  onSave: (value: recipeSettings) => void;
  blend: string;
  showMealsTypes: boolean;
}

const UserSettings: FC<Props> = ({ data, onSave, blend, showMealsTypes }) => {
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

  useEffect(() => {
    diets.forEach((el) => {
      if (el.isUsers) setDiet(el.id);
    });
  }, []);

  return (
    <View style={styles.canvas}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.intolerances}>
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
          <View>
            <Text type="h6">Diet</Text>
            <View style={{ marginTop: 22 }}>
              {diets.map(({ id, name, isUsers }) => (
                <RadioInput
                  key={id + name}
                  value={id}
                  label={name}
                  selected={diet}
                  disabled={false}
                  onSelect={() => setDiet(id)}
                  blend={Col.Grey}
                />
              ))}
            </View>
          </View>
          {showMealsTypes ? (
            <>
              <Divider />
              <View>
                <Text type="h6">Meal Types</Text>
                <View style={styles.typesContainer}>
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
        <View style={{ padding: Spacing.medium }}>
          <Button
            label="SAVE CHANGES"
            onPress={() =>
              onSave({
                intolerances: intole,
                diets: getRadioState(),
                mealTypes: types,
              })
            }
            style={styles.saveBtn}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  intolerances: {
    marginTop: 26,
  },
  canvas: {
    flex: 1,
    backgroundColor: Col.White,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Col.Divider,
    marginVertical: Spacing.r_small,
  },
  saveBtn: {
    backgroundColor: Col.Grey,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 22,
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 22,
    marginBottom: 46,
  },
});
export default UserSettings;
