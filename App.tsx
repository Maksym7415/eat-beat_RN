import React, { useState, useMemo, useEffect } from "react";
import setAxios from "./utils/axios.config";
import Splash from "./screens/SplashScreen";
import { Auth, DrawerNavigator as Main } from "./navigation/Navigation";
import { AppContext } from "./components/AppContext";
import { Cal, Memo } from "./components/interfaces";

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(true);
  const [logged, setLogged] = useState<boolean>(true);
  const [cal, setCal] = useState<Cal>({
    visible: false,
    date: new Date(),
  });
  const [userData, setUserData] = useState<object>({});

  useEffect(() => {
    setAxios();
  }, []);

  const appContext = useMemo(
    (): Memo => ({
      calendar: cal,
      saveCal: (value) => setCal(value),
      login: () => setLogged(true),
      signOut: () => console.log("sign out"),
      getData: () => console.log("get data"),
      pushData: () => console.log("push data"),
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
