import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Col, Spacing, Typ } from "./Config";
import Chip from "./custom/Chip";
import RadioBtn from "./Radio";
import { Divider } from "./MyComponents";
import Button from "./custom/ConfirmationButton";

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
    <View>
      <ScrollView>
        <View
          style={{
            backgroundColor: Col.Back3,
            paddingHorizontal: 16,
            height: Dimensions.get("window").height,
          }}
        >
          <View style={styles.intolerances}>
            <Text style={styles.intolerances_text}>Intolerances</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 22,
              }}
            >
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
            <Text style={styles.intolerances_text}>Diet</Text>
            <View style={{ marginTop: 22 }}>
              {radioState &&
                radioState.map((el) => (
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
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 16,
          position: "absolute",
          width: "100%",
          bottom: 46,
        }}
      >
        <Button
          title={"Save changes"}
          bckColor={btnColor}
          textColor={Col.White}
          fts={Typ.Small}
          ftw={"500"}
          onClickHandler={() =>
            saveFilterConfig(
              {
                intolerances: chipsState,
                diets: radioState,
                meals: mealsTypes,
              },
              false
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  intolerances: {
    marginTop: 26,
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
});
