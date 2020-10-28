import React, { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Col, Spacing } from "../../components/Config";
import CookedMealCard from "../../components/CookedMealCard";
import { Memo, NavProps } from "../../components/interfaces";
import { AppContext } from "../../components/AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "../../components/custom/Typography";
import EditModal from '../../components/EditModal';
import PopUp from "../../components/PopUp";
import server from "../../server";

interface ModalData {
  id: number
  name: string
  time: string
  servings: string
  modalVisible: boolean
  creationTime: number

}

const MealsScreen: FC<NavProps> = ({ navigation }) => {
  const [feed, setFeed] = useState(null);
  const [select, setSelect] = useState(null);
  const [popVisible, setPopVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    name: "",
    time: "",
    servings: "",
    modalVisible: false,
    creationTime: 0
  });
  const { calendar, saveCal } = useContext<Memo>(AppContext);
  const { visible, date } = calendar;

  const serveData = async () => {
    const response = await server.getCookedMeals(date);
    response.ok
      ? setFeed(response.data)
      : Alert.alert(
          response.status?.toString(),
          `${response.problem}\n${JSON.stringify(response.config)}`
        );
    console.log("getCookedMeals => request: ", response.ok);
  };

  useEffect(() => {
    serveData();
  }, [date]);

  useEffect(() => {
    if (modalData.modalVisible || modalData.cancel) return;
    serveData();
  }, [modalData.modalVisible]);

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    saveCal({ visible: false, date: currentDate });
  };

  const actionHandler = async (id: number, name: string, time: string, servings: number, creationTime: number) => {
    if(name) {
      return setModalData({
        id, 
        name, 
        time, 
        servings: servings + '', 
        modalVisible: true, 
        creationTime, 
      })
    }
    await axios.delete(`/meals/cooked-meal/${id}`)
    serveData()
  }


  return (
    <View style={styles.container}>
      <EditModal {...modalData} setModalData={setModalData} />
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
            item={item}
            actionHandler={actionHandler}
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
