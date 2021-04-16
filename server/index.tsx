import { create } from 'apisauce';
import { apiProps, cacheProps, changePassProps, errorProps, mailAuth, updatePassProps, } from './interface';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Platform } from 'react-native';
import {
  AuthProps,
  GetStockIngredientsParams,
  RecipeIngredient,
  RemoveStockIngredientsParams, SearchByBarcodeParams,
  SearchIngredientsParams,
  SearchRecipesByIngredientsParams,
  SearchRecipesByIngredientsResponse,
  StockType,
  UpdateStockIngredientsParams
} from '../components/interfaces';
import encryption from '../utils/dataEncryption';
import Axios from 'axios';
import AppBackend from '../components/BackendSwitcher/store'
import MOCKED_INGREDIENTS from '../screens/Stock/mocked.ingredients.json';

const apiConfig: apiProps = {
  baseURL: () => AppBackend.getBaseUrl() + "api",
  get: {
    profile: "/user/profile-data",
    cookedMeals: "/meals/day-meals?date=",
    history: "/meals/healthscore-history?offset=",
    dailyConsumption: "/meals/daily-consumption?date=",
    recommendedMeals: "/meals/recommend-meals?date=",
    recipeByName: "/meals/get-recipes?recipeName=",
    searchSettings: "/user/search-recipe-settings",
    verification: "/auth/verify-account?verificationCode=",
    resetPassword: "/auth/reset-password",
    recipeInfo: "/recipe/my-recipes/",
    docs: "/main/app-info",
    userAcitvities: "/main/user-activities",
    resendVerificationCode: "/auth/resend-verification-code?email=",
    resendResetPasswordCode: "/auth/resend-reset-password-code?email=",
    recommendRestaurant: "/restaurants/recommend-dish?date=",
    getRestaurants: "/restaurants/all-restaurants",
    getRestaurantMenu: "/restaurants/restaurant-menu/",
    restaurantSearch: "/restaurants/search?name=",
    popularSnacks: "/snacks/popular?date=",
    addSnacks: "/snacks/eat-snack",
    snackSearch: "/snacks/search?name=",
    barcodeSearch: "/todo-implement-search-by-barcode-endpoint",
  },
  post: {
    signIn: "/auth/sign-in",
    register: "/auth/sign-up",
    addCookedMeal: "/meals/meal-change-status",
    updatePassword: "/auth/update-password",
    upload: "/upload/avatar",
    refresh: "/auth/refresh-token",
    addRecipe: "/recipe/add-own-recipe",
    addRecipeAvatar: "/upload/recipe-image/",
    addUserRecipeToMeals: "/meals/add-meal-own-recipe",
    addRestaurantMeal: '/restaurants/eat-dish',
  },
  del: {
    user: "/user/delete-user",
    cookedMeal: "/meals/day-meal/",
  },
  put: {
    profile: "/user/update-profile",
    intakeNorms: "/user/intake-norms",
    password: "/user/update-password",
    updateCookedMeal: "/meals/update-meal/",
    updateUserReferences: "/user/update-preferences",
    updateIntakeNorms: "/user/intake-norms",
    updateRecipe: "​/recipe/update-recipe/",
  },
};

export const api = create({
  baseURL: apiConfig.baseURL(),
  headers: {
    Accept: "application/json",
    "User-Agent":
      Platform.OS === "ios"
        ? `${Device.manufacturer}/${Device.modelId}/${Device.modelName}/${Device.osBuildId}/${Device.osName}/${Device.osVersion}`
        : `${Device.manufacturer}/${Device.productName}/${Device.modelName}/${Device.osBuildId}/${Device.osName}/${Device.osVersion}`,
  },
  timeout: 20000,
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
  return token ? JSON.parse(token).refreshToken : null;
};

const refreshToken = async () => {
  console.log("attemp refresh\n----------------------------\n");
  api.deleteHeader("Authorization");
  const address = apiConfig.post.refresh;
  const token = await getRefresh();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "User-Agent",
    Platform.OS === "ios"
      ? `${Device.manufacturer}/${Device.modelId}/${Device.modelName}/${Device.osBuildId}/${Device.osName}/${Device.osVersion}`
      : `${Device.manufacturer}/${Device.productName}/${Device.modelName}/${Device.osBuildId}/${Device.osName}/${Device.osVersion}`
  );
  const raw = JSON.stringify({ refreshToken: `${token}` });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(
    apiConfig.baseURL() + apiConfig.post.refresh,
    requestOptions
  );
  const result = await res.json();
  if (result.code !== 110) setToken(result);
  return result;
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

const logError = async ({
  problem,
  config,
  status,
  headers,
  data,
}: errorProps) => {
  console.log(problem,
    config,
    status,
    headers,
    data,)
  if (status < 401) Alert.alert("error", data?.message);
  //console.log(config, "\nstatus => ", status, "\ndata => ", data);
};

const getCalendar = (value: Date) => {
  return value.toJSON().toString().slice(0, 10);
};

const getDailyConsumption = async (date: Date) => {
  const address = apiConfig.get.dailyConsumption + getCalendar(date);
  const response = await api.get(address);
  if (!response.ok) logError(response);
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
  if (!response.ok) logError(response);
  return response;
};

const updateIntakeNorm = async (data: object) => {
  const address = apiConfig.put.updateIntakeNorms;
  const response = await api.patch(address, {
    ...data,
    gmt: (new Date().getTimezoneOffset() / 60) * -1,
  });
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

const getRecipeByName = async (
  name: string,
  config: string,
  offset: number
) => {
  const address =
    apiConfig.get.recipeByName + name + config + `&offset=${offset}`;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
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
  return response;
};

const addCookedMeal = async (payload) => {
  const address = apiConfig.post.addCookedMeal;
  const response = await api.post(address, payload);
  if (!response.ok) logError(response);
  return response;
};

const getRecipeInfo = async (id: number) => {
  const address = apiConfig.get.recipeInfo + id;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
};

const getRecipes = async () => {
  const address = apiConfig.get.recipeInfo;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
};

const addRecipe = async (data: any) => {
  const address = apiConfig.post.addRecipe;
  const params = { ...data }
  if (!params.servings) delete params.servings
  const response = await api.post(address, params);
  if (!response.ok) logError(response);
  return response;
};

const addRecipeToMeals = async (data: any) => {
  const address = apiConfig.post.addUserRecipeToMeals;
  const response = await api.post(address, data);
  // console.log(response)
  if (!response.ok) logError(response);
  return response;
};

const updateRecipe = async (
  id: number,
  { avatar, title, ingredientList, instruction, servings }
) => {
  const params = { title, ingredientList, instruction, servings };
  const bodyParams = {};
  Object.keys(params).forEach((el) =>
    params[el] ? (bodyParams[el] = params[el]) : el
  );
  const response = await api.patch(`/recipe/update-recipe/${id}`, bodyParams);
  if (!response.ok) logError(response);
  return response;
};

const addRecipeAvatar = async (formData: FormData, id: number) => {
  const address = apiConfig.post.addRecipeAvatar + id;
  const response = await api.post(address, formData);
  if (!response.ok) logError(response);
  return response;
};

const getRecommendedRestaurant = async (date: Date) => {
  const address = apiConfig.get.recommendRestaurant + getCalendar(date);
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
};

const addRestaurantsMeal = async (data: any) => {
  const address = apiConfig.post.addRestaurantMeal
  console.log(data)
  const response = await api.post(address, data);
  if (!response.ok) logError(response);
  return response;
}

const getRestaurants = async () => {
  const address = apiConfig.get.getRestaurants;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
}

const getRestaurantMenu = async (id: number) => {
  const address = `${apiConfig.get.getRestaurantMenu}${id}`;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
}

const restaurantSearch = async ( name: string, config: string, offset: number) => {
  const address = apiConfig.get.restaurantSearch + name + config + `&offset=${offset}`;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
}

const popularSnacks = async (date) => {
  const response = await api.get(apiConfig.get.popularSnacks +  getCalendar(date));
  if (!response.ok) logError(response);
  return response;
}

const addSnacks = async (data) => {
  const response = await api.post(apiConfig.get.addSnacks, data);
  if (!response.ok) logError(response);
  return response;
}

const snackSearch = async (name: string, offset:number = 0) => {
  const response = await api.get(apiConfig.get.snackSearch + name + `&offset=${offset}`);
  if (!response.ok) logError(response);
  return response;
}

const signIn = async (payload: AuthProps) => {
  const encrypted = await encryption(payload)
  const address = apiConfig.post.signIn;
  const response = await api.post(address, encrypted);
  if (response.ok) {
    setToken(response.data);
  }
  return response;
};

const register = async (payload: AuthProps) => {
  const encrypted = await encryption(payload)
  const address = apiConfig.post.register;
  const response = await api.post(address, encrypted);
  return response;
};
const upload = async (uri) => {
  const address = apiConfig.baseURL() + apiConfig.post.upload;
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

const delCookedMeal = async (id: number, data: Object) => {
  const baseURL = AppBackend.getBaseUrl()
  const address = baseURL.slice(0, baseURL.length-1) + '/api' + apiConfig.del.cookedMeal + id;
  const token = await getToken();
  const response = await Axios(address, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      'User-Agent':   Platform.OS === "ios"
        ? `${Device.manufacturer}/${Device.modelId}/${Device.modelName}/${Device.osBuildId}/${Device.osName}/${Device.osVersion}`
        : `${Device.manufacturer}/${Device.productName}/${Device.modelName}/${Device.osBuildId}/${Device.osName}/${Device.osVersion}`
    },
    data
  }).then(res=> res).catch((error) => console.log(error, 'error'));
  if (response.status >= 400) logError(response);
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
  const response = await api.patch(address, {
    ...data,
    gmt: (new Date().getTimezoneOffset() / 60) * -1,
  });
  return response.ok;
};

const changePassword = async (options: changePassProps) => {
  const address = apiConfig.put.password;
  const encrypted = await encryption(options)
  const response = await api.patch(address, encrypted);
  return response;
};

const updatePassword = async (options: updatePassProps) => {
  const address = apiConfig.post.updatePassword;
  const encrypted = await encryption(options);
  const response = await api.post(address, encrypted);
  console.log(response)
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
  const address = apiConfig.put.updateUserReferences;
  const response = await api.put(address, data);
  if (!response.ok) logError(response);
  return response.ok;
};

const resendCode = async (Email: string) => {
  const address = apiConfig.get.resendVerificationCode + Email;
  const response = await api.get(address);
  return response.ok;
};
1;

const resendPasswordCode = async (Email: string) => {
  const address = apiConfig.get.resendResetPasswordCode + Email;
  const response = await api.get(address);
  return response.ok;
};

const verifyAccount = async (code: number) => {
  const address = apiConfig.get.verification + code;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
};

const getDocs = async () => {
  const address = apiConfig.get.docs;
  const response = await api.get(address);
  if (!response.ok) logError(response);
  return response;
};

const changeURL = () => {
  const current = api.getBaseURL();
  const change =
    current === apiConfig.testURL ? apiConfig.baseURL() : apiConfig.testURL;
  api.setBaseURL(change);
  Alert.alert("change", `changed from: ${current}\nto: ${change}`);
};

const getPreview = async (id) => {
  const baseURL = AppBackend.getBaseUrl()
  const response = await api.get(`${baseURL}api/meals/recipe-info/${id}`);
  if (!response.ok) logError(response);
  return response.data;
}

const searchRecipesByIngredients =
  async (params: SearchRecipesByIngredientsParams): Promise<SearchRecipesByIngredientsResponse> =>
{
  console.log('---')
  console.log('getRecipesByIngredients -> params', params)

  let url = AppBackend.getBaseUrl() + 'api/meals/get-recipes-by-ingredients?ingredients=' + params.ingredients
  const response = await api.get(url)
  console.log('getRecipesByIngredients -> ', url, 'response', response)

  if (!response.ok) {
    logError(response);
    return { results: [] }
  } else {
    return response.data as SearchRecipesByIngredientsResponse
  }
}

const addToStocks = async (type: StockType, data: Partial<RecipeIngredient>[]): Promise<boolean> => {
  console.log('---')
  console.log('addToStocks -> type', type)
  console.log('addToStocks -> data', data)

  let url: string = AppBackend.getBaseUrl() + 'api/food-stocks/add-ingredients'
  const postBody = { ingredients: data, type }
  const response = await api.post(url, postBody)
  console.log('addToStocks -> POST -> ', postBody, url, 'response:', response)

  if (response.data && response.data.message) {
    let message = response.data.message
    if (response.data.missedIngredients) {
      message += ': '
      response.data.missedIngredients.forEach((ing: RecipeIngredient) => {
        message += ing.name + '(' + ing.unit + '), '
      })
      message = message.substring(0, message.length -2)
    }
    Alert.alert('Error', message)
  }

  if (!response.ok) {
    logError(response);
    return false
  } else {
    return true
  }
}

const updateInStocks = async (ingredientId: number, params: UpdateStockIngredientsParams): Promise<boolean> => {
  console.log('---')
  console.log('updateInStocks -> params', params)

  let url: string = AppBackend.getBaseUrl() + 'api/food-stocks/update-ingredient/' + ingredientId
  const postBody = { type: params.type, amount: params.amount }
  const response = await api.patch(url, postBody)

  console.log('updateInStocks -> PATCH -> ', postBody, url, 'response:', response)
  if (!response.ok) {
    logError(response);
    return false
  } else {
    return true
  }
}

const removeFromStocks = async (params: RemoveStockIngredientsParams): Promise<boolean> => {
  console.log('---')
  console.log('removeFromStocks -> params', params)

  let url: string = AppBackend.getBaseUrl() + 'api/food-stocks/remove-ingredients?type='
    + params.type + '&ingredients=' + params.ingredients.join(',')
  const response = await api.delete(url)
  console.log('removeFromStocks -> DELETE -> ', url, 'response:', response)

  if (!response.ok) {
    logError(response);
    return false
  } else {
    return true
  }
}

const getStocks = async (params: GetStockIngredientsParams): Promise<RecipeIngredient[]> => {
  console.log('---')
  console.log('getStocks -> params', params)
  let url = AppBackend.getBaseUrl() + 'api/food-stocks/my-food-stocks?type=' + params.type
  if (params.offset) {
    url += '&offset=' + params.offset
  }
  if (params.limit) {
    url += '&limit=' + params.limit
  }

  const response = await api.get(url)
  console.log('getStocks -> GET -> ', url, 'response:', response)

  if (!response.ok) {
    logError(response);
    return []
  } else {
    return response.data as RecipeIngredient[]
  }
}

const searchIngredients = async (params: SearchIngredientsParams): Promise<RecipeIngredient[]> => {
  console.log('---')
  console.log('searchIngredients -> params', params)

  let url = AppBackend.getBaseUrl() + 'api/food-stocks/search-ingredients' +
    '?name=' + params.name
  if (params.offset) {
    url += '&offset=' + params.offset
  }
  if (params.limit) {
    url += '&limit=' + params.limit
  }
  const response = await api.get(url)
  console.log('searchIngredients -> GET -> ', url, 'response:', response)

  if (!response.ok) {
    logError(response);
    return []
  } else {
    return response.data as RecipeIngredient[]
  }
}

const searchByBarcode = async (params: SearchByBarcodeParams): Promise<RecipeIngredient> => {
  let ingredient: RecipeIngredient = null
  const response = await api.get(
    AppBackend.getBaseUrl() + 'api/food-stocks/product-barcode?barcode=' + params.code
  )
  if (response.ok) {
    //@ts-ignore
    if (response.data && response.data.length) {
      //@ts-ignore
      ingredient = response.data[0]
    }
  } else {
    //@ts-ignore
    logError(response);
  }
  return ingredient
}

const snackByBarcode = async (params: SearchByBarcodeParams): Promise<RecipeIngredient> => {
  let ingredient: RecipeIngredient = null
  const response = await api.get(
    AppBackend.getBaseUrl() + 'api/snacks/barcode?barcode=' + params.code
  )
  if (response.ok) {
    //@ts-ignore
    if (response.data && response.data.length) {
      //@ts-ignore
      ingredient = response.data[0]
    }
  } else {
    //@ts-ignore
    logError(response);
  }
  return ingredient
}

export default {
  api,
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
  resendPasswordCode,
  verifyAccount,
  resetPassword,
  changeURL,
  updateUserReferences,
  updateIntakeNorm,
  getSearchFilter,
  addRecipe,
  addRecipeAvatar,
  getRecipeInfo,
  getRecipes,
  updateRecipe,
  getDocs,
  refreshToken,
  addRecipeToMeals,
  getPreview,
  getRecommendedRestaurant,
  addRestaurantsMeal,
  getRestaurants,
  getRestaurantMenu,
  restaurantSearch,
  popularSnacks,
  addSnacks,
  snackSearch,
  addToStocks,
  updateInStocks,
  removeFromStocks,
  searchIngredients,
  getStocks,
  searchRecipesByIngredients,
  searchByBarcode,
  snackByBarcode,
};
