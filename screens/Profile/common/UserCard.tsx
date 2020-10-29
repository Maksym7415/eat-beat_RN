import React, { FC, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import SvgMaker from "../../../components/SvgMaker";
import * as ImageManipulator from "expo-image-manipulator";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Col, Font, Spacing } from "../../../components/Config";
import server from "../../../server";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
  image: string | null;
  name: string;
  email: string;
}

const UserCard: FC<Props> = ({ image, name, email }) => {
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      uploadAvatar(result.uri);
    }
  };

  const uploadAvatar = async (uri: string) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 400, height: 400 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    const avResponse = await fetch(uri);
    const avBlob = await avResponse.blob();
    const form = new FormData();
    form.append("file", avBlob);
    const response = await server.upload(form);
    if (response.ok) {
      AsyncStorage.mergeItem("@user", JSON.stringify({ userAvatar: uri }));
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pickAvatar}
        style={styles.imagePickerContainer}
      >
        {image === null ? (
          <SvgMaker name="camera" />
        ) : (
          <Image style={styles.image} source={{ uri: image }} />
        )}
        <View style={styles.imageEditor}>
          <Icon name="edit" size={16} color={Col.White} />
        </View>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <TextInput
          value={name}
          editable={edit}
          style={edit ? styles.editInput : styles.nameInput}
        />
        <TextInput
          value={email}
          editable={edit}
          style={edit ? styles.editInput : styles.emailInput}
        />
      </View>
      <TouchableOpacity onPress={() => setEdit(!edit)} style={styles.button}>
        <Icon name="edit" size={20} color={Col.Black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: Spacing.medium,
    alignItems: "center",
  },
  imagePickerContainer: {
    width: 72,
    height: 72,
    backgroundColor: "rgba(218, 221, 223, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 36,
  },
  imageEditor: {
    backgroundColor: Col.Black,
    padding: 7,
    borderRadius: 24,
    position: "absolute",
    right: -6,
    bottom: -6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  nameInput: {
    fontFamily: "Inter_500Medium",
    fontSize: 18,
  },
  editInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    padding: Spacing.tiny,
    borderColor: Col.Inactive,
    fontFamily: "Inter_400Regular",
  },
  emailInput: {
    fontFamily: Font,
    fontWeight: "400",
    fontSize: 14,
  },
  detailsContainer: {
    paddingHorizontal: Spacing.medium,
    flex: 1,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default UserCard;
