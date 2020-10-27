import React, { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import { FlatList, StyleSheet, View } from "react-native";
import { Col, Spacing } from "../../components/Config";
import CookedMealCard from "../../components/CookedMealCard";
import { Memo, NavProps } from "../../components/interfaces";
import { AppContext } from "../../components/AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "../../components/custom/Typography";
import PopUp from "../../components/PopUp";

const MealsScreen: FC<NavProps> = ({ navigation }) => {
  const [feed, setFeed] = useState(null);
  const [select, setSelect] = useState(null);
  const [popVisible, setPopVisible] = useState(false);
  const { calendar, saveCal } = useContext<Memo>(AppContext);
  const { visible, date } = calendar;

  const getCalendar = (value: Date) => {
    return value.toJSON().toString().slice(0, 10);
  };

  const getCookedMeals = async () => {
    const address = `/meals/cooked-meals?date=${getCalendar(date)}`;
    try {
      const { data } = await axios(address);
      setFeed(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCookedMeals();
  }, [date]);

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    saveCal({ visible: false, date: currentDate });
  };

  return (
    <View style={styles.container}>
      <PopUp
        header="Delete?"
        body={`Delete “${select}”?`}
        right="DELETE"
        onLeft={() => setPopVisible(false)}
        onRight={() => console.log("false")}
        visible={popVisible}
      />
      {visible ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      ) : (
        <View />
      )}
      <FlatList
        data={feed}
        ListEmptyComponent={() => <EmptyList />}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => (
          <CookedMealCard
            key={item.id}
            item={item}
            onDelete={(id) => console.log(id)}
            onClick={(id) => console.log(id)}
          />
        )}
      />
    </View>
  );
};

const EmptyList: FC = () => (
  <View style={styles.emptyList}>
    <Text>Nothing to display</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
    backgroundColor: Col.Background,
  },
  emptyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default MealsScreen;
