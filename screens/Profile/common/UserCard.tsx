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
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Col, Font, Spacing } from "../../../components/Config";
import server from "../../../server";

interface Props {
  image: string | null;
  name: string;
  email: string;
  onUpdate: () => void;
}

const UserCard: FC<Props> = ({ image, name, email, onUpdate }) => {
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
    const response = await server.upload(uri);
    if (response) {
      //AsyncStorage.mergeItem("@user", JSON.stringify({ userAvatar: uri }));
      onUpdate();
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
          <Image
            style={styles.image}
            source={{
              uri: "https://logisticbrocker.hopto.org/eat-beat/" + image,
            }}
          />
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
    borderRadius: 36,
    overflow: "hidden",
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
