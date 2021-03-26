import React, { FC, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Col, Spacing } from "./Config";
import RadioInput from "./custom/RadioInput";
import { Text } from "./custom/Typography";

interface Props {
  visible: boolean;
  onClick: (value: number) => void;
  onClose: () => void;
}

const RadioInputs = [
  { label: "Recommend a Recipe", value: 0, disabled: false },
  { label: "Recommend a Dish", value: 1, disabled: false },
  { label: "Add a Snack", value: 2, disabled: false },
];

const ActionModal: FC<Props> = ({ visible, onClick, onClose }) => {
  const [select, setSelect] = useState<number>(0);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.header} type="h6">
            Your Next Meal
          </Text>
          {RadioInputs.map((item) => (
            <RadioInput
              key={item.value}
              value={item.value}
              label={item.label}
              disabled={item.disabled}
              selected={select}
              onSelect={(value) => setSelect(value)}
            />
          ))}
          <View style={styles.buttons}>
            <Pressable onPress={onClose}>
              <Text type="sub" style={{ color: Col.Black }}>
                CANCEL
              </Text>
            </Pressable>
            <Pressable onPress={() => onClick(select)}>
              <Text type="sub" style={{ color: Col.Black }}>
                ADD
              </Text>
            </Pressable>
          </View>
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

export default ActionModal;
