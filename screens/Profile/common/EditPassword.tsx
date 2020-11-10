import React, { FC, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Col, Spacing } from "../../../components/Config";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import Text from "../../../components/custom/Typography";

interface Props {
  label: string;
  onEdit: (value: string, newValue: string) => void;
}

const EditPassword: FC<Props> = ({ label, onEdit }) => {
  const [value, setValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [edit, setEdit] = useState(false);
  const onSubmit = () => {
    if (value.length > 5 && value !== newValue && newValue.length > 5) {
      onEdit(value, newValue);
    }
    setEdit(!edit);
    setValue("");
    setNewValue("");
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
          placeholder={edit ? "Old Password" : "******"}
          onChangeText={(val) => setValue(val)}
        />
        {edit ? (
          <TextInput
            value={newValue}
            style={edit ? styles.editInput : styles.textInput}
            secureTextEntry={!edit}
            placeholder="New Password"
            onChangeText={(val) => setNewValue(val)}
          />
        ) : (
          <View />
        )}
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
export default EditPassword;
