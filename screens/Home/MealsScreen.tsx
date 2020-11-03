import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Col, Spacing } from "../../components/Config";
import CookedMealCard from "../../components/CookedMealCard";
import { Memo, NavProps } from "../../components/interfaces";
import { AppContext } from "../../components/AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "../../components/custom/Typography";
import EditModal from "../../components/newEditModal";
import PopUp from "../../components/PopUp";
import server from "../../server";
import { useFocusEffect } from "@react-navigation/native";
import ActionButton from "./common/ActionButton";
import ActionModal from "../../components/ActionModal";

interface ModalData {
  id: number;
  name: string;
  servings: number;
  modalVisible: boolean;
  creationTime: number;
}

type Ev = SyntheticEvent<Readonly<{ timestamp: number }>, Event>;

const MealsScreen: FC<NavProps> = ({ navigation, route }) => {
  console.log(route.params);
  const [feed, setFeed] = useState(null);
  const [popAlert, setPopAlert] = useState({ visible: false, name: "", id: 0 });
  const [actionBtn, setActionBtn] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    name: "",
    servings: 0,
    modalVisible: false,
    creationTime: 0,
  });
  const { calendar, saveCal } = useContext<Memo>(AppContext);
  const { visible, date } = calendar;

  const serveData = async () => {
    console.log("----------------------------\nserve meals");
    const response = await server.getCookedMeals(date);
    if (response.ok) setFeed(response.data);
  };

  const onChange = (event: Ev, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    saveCal({ visible: false, date: currentDate });
  };

  const actionHandler = (id, name, servings, creationTime) => {
    setModalData({
      id,
      name,
      servings,
      creationTime,
      modalVisible: true,
    });
  };

  const deleteHandler = async () => {
    await server.delCookedMeal(popAlert.id);
    setPopAlert({ ...popAlert, visible: false });
    serveData();
  };

  const addRecommended = (value: number) => {
    setActionBtn(false);
    navigation.navigate("recommendedDrawer");
  };

  const updateMeal = async (id, { creationTime, servings }) => {
    await server.updateCookedMeal(id, {
      servings,
      creationTime,
    });
    setModalData({ ...modalData, modalVisible: false });
    serveData();
  };

  useEffect(() => {
    serveData();
  }, [date]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.refresh) {
        navigation.setParams({ refresh: false });
        serveData();
      }
    }, [route.params])
  );
  return (
    <View style={styles.container}>
      <ActionButton
        style={styles.actionButton}
        onPress={() => setActionBtn(!actionBtn)}
      />
      <ActionModal
        visible={actionBtn}
        onClick={(value: number) => addRecommended(value)}
        onClose={() => setActionBtn(false)}
      />
      <EditModal
        data={modalData}
        setData={(id, body) => updateMeal(id, body)}
        hideModal={() => setModalData({ ...modalData, modalVisible: false })}
      />
      <PopUp
        header="Delete"
        body={`Delete “${popAlert.name}”?`}
        right="DELETE"
        onLeft={() => setPopAlert({ ...popAlert, visible: false })}
        onRight={deleteHandler}
        visible={popAlert.visible}
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
            onDelete={(id, name) => setPopAlert({ id, name, visible: true })}
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
  actionButton: {
    zIndex: 1,
    position: "absolute",
    right: Spacing.medium,
    bottom: Spacing.large,
  },
});

export default MealsScreen;
