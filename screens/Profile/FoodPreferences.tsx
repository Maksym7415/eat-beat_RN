import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import server from "../../server";
import UserSettings from "../../components/UserSettings";
import { recipeSettings } from "../../components/interfaces";
import { Col } from "../../components/Config";

export default function FoodPreferences() {
  const [filter, setFilter] = useState<recipeSettings | null>(null);

  const getSearchFilter = async () => {
    const data = await server.getSearchFilter();
    setFilter(data);
  };

  const saveFilterConfig = async ({ intolerances, diets }: recipeSettings) => {
    const response = await server.updateUserReferences({
      intolerances: intolerances.filter((el) => el.isUsers).map((el) => el.id),
      diet: diets.filter((el) => el.isUsers)[0].id,
    });
    if (response) getSearchFilter();
  };

  useEffect(() => {
    getSearchFilter();
  }, []);

  return (
    <View style={styles.container}>
      {filter ? (
        <UserSettings
          data={filter}
          blend={Col.Grey}
          onSave={saveFilterConfig}
          showMealsTypes={false}
        />
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Col.Background,
  },
});
