import React, { FC } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Col, Spacing } from "./Config";

interface Props {
  visible: boolean;
}

const ModalCommon: FC<Props> = ({ visible, children}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: Spacing.small,
    color: Col.Black,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: Spacing.medium,
  },
  modalView: {
    width: "100%",
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
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.small,
    marginTop: Spacing.large,
    justifyContent: "space-around",
  },
});

export default ModalCommon;
