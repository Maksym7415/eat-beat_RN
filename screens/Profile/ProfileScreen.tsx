import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Col, Spacing } from "../../components/Config";
import { Button, Divider } from "../../components/MyComponents";
import UserCard from "./common/UserCard";
import PopUp from "../../components/PopUp";
import server from "../../server";
import UserPlan from "./common/UserPlan";
import { NavProps } from "../../components/interfaces";
import { AppContext } from "../../components/AppContext";
import EditPassword from "./common/EditPassword";

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
    this.setState({ data: update });
  };

  onLogout = () => {
    this.context.signOut();
    // const data = this.context.myData;
    // this.setState({ data });
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

  onChangePassword = async (oldPassword: string, newPassword: string) => {
    const response = await server.changePassword({ oldPassword, newPassword });
    Alert.alert(
      "Change Password",
      response.ok
        ? "You have successfully changed your password"
        : `${response.data.message}`
    );
  };

  componentDidMount = async () => {
    const data = this.context.myData;
    data.id === 0 ? this.onUpdate() : this.setState({ data });
  };

  componentWillUnmount = () => {
    //
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
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
                onPress={() => console.log("SEE MORE PLANS")}
                style={styles.button}
                labelStyle={styles.btnLabel}
              />
            </View>
            <Divider />
            <EditPassword label="Password" onEdit={this.onChangePassword} />
          </View>
          <View style={styles.bottom}>
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
  bottom: {
    marginVertical: Spacing.medium,
  },
});
