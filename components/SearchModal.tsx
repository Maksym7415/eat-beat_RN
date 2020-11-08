import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing } from "./Config";

export default function SearchModal({
  modalVisible,
  hideModal,
  onChangeHandler,
  value,
  searchHandler,
}: any) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.container}>
        <Icon
          onPress={hideModal}
          name={"arrow-back"}
          color={Col.White}
          size={24}
        />
        <TextInput
          autoFocus
          value={value}
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={Col.Grey}
          onChangeText={onChangeHandler}
          onSubmitEditing={searchHandler}
        />
        <Icon
          onPress={searchHandler}
          name={"search"}
          color={Col.White}
          size={24}
        />
      </View>
      <TouchableWithoutFeedback onPress={hideModal}>
        <View style={styles.canvas} />
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    opacity: 0.7,
    backgroundColor: Col.Background,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Col.Recipes,
    padding: Spacing.medium,
  },
  input: {
    width: "70%",
    borderRadius: 4,
    backgroundColor: "white",
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.medium,
    fontFamily: "Roboto",
    fontWeight: "400",
    color: Col.Black,
  },
});
