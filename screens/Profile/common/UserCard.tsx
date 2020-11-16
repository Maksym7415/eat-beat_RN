import React, { FC, useEffect, useState } from "react";
import {
  Alert,
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
import Text from "../../../components/custom/Typography";

interface Props {
  image: string | null;
  name: string;
  email: string;
  onUpdate: () => void;
}

const UserCard: FC<Props> = ({ image, name, email, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [userName, setUserName] = useState(name);
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const checkPermission = async () => {
    const { granted } = await ImagePicker.getCameraRollPermissionsAsync();
    if (granted) {
      pickAvatar();
    } else {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status === "granted") {
        pickAvatar();
      } else {
        Alert.alert(
          "Access Permission",
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    }
  };

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

  const submitChange = async () => {
    setEdit(!edit);
    if (userName !== name) {
      const response = await server.updateProfile({ name: userName });
      response ? onUpdate() : setUserName(name);
    }
  };

  useEffect(() => {
    setUserName(name);
  }, [name]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={checkPermission}
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
          autoFocus={edit}
          value={userName}
          editable={edit}
          maxLength={64}
          style={edit ? styles.editInput : styles.nameInput}
          onChangeText={(val) => setUserName(val)}
        />
        <Text type="body2">{email}</Text>
      </View>
      <TouchableOpacity onPress={submitChange} style={styles.button}>
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
    color: Col.Black,
    fontFamily: "Inter_500Medium",
    fontSize: 18,
  },
  editInput: {
    color: Col.Black,
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
