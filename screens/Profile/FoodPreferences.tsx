import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import server from "../../server";
import UserSettings from "../../components/UserSettings";
import { recipeSettings, Fetching, Memo } from "../../components/interfaces";
import { Col } from "../../components/Config";
import { AppContext } from "../../components/AppContext";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export default function FoodPreferences({ navigation }) {
  const [filter, setFilter] = useState<recipeSettings | null>(null);
  const { getRecomendation } = useContext<Memo>(AppContext);
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
  });

  const getSearchFilter = async () => {
    const response = await server.getSearchFilter();
    if (response.ok) {
      getRecomendation(true);
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
