import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import server from "../../server";
import UserSettings from "../../components/UserSettings";
import { recipeSettings, Fetching } from "../../components/interfaces";
import { Col } from "../../components/Config";

export default function FoodPreferences({ navigation }) {
  const [filter, setFilter] = useState<recipeSettings | null>(null);
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
  });

  const getSearchFilter = async () => {
    const response = await server.getSearchFilter();
    if (response.ok) {
      setFilter(response.data);
      setFetching({ clicked: false, deactivate: false });
    }
  };

  const saveFilterConfig = async ({ intolerances, diets }: recipeSettings) => {
    setFetching({ clicked: true, deactivate: true });
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
          fetching={fetching}
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
    backgroundColor: Col.White,
  },
});
