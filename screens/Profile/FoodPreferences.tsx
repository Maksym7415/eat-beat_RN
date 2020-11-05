import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import server from "../../server";
import UserSettings from "../../components/UserSettings";

export default function FoodPreferences() {
  const [filter, setFilter] = useState<object>({});
  const [radioState, setRadioState] = useState<object>([]);
  const [chipsState, setChipsState] = useState<object>([]);
  const [mealsTypes, setMealsTypes] = useState<object>([]);
  const saveFilterConfig = async ({ intolerances, diets }) => {
    const response = await server.updateUserReferences({
      intolerances: intolerances.filter((el) => el.isUsers).map((el) => el.id),
      diet: diets.filter((el) => el.isUsers)[0].id,
    });
    setFilter(response);
  };

  useEffect(() => {
    const getSearchFilter = async () => {
      const data = await server.getSearchFilter();
      setFilter(data);
    };
    getSearchFilter();
  }, []);

  useEffect(() => {
    setRadioState(filter.diets);
    setChipsState(filter.intolerances);
  }, [filter]);

  return (
    <View style={{ flex: 1 }}>
      <UserSettings
        data={filter}
        saveFilterConfig={saveFilterConfig}
        btnColor={"#616161"}
        chipColor={"#616161"}
        radioBtn={"#616161"}
        saveFilterData={saveFilterConfig}
        radioState={radioState}
        setRadioState={setRadioState}
        chipsState={chipsState}
        setChipsState={setChipsState}
        mealsTypes={mealsTypes}
        setMealsTypes={setMealsTypes}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
