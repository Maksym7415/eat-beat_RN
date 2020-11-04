import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Col, Spacing } from "../../components/Config";
import { Button, Divider } from "../../components/MyComponents";
import UserCard from "./common/UserCard";
import PopUp from "../../components/PopUp";
import server from "../../server";
import UserPlan from "./common/UserPlan";
import EditFeild from "./common/EditFeild";
import { NavProps } from "../../components/interfaces";
import { AppContext } from "../../components/AppContext";

export default class ProfileScreen extends Component<NavProps> {
  static contextType = AppContext;
  state = {
    visible: true,
    delPopup: false,
    logoutPopup: false,
    data: {
      name: "",
      email: "",
      userAvatar: null,
      createdAt: "-",
    },
  };
  constructor(props: NavProps) {
    super(props);
  }

  onUpdate = async () => {
    const update = await this.context.getData();
    console.log("updates", update);
    this.setState({ data: update });
    //await this.context.login();
    // const response = await server.getProfile();
    // const { ok, data, status } = response;
    // if (ok) {
    //   this.setState({ data });
    //   await AsyncStorage.setItem("@user", JSON.stringify(data));
    // } else {
    //   Alert.alert(`${status}`, `${JSON.stringify(data)}`);
    // }
    // console.log("getProfile => request: ", ok, data);
  };

  onLogout = () => {
    this.context.signOut();
    const data = this.context.myData;
    this.setState({ data });
  };

  onDeleteAccount = async () => {
    const response = await server.delUser();
    if (response.ok) {
      this.onLogout();
    } else {
      Alert.alert(
        "Something went wrong",
        "Sorry something went wrong while trying to delete your account, please try again!"
      );
    }
  };

  componentDidMount = async () => {
    const data = this.context.myData;
    this.setState({ data });
  };

  render() {
    const { data, delPopup, logoutPopup } = this.state;
    const { name, userAvatar, email, createdAt } = data;
    return (
      <View style={styles.canvas}>
        <PopUp
          visible={delPopup}
          body="Are you sure you want to delete your account?"
          header="Delete Account"
          onRight={this.onDeleteAccount}
          onLeft={() => this.setState({ delPopup: !delPopup })}
          left="No"
          right="Yes"
        />
        <PopUp
          visible={logoutPopup}
          body="Are you sure you want to log out of your account?"
          header="Logout"
          onRight={this.onLogout}
          onLeft={() => this.setState({ logoutPopup: !logoutPopup })}
          left="No"
          right="Yes"
        />
        <ScrollView>
          <View
            style={{
              justifyContent: "space-between",
            }}
          >
            <View>
              <UserCard
                name={name}
                image={userAvatar}
                email={email}
                onUpdate={this.onUpdate}
              />
              <Divider />
              <View style={styles.planContainer}>
                <UserPlan userPlan={createdAt} />
                <Button
                  type="outline"
                  label="SEE MORE PLANS"
                  onPress={() => console.log("hi")}
                  style={styles.button}
                  labelStyle={styles.btnLabel}
                />
              </View>
              <Divider />
              <EditFeild
                label="Password"
                input="123456"
                onEdit={(v) =>
                  this.setState({ data: { ...data, password: v } })
                }
              />
            </View>
            <View>
              <Button
                type="text"
                label="Logout"
                style={styles.authBtn}
                labelStyle={styles.logoutBtn}
                onPress={() => this.setState({ logoutPopup: !logoutPopup })}
              />
              <Button
                type="text"
                label="Delete account"
                style={styles.authBtn}
                labelStyle={styles.deleteBtn}
                onPress={() => this.setState({ delPopup: !delPopup })}
              />
            </View>
          </View>
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
  planContainer: {
    padding: Spacing.medium,
  },
  button: {
    borderColor: Col.Inactive,
    padding: Spacing.r_small,
    marginBottom: 0,
  },
  btnLabel: {
    color: Col.Inactive,
  },
  authBtn: {
    margin: 0,
    marginVertical: 0,
    marginBottom: 0,
  },
  logoutBtn: {
    fontSize: 16,
    color: Col.Grey,
  },
  deleteBtn: {
    fontSize: 16,
    color: Col.Error,
  },
});
