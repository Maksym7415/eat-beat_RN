import React, { FC, useContext } from "react";
import { View } from "react-native";
import { AppContext } from "../components/AppContext";

const GetOut = () => {
  const { signOut } = useContext(AppContext);
  signOut();
  return <View />;
};
export default GetOut;
