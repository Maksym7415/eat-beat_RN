import React, { useState, useMemo } from "react";
import { Auth, Main } from "./screens/Navigation";
import Splash from "./screens/SplashScreen";
import { AppContext } from "./components/AppContext";
export default function App() {
  const [loaded, setLoaded] = useState(true);
  const [logged, setLogged] = useState(true);
  const [userData, setUserData] = useState({});

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
