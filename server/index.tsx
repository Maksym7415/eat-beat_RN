import { create } from "apisauce";
import { apiProps, AuthFun, cacheProps, errorProps } from "./interface";
import AsyncStorage from "@react-native-community/async-storage";

const apiConfig: apiProps = {
  //baseURL: "http://10.4.30.212:8081/api",
  baseURL: "https://logisticbrocker.hopto.org/eat-beat/api",
  testURL: "https://logisticbrocker.hopto.org/eat-beat-test/api",
  get: {
    dailyConsumption: "/meals/daily-consumption?date=",
    recommendedMeals: "/meals/recommend-meals?date=",
    cookedMeals: "/meals/cooked-meals?date=",
    profile: "/user/profile-data",
    history: "/meals/healthscore-history?offset=",
    recipeByName: "/meals/get-recipes?recipeName=",
    searchSettings: "/user/search-recipe-settings",
    getSearchFilter: "/user/search-recipe-settings",
    verification: "/auth/verify-account?verificationCode=",
  },
  post: {
    addCookedMeal: "/meals/meal-change-status",
    signIn: "/auth/sign-in",
    register: "/auth/sign-up",
    upload: "/upload",
    refresh: "/auth/refresh-token",
  },
  del: {
    cookedMeal: "/meals/cooked-meal/",
    user: "/user/delete-user",
  },
  put: {
    intakeNorms: "/user/intake-norms",
    profile: "/user/update-profile",
    password: "/user/update-password",
    updateCookedMeal: "/meals/update-cooked-meal/",
  },
};

const api = create({
  baseURL: apiConfig.baseURL,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
  timeout: 10000,
});

const setToken = async (token: cacheProps) => {
  AsyncStorage.setItem("@token", JSON.stringify(token));
  api.setHeader("Authorization", `Bearer ${token.accessToken}`);
};

const removeToken = async () => {
  AsyncStorage.removeItem("@token");
};

const getToken = async () => {
  const token = await AsyncStorage.getItem("@token");
  return token ? JSON.parse(token).accessToken : null;
};

const getRefresh = async () => {
  const token = await AsyncStorage.getItem("@token");
  console.log(token);
  return token ? JSON.parse(token).refreshToken : null;
};

const refreshToken = async () => {
  console.log("attemp refresh\n----------------------------\n");
  api.deleteHeader("Authorization");
  const address = apiConfig.post.refresh;
  const token = await getRefresh();
  const response = await api.post(address, { refreshToken: token });
  console.log(response);
  //response.ok ? setToken(response.data) : logError(response);
  return response;
};

const setHeader = (token: string) => {
  api.setHeader("Authorization", `Bearer ${token}`);
};

const setup = async () => {
  const token = await getToken();
  if (token) {
    api.setHeader("Authorization", `Bearer ${token}`);
  }
  console.log("setup---start\ntoken:", token, "\nsetup---end");
};

const logError = ({ problem, config, status, headers, data }: errorProps) => {
  //Alert.alert(problem);
  console.log(config);
  /*
  console.log(
    "Error------\nproblem => ",
    problem,
    "\nstatus => ",
    status,
    "\ndata => ",
    data,
    "\nco => ",
    config
  );*/
};

const getCalendar = (value: Date) => {
  return value.toJSON().toString().slice(0, 10);
};

const getDailyConsumption = async (date: Date) => {
  const address = apiConfig.get.dailyConsumption + getCalendar(date);
  const response = await api.get(address);
  if (!response.ok) {
    if (response.status === 401) {
      await refreshToken();
    }
    logError(response);
  }
  return response;
};

const getRecommendedMeals = async (date: Date) => {
  const address = apiConfig.get.recommendedMeals + getCalendar(date);
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
};

const getCookedMeals = async (date: Date) => {
  const address = apiConfig.get.cookedMeals + getCalendar(date);
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
};

const updateCookedMeal = async (id: number, data: object) => {
  const address = apiConfig.put.updateCookedMeal + id;
  const response = await api.patch(address, data);
  console.log(response);
  if (!response.ok) logError(response);
  return response;
};

const getProfile = async () => {
  const address = apiConfig.get.profile;
  const response = await api.get(address);
  if (!response.ok) {
    logError(response);
  } else {
    await AsyncStorage.setItem("@user", JSON.stringify(response.data));
  }
  return response;
};

const getHistory = async (days: number) => {
  const address = apiConfig.get.history + days;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
};

const getRecipeByName = async (name: string, { intolerances, diets }: object) => {
  //const address = apiConfig.get.recipeByName + name
  const address =`${apiConfig.get.recipeByName}${name}&intolerances=${intolerances}&diets=${diets}`;
   

  return api.get(address).then((response) => {
    if (!response.ok) logError(response);
    return response.data;
  });
};

const getSearchSettings = async () => {
  const address = apiConfig.get.searchSettings;
  api.get(address).then((response) => {
    if (!response.ok) logError(response);
    return response.data;
  });
};

const getSearchFilter = async () => {
  const address = apiConfig.get.getSearchFilter;
  const response = await api.get(address)
  if (!response.ok) logError(response);
  return response.data;
}

const addCookedMeal = async (payload) => {
  const address = apiConfig.post.addCookedMeal;
  api.post(address, payload).then((response) => {
    if (!response.ok) logError(response);
  });
};

const signIn: AuthFun = async (payload) => {
  const address = apiConfig.post.signIn;
  const response = await api.post(address, payload);
  response.ok ? setToken(response.data) : logError(response);
  return response.ok;
};

const register: AuthFun = async (payload) => {
  const address = apiConfig.post.register;
  const response = await api.post(address, payload);
  if (response.ok) logError(response);
  return response;
};

const upload = async (uri) => {
  const address = apiConfig.baseURL + apiConfig.post.upload;
  const token = await getToken();
  /*
  const response = await api.post(address, form);
  if (!response.ok) logError(response);
  return response.ok;
  */
  //---
  const form = () => {
    var data = new FormData();
    data.append(
      "file",
      JSON.stringify({
        uri,
        name: `avatar-${Date.now()}.jpg`,
        type: "image/*",
      })
    );
    return data;
  };
  try {
    let response = await fetch(address, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      body: form(),
    });
    console.log(response.json());
  } catch (error) {
    console.error(error);
  }
  //---
};

const delCookedMeal = () => {
  return null;
};

const delUser = async () => {
  const address = apiConfig.del.user;
  const response = await api.delete(address);
  response.ok ? removeToken() : logError(response);
  return response;
};

const updateIntakeNorms = () => {
  return null;
};

const updateProfile = () => {
  return null;
};

const updatePassword = () => {
  return null;
};

const resendCode = async () => {
  const address = apiConfig.post.register;
  const response = await api.get(address);
  response.ok ? setToken(response.data) : logError(response);
  return response.ok;
};

const verifyAccount = async (code: number) => {
  const address = apiConfig.get.verification + code;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
};

export default {
  setup,
  getDailyConsumption,
  getRecommendedMeals,
  getCookedMeals,
  getProfile,
  getHistory,
  getRecipeByName,
  getSearchSettings,
  addCookedMeal,
  signIn,
  register,
  upload,
  delCookedMeal,
  delUser,
  updateIntakeNorms,
  updateProfile,
  updatePassword,
  updateCookedMeal,
  getSearchFilter,
  resendCode,
  verifyAccount,
};
