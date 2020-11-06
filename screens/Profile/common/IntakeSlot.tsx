import React, { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Col, Font, Spacing } from "../../../components/Config";
import Text from "../../../components/custom/Typography";
import { MaterialIcons as Icon } from "@expo/vector-icons";

interface Props {
  item: {
    label: string;
    value: number;
    edit: boolean;
  };
  onEdit: (key: string, val: number) => void;
}

const IntakeSlot: FC<Props> = ({ item, onEdit }) => {
  const { label, value, edit } = item;
  const [digit, setDigit] = useState(value.toString());
  const suffix = label === "Calories" ? " (kcal)" : edit ? " (g)" : "";
  return (
    <View style={styles.container}>
      <Text type="body2">{label + suffix}</Text>
      <View style={styles.inputContainer}>
        {edit ? (
          <TextInput
            value={digit}
            keyboardType="number-pad"
            style={styles.inputCanvas}
            onChangeText={(val) => setDigit(val)}
            onEndEditing={() => {
              if (Number(digit) != value) onEdit(label, Number(digit));
            }}
          />
        ) : (
          <Text type="sub" style={styles.inputText}>
            {value}
          </Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginVertical: Spacing.tiny,
    justifyContent: "space-between",
  },
  label: {
    //
  },
  inputContainer: {
    width: "50%",
  },
  inputCanvas: {
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: Font,
    fontWeight: "500",
    borderColor: Col.Inactive,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
  },
  inputText: {
    //
  },
  switch: {
    //
  },
});
export default IntakeSlot;
