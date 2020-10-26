import React, { useState, useMemo, useEffect } from "react";
import setAxios from "./utils/axios.config";
import Loader from './components/Loader';
import Splash from "./screens/SplashScreen";
import { Auth, DrawerNavigator as Main } from "./navigation/Navigation";
import { AppContext } from "./components/AppContext";
import { Cal, Memo } from "./components/interfaces";
import AsyncStorage from "@react-native-community/async-storage";

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(true);
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [cal, setCal] = useState<Cal>({
    visible: false,
    date: new Date(),
  });
  const [userData, setUserData] = useState<object>({});

  const appContext = useMemo(
    (): Memo => ({
      calendar: cal,
      saveCal: (value) => setCal(value),
      login: () => setLogged(true),
      signOut: () => console.log("sign out"),
      getData: () => console.log("get data"),
      pushData: () => console.log("push data"),
      isFetching: (value) => setLoading(value)
    }),
    [cal]
  );

  useEffect(() => {
    setAxios();
    (async ()=> {
      const token =  await AsyncStorage.getItem('accessToken');
      if(token) appContext.login()
    })()
  }, []);

  return (
    <AppContext.Provider value={appContext}>
      {loaded ? logged ? <Main /> : <Auth /> : <Splash />}
    </AppContext.Provider>
  );
}
// Reminder Notes
