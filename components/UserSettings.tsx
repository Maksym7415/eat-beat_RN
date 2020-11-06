import React, { useEffect, useState } from "react";

import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Col, Spacing, Typ } from "./Config";
import Chip from "./custom/Chip";
import RadioBtn from "./Radio";
import { Button, Divider } from "./MyComponents";
import Text from "./custom/Typography";

interface Props {
  data: Array<object>;
  saveFilterConfig: (chipsState: object, radioState: object) => void;
  btnColor: string;
  chipColor: string;
  radioBtn: string;
}

export default function UserSettings({
  radioState,
  setRadioState,
  chipsState,
  setChipsState,
  mealsTypes,
  setMealsTypes,
  data,
  saveFilterConfig,
  btnColor,
  chipColor,
  radioBtn,
}: Props) {
  const setNewRadioState = (value, name) => {
    setRadioState((v) =>
      v.map((el) =>
        el.name === name ? { ...el, isUsers: true } : { ...el, isUsers: false }
      )
    );
  };

  const setChips = (name, state) => {
    setChipsState((v) =>
      v.map((el) => (el.name === name ? { ...el, isUsers: state } : el))
    );
  };

  const setMeals = (name, state) => {
    setMealsTypes((v) =>
      v.map((el) => (el.name === name ? { ...el, isUsers: state } : el))
    );
  };

  return (
    <View style={styles.canvas}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.intolerances}>
            <Text type="h6">Intolerances</Text>
            <View style={styles.chipsContainer}>
              {chipsState &&
                chipsState.map((el) => (
                  <Chip
                    chipBgColor={chipColor}
                    setChipsState={setChips}
                    title={el.name}
                    state={el.isUsers}
                    key={el.id}
                  />
                ))}
            </View>
          </View>
          <Divider styler={styles.divider} />
          <View>
            <Text type="h6">Diet</Text>
            <View style={{ marginTop: 22 }}>
              {radioState &&
                radioState.map((item) => (
                  <RadioInput
              key={item.value}
              value={item.value}
              label={item.name}
              disabled={item.disabled}
              selected={select}
              onSelect={(value) => setSelect(value)}
            />
                  <RadioBtn
                    radioColor={radioBtn}
                    key={el.id}
                    label={el.name}
                    defaultValue={el.isUsers}
                    setSelect={(value, name) => setNewRadioState(value, name)}
                    newState={radioState}
                  />
                ))}
            </View>
          </View>
          {mealsTypes && !!mealsTypes.length && (
            <>
              <Divider styler={styles.divider} />
              <View>
                <Text style={styles.intolerances_text}>Meal Types</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 22,
                    marginBottom: 46,
                  }}
                >
                  {mealsTypes &&
                    mealsTypes.map((el) => (
                      <Chip
                        chipBgColor={chipColor}
                        setChipsState={setMeals}
                        state={el.isUsers}
                        title={el.name}
                        key={el.id}
                      />
                    ))}
                </View>
              </View>
            </>
          )}
          <Button
            label="SAVE CHANGES"
            onPress={() =>
              saveFilterConfig(
                {
                  intolerances: chipsState,
                  diets: radioState,
                  meals: mealsTypes,
                },
                false
              )
            }
            style={styles.saveBtn}
          />
        </View>
      </ScrollView>
    </View>
  );
}

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
  intolerances_text: {
    fontWeight: "500",
    fontSize: 20,
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 22,
  },
});
