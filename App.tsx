import React, { useState, useMemo, useEffect } from "react";
import setAxios from "./utils/axios.config";
import Splash from "./screens/SplashScreen";
import { Auth, DrawerNavigator as Main } from "./navigation/Navigation";
import { AppContext } from "./components/AppContext";
import { Cal, Memo } from "./components/interfaces";
import AsyncStorage from "@react-native-community/async-storage";

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [cal, setCal] = useState<Cal>({
    visible: false,
    date: new Date(),
  });
  const [userData, setUserData] = useState<object>({});

  const loadUser = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      setLogged(true);
    }
    setLoaded(true);
  };

  const removeToken = async () => {
    AsyncStorage.clear();
    setLogged(false);
  };
  useEffect(() => {
    setAxios();
    loadUser();
  }, [logged]);

  const appContext = useMemo(
    (): Memo => ({
      calendar: cal,
      saveCal: (value) => setCal(value),
      login: () => setLogged(true),
      signOut: () => removeToken(),
      getData: () => console.log("get data"),
      pushData: () => console.log("push data"),
      isFetching: (value: boolean) => console.log("hi"),
    }),
    [cal]
  );

  return (
    <AppContext.Provider value={appContext}>
      {loaded ? logged ? <Main /> : <Auth /> : <Splash />}
    </AppContext.Provider>
  );
}
// Reminder Notes
