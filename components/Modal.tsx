import React, { FC } from "react";
import { StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Spacing, Col } from "./Config";
import { Text } from "./custom/Typography";

interface Props {
  showModal: () => void;
  modalVisible: boolean;
}

const ModalWindow: FC<Props> = ({ showModal, modalVisible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={showModal}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={showModal}>
            <Icon name="close" size={24} color={Col.Black} />
          </TouchableOpacity>
          <Text type="bodyBold" style={{ marginBottom: Spacing.r_small }}>
            Health score
          </Text>
          <Text type="body2">
            {`Health Score is an integral indicator characterising the
proximity of the daily nutrient balance to the recommended intake
norm. The value is calculated per day and includes all registered
foods/meals.

The maximum value is 100 points, the minimum is 0 points.

When calculating the indicator, the following data are taken into
account:
- deviation from the norm for each nutrient
- importance of nutrients (expert opinion of the project
nutritionist)`}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Col.Shadow,
    paddingHorizontal: Spacing.medium,
  },
  modalView: {
    borderRadius: 8,
    shadowColor: "#000",
    padding: Spacing.medium,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingHorizontal: Spacing.small,
  },
});
export default ModalWindow;
