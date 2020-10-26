import React, { FC, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SvgMaker from "../../../components/SvgMaker";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Col, Font, Spacing } from "../../../components/Config";

interface Props {
  image: string | null;
  name: string;
  email: string;
}

const UserCard: FC<Props> = ({ image, name, email }) => {
  const [edit, setEdit] = useState();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log("hi")}
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
      <Icon name="edit" size={20} color={Col.Black} />
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
});
export default UserCard;
