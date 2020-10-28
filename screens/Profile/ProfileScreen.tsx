import React, { Component } from "react";
import axios from "axios";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Col, Spacing } from "../../components/Config";
import { Divider } from "../../components/MyComponents";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import UserCard from "./common/UserCard";
import PopUp from "../../components/PopUp";
import server from "../../server";

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
    const response = await server.getProfile();
    const { ok, data, status, problem, config } = response;
    ok
      ? this.setState({ data })
      : Alert.alert(`${status}`, `${problem}\n${JSON.stringify(config)}`);
    console.log("getProfile => request: ", ok);
  };
  render() {
    const { data, visible } = this.state;
    const { name, userAvatar, email } = data;
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
