import React, { FC, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Col, Spacing } from "../../../components/Config";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import Text from "../../../components/custom/Typography";

interface Props {
  label: string;
  input: string;
  onEdit: (value: string) => void;
}

const EditFeild: FC<Props> = ({ label, input, onEdit }) => {
  const [value, setValue] = useState(input);
  const [edit, setEdit] = useState(false);
  const onSubmit = () => {
    value.length < 6 ? setValue(input) : value !== input && onEdit(value);
    setEdit(!edit);
  };
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{label}</Text>
        <TextInput
          value={value}
          editable={edit}
          style={edit ? styles.editInput : styles.textInput}
          secureTextEntry={!edit}
          onChangeText={(val) => setValue(val)}
        />
      </View>
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Icon name="edit" size={20} color={Col.Black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: Spacing.medium,
  },
  infoContainer: {
    flex: 1,
  },
  textInput: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  editInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    padding: Spacing.tiny,
    borderColor: Col.Inactive,
    fontFamily: "Inter_400Regular",
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default EditFeild;
