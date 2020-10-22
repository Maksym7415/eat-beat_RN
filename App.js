import React, { useState, useMemo, useEffect } from "react";
import { Auth, Main } from "./screens/Navigation";
import Splash from "./screens/SplashScreen";
import { AppContext } from "./components/AppContext";
import setAxios from './utils/axios.config';

export default function App() {
  const [loaded, setLoaded] = useState(true);
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setAxios()
  }, [])

  const appContext = useMemo(() => {
    return {
      login: () => {
        setLogged(true);
      },
      signOut: () => {
        //
      },
      getData: () => {
        //
      },
      pushData: () => {
        //
      },
    };
  });

  return (
    <AppContext.Provider value={appContext}>
      {loaded ? logged ? <Main /> : <Auth /> : <Splash />}
    </AppContext.Provider>
  );
}
// Reminder Notes
