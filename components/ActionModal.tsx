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
  { label: "Recommend a Restaurant Dish", value: 1, disabled: true },
  { label: "Add a Snack", value: 2, disabled: true },
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
              <Text type="sub" style={{ color: Col.Primary }}>
                CANCEL
              </Text>
            </Pressable>
            <Pressable onPress={() => onClick(select)}>
              <Text type="sub" style={{ color: Col.Primary }}>
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
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
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
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: Spacing.small,
    marginTop: Spacing.large,
  },
});

export default ActionModal;
