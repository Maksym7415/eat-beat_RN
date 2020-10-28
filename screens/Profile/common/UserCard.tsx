import React, { FC, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Axios from "axios";
import * as ImagePicker from "expo-image-picker";
import SvgMaker from "../../../components/SvgMaker";
import * as ImageManipulator from "expo-image-manipulator";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Col, Font, Spacing } from "../../../components/Config";

interface Props {
  image: string | null;
  name: string;
  email: string;
}

const UserCard: FC<Props> = ({ image, name, email }) => {
  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
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
    // upload the original image
    const avResponse = await fetch(manipResult.uri);
    const avBlob = await avResponse.blob();
    console.log(typeof avBlob);
    let formdata = new FormData();
    formdata.append("file", avBlob);
    await Axios.post("/upload", formdata)
      .then((res) => console.log(res))
      .catch((er) => console.log(er));

    // try {
    // } catch (error) {
    //   console.log(error);
    // }
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
        <TextInput value={name} editable={edit} style={styles.nameInput} />
        <TextInput value={email} editable={edit} style={styles.emailInput} />
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
    fontFamily: Font,
    fontWeight: "500",
    fontSize: 18,
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