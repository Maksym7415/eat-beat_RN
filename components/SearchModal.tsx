import React, { useRef } from "react";
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
  page
}: any) {

  const ref = useRef<TextInput>();

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onShow={() => {
      if (ref.current) {
        ref.current.focus()
      }
    }}>
      <View style={styles[`container${page}`]}>
        <Icon
          onPress={hideModal}
          name={"arrow-back"}
          color={Col.White}
          size={24}
        />
        <TextInput
          ref={ref}
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
  containerrecipes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Col.Recipes,
    padding: Spacing.medium,
  },
  containerrestaurants: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Col.Restaurants,
    padding: Spacing.medium,
  },
  containersnacks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Col.Snacks,
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
