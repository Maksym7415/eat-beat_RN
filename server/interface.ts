import { AuthProps } from "./../components/interfaces/index";
export interface apiProps {
  baseURL: () => string;
  testURL: string;
  get: {
    dailyConsumption: string;
    recommendedMeals: string;
    cookedMeals: string;
    profile: string;
    history: string;
    recipeByName: string;
    searchSettings: string;
    verification: string;
    resetPassword: string;
    recipeInfo: string;
    docs: string
    userAcitvities: string
    resendVerificationCode: string
    resendResetPasswordCode: string
    recommendRestaurant: string
    getRestaurants: string
    getRestaurantMenu: string
    restaurantSearch: string
    popularSnacks: string
    addSnacks: string
  };
  post: {
    addCookedMeal: string;
    signIn: string;
    register: string;
    upload: string;
    refresh: string;
    updatePassword: string;
    addRecipe: string;
    addRecipeAvatar: string;
    addUserRecipeToMeals: string
    addRestaurantMeal: string
  };
  del: {
    cookedMeal: string;
    user: string;
  };
  put: {
    intakeNorms: string;
    profile: string;
    password: string;
    updateCookedMeal: string;
    updateUserReferences: string;
    updateIntakeNorms: string;
    updateRecipe: string;
  };
}

export interface cacheProps {
  accessToken: string;
  refreshToken: string;
}

export interface errorProps {
  problem: string;
  status: number;
  config: object;
  headers: object;
  data: object;
}

export interface resProps {
  ok: string;
  problem: string;
  data: any;
  status: string;
  config: any;
}

export interface mailAuth {
  email: string;
}

export interface updatePassProps {
  password: string;
  verificationCode: string;
}
export interface changePassProps {
  oldPassword: string;
  newPassword: string;
}

export type AuthFun = (v: AuthProps) => Promise<boolean | void | object>;
