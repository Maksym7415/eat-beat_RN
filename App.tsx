import React, { useState, useMemo, useEffect } from "react";
import Splash from "./screens/SplashScreen";
import { Auth, DrawerNavigator as Main } from "./navigation/Navigation";
import { AppContext } from "./components/AppContext";
import { Cal, Memo } from "./components/interfaces";
import AsyncStorage from "@react-native-community/async-storage";
import * as Font from "expo-font";
import server from "./server";
import { Alert } from "react-native";

let customFonts = {
  Inter_400Regular: require("./assets/font/Roboto-Regular.ttf"),
  Inter_500Medium: require("./assets/font/Roboto-Medium.ttf"),
  Inter_700Bold: require("./assets/font/Roboto-Bold.ttf"),
};

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [cal, setCal] = useState<Cal>({
    visible: false,
    date: new Date(),
  });
  const [userData, setUserData] = useState<object>({
    email: "",
    userAvatar: "",
  });

  const loadUser = async () => {
    if (logged) return;
    console.log("new log", new Date(), "\n");
    await server.setup();
    const token = await AsyncStorage.getItem("@token");
    const user = await AsyncStorage.getItem("@user");
    if (token) {
      setLogged(true);
    }
    await Font.loadAsync(customFonts);
    if (user) setUserData(JSON.parse(user));
    setLoaded(true);
  };

  const removeToken = async () => {
    AsyncStorage.clear();
    setLogged(false);
  };

  const getUserData = async () => {
    const response = await server.getProfile();
    const { ok, data } = response;
    if (ok) {
      setUserData(data);
      await AsyncStorage.setItem("@user", JSON.stringify(data));
      return data;
    }
  };

  const loginHandler = async () => {
    await getUserData();
    setLogged(true);
  };

  const appContext = useMemo(
    (): Memo => ({
      calendar: cal,
      myData: userData,
      saveCal: (value) => setCal(value),
      login: () => loginHandler(),
      signOut: () => removeToken(),
      getData: () => getUserData(),
      pushData: () => console.log("push data"),
      isFetching: (value: boolean) => console.log("hi"),
      showModal: (value: boolean) => {
        //console.log(value)
        setShow(value);
      },
      isShow: show,
    }),
    [cal, show, userData]
  );

  useEffect(() => {
    loadUser();
  }, [logged]);

  return (
    <AppContext.Provider value={appContext}>
      {loaded ? logged ? <Main /> : <Auth /> : <Splash />}
    </AppContext.Provider>
  );
}
// Reminder Notes
