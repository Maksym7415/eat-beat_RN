import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Weight, Typ, Spacing } from "./Config";

export default function ModalWindow({ showModal, modalVisible }) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => showModal(false)}
          >
            <MaterialIcons name="close" size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Health score</Text>
          <Text style={styles.description}>
            {`
  Health Score is an integral indicator characterising the
  proximity of the daily nutrient balance to the recommended intake
  norm. The value is calculated per day and includes all registered
  foods/meals.

  The maximum value is 100 points, the minimum is 0 points.

  When calculating the indicator, the following data are taken into
  account:
  - deviation from the norm for each nutrient
  - importance of nutrients (expert opinion of the project
  nutritionist)
`}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: Spacing.medium,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: Spacing.medium,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: "Roboto",
    fontWeight: Weight.Bold,
    fontSize: Typ.Normal,
  },
  description: {
    fontFamily: "Roboto",
    fontWeight: Weight.Normal,
    fontSize: Typ.Small,
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingHorizontal: Spacing.small,
  },
});
