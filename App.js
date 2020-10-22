import React, { useState, useEffect } from "react";
import { Auth, Main } from "./screens/Navigation";
import { View, Text } from 'react-native';
import Splash from "./screens/SplashScreen";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState({});

  const handleLogging = () => {
    setLoaded(true);
  };


  if (!loaded) {
    return (
      <>
      <Main />
      </>
      
    );
  }
  if (logged) return <Main />;
  return <Auth />;
}
// Reminder Notes
