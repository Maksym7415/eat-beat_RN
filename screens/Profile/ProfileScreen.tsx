import React, { Component } from "react";
import axios from "axios";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Col, Spacing } from "../../components/Config";
import { Divider } from "../../components/MyComponents";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import UserCard from "./common/UserCard";
import PopUp from "../../components/PopUp";

export default class ProfileScreen extends Component {
  state = {
    visible: true,
    data: {
      name: "",
      email: "",
      userAvatar: null,
    },
  };
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {
    const address = `/user/profile-data`;
    try {
      const { data } = await axios(address);
      this.setState({ data });
    } catch (error) {
      Alert.alert("Request failed with status code 404");
      console.log(error);
    }
  };
  render() {
    const { data, visible } = this.state;
    const { name, userAvatar, email } = data;
    const bb = "Amaranth Breakfast Porridge with Blueberry Compote";
    return (
      <View style={styles.canvas}>
        <ScrollView>
          <UserCard name={name} image={userAvatar} email={email} />
          <Divider />
          <Divider />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: Col.White,
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
    padding: 5,
    borderRadius: 24,
    position: "absolute",
    right: -4,
    bottom: -4,
  },
});
