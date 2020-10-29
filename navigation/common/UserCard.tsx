import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Col, Spacing } from "../../components/Config";

const UserCard = () => {
  const [user, setUser] = useState({
    email: "mama@mail.com",
    avatar:
      "https://images.unsplash.com/photo-1603723815349-2117d3a5394a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  });
  const getAvatar = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (data) setUser(JSON.parse(data));
  };
  useEffect(() => {
    getAvatar();
  }, []);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: user.avatar }} />
      <Text style={styles.text}>{user.email}</Text>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
    backgroundColor: Col.Main,
  },
  text: {
    color: Col.White,
    marginTop: Spacing.medium,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    marginTop: Spacing.large,
  },
});
