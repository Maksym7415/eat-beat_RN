import { AuthProps } from './../components/interfaces/index';
export interface apiProps {
  baseURL: string;
  testURL: string;
  get: {
    dailyConsumption: string;
    recommendedMeals: string;
    cookedMeals: string;
    profile: string;
    history: string;
    recipeByName: string;
    searchSettings: string;
    getSearchFilter: string
  };
  post: {
    addCookedMeal: string;
    signIn: string;
    register: string;
    upload: string;
  };
  del: {
    cookedMeal: string;
    user: string;
  };
  put: {
    intakeNorms: string;
    profile: string;
    password: string;
    updateCookedMeal: string
  };
}

export interface cacheProps {
  accessToken: string;
  refreshToken: string;
}

export interface errorProps {
  problem: string;
  status: string;
  config: object;
}

export interface resProps{
  ok:string
  problem:string
  data:any
  status:string
  config:any
}

export type AuthFun = (v:AuthProps)=> Promise< boolean|void>