import React, { FC } from "react";
import Header from "./Header";
import { Modal } from "react-native";
import { Col } from "./Config";
import { ScrollView } from "react-native-gesture-handler";
import UserSettings from "./UserSettings";
import { recipeSettings } from "./interfaces";

interface Filter {
  meals: string;
  diets: string;
  intolerances: string;
}

interface Props {
  data: recipeSettings;
  modalVisible: boolean;
  constaintNumber: number;
  hideModal: (value: boolean) => void;
  saveFilterData: (value: Filter) => void;
}

const FilterModal: FC<Props> = ({
  modalVisible,
  hideModal,
  data,
  saveFilterData,
  constaintNumber,
}) => {
  const saveFilterConfig = ({
    intolerances,
    diets,
    mealTypes,
  }: recipeSettings) => {
    saveFilterData({
      meals: mealTypes
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(" ,"),
      intolerances: intolerances
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(" ,"),
      diets: diets
        .filter((el) => el.isUsers)
        .map((el) => el.name.toLowerCase())
        .join(""),
    });
    hideModal(true);
  };
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <ScrollView>
        {/* <Header
          hideModal={hideModal}
          name={`Constraint(${constaintNumber})`}
          showInput={false}
        /> */}
        <UserSettings
          data={data}
          blend={Col.Green}
          onSave={saveFilterConfig}
          showMealsTypes={false}
        />
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
