import { create } from "apisauce";
import {
  apiProps,
  AuthFun,
  cacheProps,
  errorProps,
  mailAuth,
  updatePassProps,
} from "./interface";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";

const apiConfig: apiProps = {
  baseURL: "http://10.4.30.212:8081/api",
  // baseURL: "https://logisticbrocker.hopto.org/eat-beat/api",
  testURL: "https://logisticbrocker.hopto.org/eat-beat-test/api",
  get: {
    profile: "/user/profile-data",
    cookedMeals: "/meals/cooked-meals?date=",
    history: "/meals/healthscore-history?offset=",
    dailyConsumption: "/meals/daily-consumption?date=",
    recommendedMeals: "/meals/recommend-meals?date=",
    recipeByName: "/meals/get-recipes?recipeName=",
    searchSettings: "/user/search-recipe-settings",
    verification: "/auth/verify-account?verificationCode=",
    resetPassword: "/auth/reset-password",
  },
  post: {
    upload: "/upload",
    signIn: "/auth/sign-in",
    register: "/auth/sign-up",
    refresh: "/auth/refresh-token",
    addCookedMeal: "/meals/meal-change-status",
    updatePassword: "/auth/update-password",
  },
  del: {
    user: "/user/delete-user",
    cookedMeal: "/meals/cooked-meal/",
  },
  put: {
    profile: "/user/update-profile",
    intakeNorms: "/user/intake-norms",
    password: "/user/update-password",
    updateCookedMeal: "/meals/update-cooked-meal/",
    updateUserReferences: "/user/update-preferences",
    updateIntakeNorms: "/user/intake-norms",
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
};

const logError = ({ problem, config, status, headers, data }: errorProps) => {
  //Alert.alert(problem);
  console.log(config, "\nstatus => ", status);
  /*
  console.log(
    "Error------\nproblem => ",
    problem,
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

const updateIntakeNorm = async (data: object) => {
  const address = apiConfig.put.updateIntakeNorms;
  console.log(data, "gfdfgdfgdf986789546854654659");
  const response = await api.patch(address, { intakeNorms: data });
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

const getRecipeByName = async (name: string, intolerances: string[]) => {
  const address = apiConfig.get.recipeByName + name;
  // apiConfig.get.recipeByName + name + "&intolerances=" + intolerances.join();

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
  const address = apiConfig.get.searchSettings;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response.data;
};

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
  const uriParts = uri.split(".");
  const fileType = uriParts[uriParts.length - 1];
  const formData = new FormData();
  formData.append("file", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  const response = await api.post(address, formData, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  if (!response.ok) logError(response);
  return response.ok;
};

const delCookedMeal = async (id: number) => {
  const address = apiConfig.del.cookedMeal + id;
  const response = await api.delete(address);
  if (response.ok) logError(response);
  return response;
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

const updateProfile = async (data: object) => {
  const address = apiConfig.put.profile;
  console.log(data, "updateProfile");
  const response = await api.patch(address, data);
  return response;
};

const changePassword = async (options: updatePassProps) => {
  const address = apiConfig.post.updatePassword;
  const response = await api.post(address, options);
  if (!response.ok) logError(response);
  return response.ok;
};

const updatePassword = async (options: updatePassProps) => {
  const address = apiConfig.post.updatePassword;
  const response = await api.post(address, options);
  if (!response.ok) logError(response);
  return response.ok;
};

const resetPassword = async (email: mailAuth) => {
  const address = apiConfig.get.resetPassword;
  const response = await api.patch(address, email);
  if (!response.ok) logError(response);
  return response.ok;
};

const updateUserReferences = async (data: object) => {
  console.log(data);
  const address = apiConfig.put.updateUserReferences;
  try {
    const response = await api.put(address, { ...data });
    const res = await getSearchFilter();
    return res;
  } catch (e) {
    console.log({ e });
  }
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

const changeURL = () => {
  const current = api.getBaseURL();
  const change =
    current === apiConfig.testURL ? apiConfig.baseURL : apiConfig.testURL;
  api.setBaseURL(change);
  Alert.alert("change", `changed from: ${current}\nto: ${change}`);
  console.log("changed base url");
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
  changePassword,
  updateCookedMeal,
  resendCode,
  verifyAccount,
  resetPassword,
  changeURL,
  updateUserReferences,
  updateIntakeNorm,
  getSearchFilter,
};
