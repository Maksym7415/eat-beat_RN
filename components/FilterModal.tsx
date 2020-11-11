import React, { FC, useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Col, Spacing } from "./Config";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import UserSettings from "./UserSettings";
import { recipeSettings } from "./interfaces";
import Text from "./custom/Typography";

interface Props {
  data: recipeSettings;
  modalVisible: boolean;
  constaintNumber: number;
  hideModal: () => void;
  saveFilterData: (value: recipeSettings) => void;
}

const FilterModal: FC<Props> = ({
  modalVisible,
  hideModal,
  data,
  saveFilterData,
  constaintNumber,
  fetching,
}) => {
  const saveFilterConfig = (value: recipeSettings) => {
    saveFilterData(value);
    hideModal();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.container}>
        <Icon
          onPress={hideModal}
          name={"arrow-back"}
          color={Col.White}
          size={24}
        />
        <Text
          type="h6"
          style={styles.text}
        >{`Constraint(${constaintNumber})`}</Text>
      </View>
      <UserSettings
        data={data}
        blend={Col.Recipes}
        onSave={saveFilterConfig}
        showMealsTypes={true}
        backgroundColor={Col.Background}
        fetching={fetching}
      />
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Col.Recipes,
    padding: Spacing.medium,
  },
  input: {
    width: "60%",
    color: Col.White,
    borderBottomColor: Col.White,
    borderBottomWidth: 1,
  },
  text: {
    width: "80%",
    color: Col.White,
    alignSelf: "center",
  },
});

export default FilterModal;
