import React, { useState, useMemo, useEffect } from "react";
import setAxios from "./utils/axios.config";
import Splash from "./screens/SplashScreen";
import { Auth, Main } from "./screens/Navigation";
import { AppContext } from "./components/AppContext";

type Memo = {
  login: () => void;
  signOut: () => void;
  getData: () => void;
  pushData: () => void;
};

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(true);
  const [logged, setLogged] = useState<boolean>(true);
  const [userData, setUserData] = useState<object>({});

  useEffect(() => {
    setAxios();
  }, []);

  const appContext = useMemo(
    (): Memo => ({
      login: () => setLogged(true),
      signOut: () => console.log("sign out"),
      getData: () => console.log("get data"),
      pushData: () => console.log("push data"),
    }),
    []
  );

  return (
    <AppContext.Provider value={appContext}>
      {loaded ? logged ? <Main /> : <Auth /> : <Splash />}
    </AppContext.Provider>
  );
}
// Reminder Notes
