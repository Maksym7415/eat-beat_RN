import React, { FC, useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Col, Spacing } from "../../components/Config";
import CookedMealCard from "../../components/CookedMealCard";
import { Memo, NavProps } from "../../components/interfaces";
import { AppContext } from "../../components/AppContext";
import { Text } from "../../components/custom/Typography";
import EditModal from "../../components/EditModal";
import PopUp from "../../components/PopUp";
import server from "../../server";
import ActionButton from "./common/ActionButton";
import ActionModal from "../../components/ActionModal";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

interface ModalData {
  id: number;
  name: string;
  servings: number;
  modalVisible: boolean;
  creationTime: number;
}

interface editProps {
  id: number;
  name: string;
  servings: number;
  creationTime: number;
}
let Busy = false;

const recommendScreens = {
  0: 'recommendedRecipe',
  1: 'recommendedRestaurant',
  2: 'SnacksPopular'
}

const screens = {
  'recipe': Col.Green,
  'restaurant': Col.Grey5,
  'snack': Col.Snacks
} 


const MealsScreen: FC<NavProps> = ({ navigation, route }) => {
  const [feed, setFeed] = useState(null);
  const [popAlert, setPopAlert] = useState({ visible: false, name: "", id: 0, source: '' });
  const [actionBtn, setActionBtn] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    name: "",
    servings: 0,
    modalVisible: false,
    creationTime: 0,
  });
  const { calendar, refresh, isFetching } = useContext<Memo>(AppContext);
  const { date } = calendar;

  const serveData = async () => {
    const response = await server.getCookedMeals(date);
    if (response.ok) setFeed(response.data);
  };

  const deleteHandler = async () => {
    await server.delCookedMeal(popAlert.id, {source: popAlert.source});
    Busy = false;
    setPopAlert({ ...popAlert, visible: false });
    isFetching();
  };

  const addRecommended = (value: number) => {
    setActionBtn(false);
    navigation.navigate(recommendScreens[value], {clear: false});
  };

  const updateMeal = async (id, body) => {
    await server.updateCookedMeal(id, body);
    setModalData({ ...modalData, modalVisible: false });
    isFetching();
  };

  const onPreview = (item) => {
    const instructions = item.instructions
      ? item.instructions.replace(/(<([^>]+)>)/g, "\n")
      : "";
    const page = item.source
    const data = {
      recipe: {
        page: 'recipes',
        data: {...item, instructions: instructions || item.description, nutrients: item.nutrients},
        previewScreen: 'previewPage'
      },
      restaurant: {
        page: 'restaurants',
        data: {...item, instructions: instructions || item.description, nutrients: item.nutrients},
        previewScreen: 'previewPage'
      },
      snack: {
        page: 'snacks',
        data: {...item, instructions: '', nutrients: item.nutrients, ingredients: [], price: 0},
        previewScreen: 'previewSnack'
      }
    }
    navigation.push(data[page].previewScreen, {
      title: item.name,
      details: {page: data[page].page },
      item: { from: 'mealsScreen', meal: data[page].data, id: item.id,  },
    });
  };

  useEffect(() => {
    serveData();
  }, [date, refresh]);

  let focus = useIsFocused();
  useEffect(() => {
    if (focus) serveData();
  }, [focus]);

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
        date={modalData.creationTime}
        data={modalData}
        setData={(id, body) => updateMeal(id, body)}
        hideModal={() => setModalData({ ...modalData, modalVisible: false })}
        blend={Col.Main}
      />
      <PopUp
        header="Delete"
        body={`Delete “${popAlert.name}”?`}
        right="DELETE"
        onLeft={() => setPopAlert({ ...popAlert, visible: false })}
        onRight={deleteHandler}
        visible={popAlert.visible}
      />
      {feed.length ? <ScrollView>
        {feed.map((item, key) => (
          <CookedMealCard
          key={key}
          item={item}
          bgColor={item.isPartner ? Col.Main : screens[item.source]}
          actionHandler={(props: editProps) =>
            setModalData({ ...props, modalVisible: true })
          }
          onClick={() => onPreview(item)}
          onDelete={(id, name, source) => {
            if (!Busy) setPopAlert({ id, name, visible: true, source });
          }}
        />
        ))}
      </ScrollView> : <EmptyList/>}
      {/* <FlatList
        data={feed}
        ListEmptyComponent={() => <EmptyList />}
        // keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => 
         (
          
        )}
      /> */}
    </View>
  );
};

const EmptyList: FC = () => (
  <View style={styles.emptyList}>
    <Text>nothing to display</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
    backgroundColor: Col.Background,
  },
  emptyList: {
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
