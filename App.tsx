import React, { useState, useMemo, useEffect } from "react";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import server, { api } from "./server";
import Splash from "./screens/SplashScreen";
import { ProfileData } from "./components/Config";
import { AppContext } from "./components/AppContext";
import { Auth, DrawerNavigator as Main } from "./navigation/Navigation";
import { Cal, Memo, ProfileProps, UserData } from "./components/interfaces";
import AsyncStorage from "@react-native-community/async-storage";
import pingServer from './utils/pingServer';

let flag = false;
let failedQueue: object[] = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [show, setShow] = useState<object>({recipes: false, restaurants: false});
  const [fetching, setFetching] = useState<number>(0);
  const [cal, setCal] = useState<Cal>({
    visible: false,
    date: new Date(),
  });
  const [userData, setUserData] = useState<UserData>(ProfileData);
  const [recipeId, setRecipeId] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);

  const ApiInterceptor = async () => {
    api.addAsyncResponseTransform(async (Res) => {
      const { ok, status, data, config } = Res;
      if (status === 401) {
        if (flag) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(async (token) => {
              const newConfig = { ...config };
              newConfig.headers.Authorization = `Bearer ${token}`;
              const newRes = await api.any(newConfig);
              Res.ok = newRes.ok;
              Res.status = newRes.status;
              Res.data = newRes.data;
              return;
            })
            .catch((err) => Promise.reject(err));
        }
        flag = true;
        const res = await server.refreshToken();
        if (res?.code === 110) {
          processQueue(true, null);
          return removeToken();
        }
        const newConfig = { ...config };
        newConfig.headers.Authorization = ` Bearer ${res.accessToken}`;
        processQueue(null, res.accessToken);
        const newRes = await api.any(newConfig);
        Res.ok = newRes.ok;
        Res.status = newRes.status;
        Res.data = newRes.data;
      }
      flag = false;
      if (status === 403 && data.code === 120) removeToken();
    });
  };

  const loadUser = async () => {
    if (logged) return;

    await server.setup();
    const token = await AsyncStorage.getItem("@token");
    const user = await AsyncStorage.getItem("@user");
    if (token) {
      ApiInterceptor();
      setLogged(true);
    }
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
      await AsyncStorage.mergeItem("@doc", JSON.stringify(response.data));
  };

  const loginHandler = async (successPage: boolean) => {
    ApiInterceptor();
    await getUserData();
    if (successPage) return;
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
      login: (successPage: boolean) => loginHandler(successPage),
      signOut: () => removeToken(),
      getData: () => getUserData(),
      pushData: () => console.log("push data"),
      isFetching: () => setFetching(fetching + 1),
      showModal: (value: boolean, page: string) => {
        setShow({...show, [page]: value});
      },
      recipeId,
      getRecipeId: getId,
      isShow: show,
      editMode,
      toggleEdit: (v: boolean) => setEditMode(v),
    }),
    [cal, show, userData, fetching, recipeId, editMode]
  );

  useEffect(() => {
    loadUser();
    loadDocs();
  }, [logged]);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    pingServer();
  }, [])


  return (
    <AppContext.Provider value={appContext}>
      {loaded ? logged ? <Main /> : <Auth /> : <Splash />}
    </AppContext.Provider>
  );
}
