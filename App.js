import React, { useState } from "react";
import { Auth, Main } from "./screens/Navigation";
import Splash from "./screens/SplashScreen";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const handleLogging = () => {
    setLoaded(true);
  };
  if (!loaded) {
    return <Splash />;
  }
  if (logged) return <Main />;
  return <Auth />;
}
// Reminder Notes
