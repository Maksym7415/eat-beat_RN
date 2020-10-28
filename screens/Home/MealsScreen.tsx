import React, { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import { FlatList, StyleSheet, View } from "react-native";
import { Col, Spacing } from "../../components/Config";
import CookedMealCard from "../../components/CookedMealCard";
import { Memo, NavProps } from "../../components/interfaces";
import { AppContext } from "../../components/AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "../../components/custom/Typography";
import EditModal from '../../components/EditModal';

interface ModalData {
  id: number
  name: string
  time: string
  servings: string
  modalVisible: boolean
}

const MealsScreen: FC<NavProps> = ({ navigation }) => {
  const [feed, setFeed] = useState(null);
 // const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    name: '',
    time: '',
    servings: 0,
    modalVisible: false
  })
  const { calendar, saveCal } = useContext<Memo>(AppContext);
  const { visible, date } = calendar;

  const getCalendar = (value: Date) => {
    return value.toJSON().toString().slice(0, 10);
  };

  const getCookedMeals = async () => {
    const address = `/meals/cooked-meals?date=2020-01-01`;
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

  const onDelete = async (id, name, time, servings) => {
    if(name) {
      return setModalData({id, name, time, servings: servings + '', modalVisible: true })
    }
    await axios.delete(`/meals/cooked-meal/${id}`)
    getCookedMeals()
  }

  return (
    <View style={styles.container}>
     <EditModal {...modalData} setModalData={setModalData}/>
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
            onDelete={onDelete}
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
