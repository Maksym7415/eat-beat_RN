import React, { useState, useMemo, useEffect } from "react";
import Splash from "./screens/SplashScreen";
import { Auth, DrawerNavigator as Main } from "./navigation/Navigation";
import { AppContext } from "./components/AppContext";
import { Cal, Memo, ProfileProps, UserData } from "./components/interfaces";
import AsyncStorage from "@react-native-community/async-storage";
import * as Font from "expo-font";
import server, { api } from "./server";
import { ProfileData } from "./components/Config";
import { apisAreAvailable } from "expo";

let customFonts = {
  Inter_400Regular: require("./assets/font/Roboto-Regular.ttf"),
  Inter_500Medium: require("./assets/font/Roboto-Medium.ttf"),
  Inter_700Bold: require("./assets/font/Roboto-Bold.ttf"),
};

let flag = false;

export default function App() {
  //AsyncStorage.clear();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [getRecommend, setGetrecommend] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [fetching, setFetching] = useState<number>(0);
  const [cal, setCal] = useState<Cal>({
    visible: false,
    date: new Date(),
  });
  const [userData, setUserData] = useState<UserData>(ProfileData);
  const [recipeId, setRecipeId] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);

  const ApiInterceptor = async () => {
    api.addAsyncResponseTransform(async ({ status, data }) => {
      console.log(status);
      if (status === 401 && !flag) {
        flag = true;
        const res = await server.refreshToken()
        if (res.status === 401) removeToken();
        flag = false;
      }
      if (status === 403 && data.code === 120) removeToken();
    });
  };

  const loadUser = async () => {
    if (logged) return;
    console.log("new log", new Date(), "\n");
    await server.setup();
    const token = await AsyncStorage.getItem("@token");
    const user = await AsyncStorage.getItem("@user");
    if (token) {
      ApiInterceptor();
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
      setUserData(data as ProfileProps);
      await AsyncStorage.setItem("@user", JSON.stringify(data));
      return data;
    } else {
      return userData;
    }
  };

  const loadDocs = async () => {
    const response = await server.getDocs();
    if (response.ok)
      await AsyncStorage.mergeItem("@doc", JSON.stringify(response.data.data));
  };

  const loginHandler = async () => {
    ApiInterceptor();
    await getUserData();
    setLogged(true);
  };

  const getId = (id: number) => {
    setRecipeId(id);
  };

  const appContext = useMemo(
    (): Memo => ({
      calendar: cal,
      myData: userData,
      refresh: fetching,
      saveCal: (value) => setCal(value),
      login: () => loginHandler(),
      signOut: () => removeToken(),
      getData: () => getUserData(),
      pushData: () => console.log("push data"),
      isFetching: () => setFetching(fetching + 1),
      showModal: (value: boolean) => {
        setShow(value);
      },
      recipeId,
      getRecipeId: getId,
      isShow: show,
      editMode,
      toggleEdit: (v: boolean) => setEditMode(v),
      getRecommend,
      getRecomendation: (v: boolean) => setGetrecommend(v),
    }),
    [cal, show, userData, fetching, recipeId, editMode, getRecommend]
  );

  useEffect(() => {
    loadUser();
    loadDocs();
  }, [logged]);

  return (
    <AppContext.Provider value={appContext}>
      {loaded ? logged ? <Main /> : <Auth /> : <Splash />}
    </AppContext.Provider>
  );
}
// Reminder Notes
