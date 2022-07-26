import React, { FC, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { Col, Spacing } from "../../../components/Config";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import Text from "../../../components/custom/Typography";

interface Props {
  label: string;
  onEdit: (value: string, newValue: string) => void;
}

const EditPassword: FC<Props> = ({ label, onEdit }) => {
  const [value, setValue] = useState(null);
  const [newValue, setNewValue] = useState(null);
  const [edit, setEdit] = useState(false);
  const onSubmit = () => {
    if (value?.length > 5 && value !== newValue && newValue?.length > 5) {
      onEdit(value, newValue);
    }
    
    setEdit(!edit);
    setValue(null);
    setNewValue(null);
    if(newValue?.length < 6 && newValue !== null) {
      return Alert.alert(
        "error",
        "new password length is less than 6 symbols",
      );
    }
    if(value?.length < 6 && value !== null) {
      return Alert.alert(
        "error",
        "old password length is less than 6 symbols",
      );
    } 
  };
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{label}</Text>
        <TextInput
          maxLength={50}
          value={value || ''}
          editable={edit}
          style={edit ? styles.editInput : styles.textInput}
          secureTextEntry={!edit}
          placeholder={edit ? "Old Password" : "******"}
          onChangeText={(val) => setValue(val)}
        />
        {edit ? (
          <TextInput
            maxLength={50}
            value={newValue || ''}
            style={styles.editInput}
            secureTextEntry={true}
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
    fontFamily: "Roboto_400Regular",
  },
  editInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    color: Col.Black,
    padding: Spacing.tiny,
    borderColor: Col.Inactive,
    fontFamily: "Roboto_400Regular",
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
