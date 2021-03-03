import { NavigationProps } from "./navInterface";

export interface InputProps {
  value: string;
  label: string;
  error?: boolean;
  maxLength?: number;
}

export interface AuthProps {
  name?: string;
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  fkDietId: number;
  userAvatar: string;
  gender: string;
  age: number | null;
  height: number | null;
  currentWeight: number | null;
  targetWeight: number;
  preferences: boolean;
  activity: number;
  name: string;
  email: string;
  createdAt: string;
  intakeNorms: intakeProps;
  fkActivityId: number;
  gmt: number;
}

export interface NavProps {
  navigation: NavigationProps;
  restaurants: boolean
  route: {
    params?: any;
  };
  page: string
}

export interface Cal {
  visible: boolean;
  date: Date;
}

export interface Memo {
  calendar: {
    visible: boolean;
    date: Date;
  };
  refresh: number;
  myData: UserData;
  saveCal: (currentDate: Cal) => void;
  login: (successPage: boolean) => void;
  signOut: () => void;
  getData: () => void;
  pushData: () => void;
  isFetching: () => void;
  showModal: (value: boolean) => void;
  recipeId: number;
  getRecipeId: (id: number) => void;
  isShow: boolean;
  editMode: boolean;
  toggleEdit: (v: boolean) => void;
}

export interface CalendarInterface {
  nativeEvent: {
    timestamp: number;
  };
}

interface Properties {
  title: string;
  amount: number;
  unit: string;
}

interface Nutrients extends Properties {
  percentOfDailyNeeds: number;
}

interface Ingredients extends Properties {
  name: string;
  nutrients: {
    name: string;
    amount: number;
    unit: string;
  };
}

interface Nutrition {
  nutrients: Array<Nutrients>;
  properties: Array<Properties>;
  ingredients: Array<Ingredients>;
  caloricBreakdown: {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
  };
  weightPerServing: {
    amount: number;
    unit: string;
  };
}

export interface RecommendedMeals {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  lowFodmap: boolean;
  aggregateLikes: number;
  spoonacularScore: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  nutrition: Nutrition;
  summary: string;
  cuisines: string[];
  dishTypes: [string[]];
  diets: [string[]];
  occasions: string[];
  analyzedInstructions: string[];
}

export interface ConsumptionProps {
  id: string;
  date: string;
  fkUserId: number;
  healthScore: number;
  nutrientsData: [
    {
      id: number;
      name: string;
      synonims: null;
      shortage: number;
      overage: number;
      minCorrection: number;
      maxCorrection: number;
      unit: string;
      defaultValue: number;
      percenatage: number;
      color: string;
      currentValue: number;
    }
  ];
  tooMuchNutrients: [
    {
      name: string;
      value: number;
    }
  ];
  defaultNutrients: [
    {
      name: string;
      intakeNorm: number;
      unit: string;
      currentValue: number;
    }
  ];
  notEnough: [
    {
      name: string;
      value: number;
    }
  ];
  totalMeals: number;
}
export interface intakeProps {
  Calories: number;
  "Total Fat": number;
  Protein: number;
  Carbs: number;
  Sugar: number;
  Cholesterol: number;
  Alcohol: number;
  Caffeine: number;
  Sodium: number;
  Fiber: number;
  "Vitamin A": number;
  "Vitamin B1": number;
  "Vitamin B2": number;
  "Vitamin B3": number;
  "Vitamin B5": number;
  "Vitamin B6": number;
  "Vitamin B12": number;
  "Vitamin C": number;
  "Vitamin D": number;
  "Vitamin E": number;
  "Vitamin K": number;
  Calcium: number;
  Copper: number;
  Fluoride: number;
  Iron: number;
  Magnesium: number;
  Manganese: number;
  Phosphorus: number;
  Potassium: number;
  Selenium: number;
  Zinc: number;
  Choline: number;
  Folate: number;
}
export interface ProfileProps {
  id: number;
  fkDietId: number;
  userAvatar: string;
  gender: string;
  age: number | null;
  height: number | null;
  currentWeight: number | null;
  targetWeight: number;
  preferences: boolean;
  activity: number;
  name: string;
  email: string;
  createdAt: string;
  intakeNorms: intakeProps;
  fkActivityId: number;
  gmt: number;
}

export interface settings {
  id: number;
  name: string;
  isUsers: boolean;
}

export interface recipeSettings {
  intolerances: settings[];
  diets: settings[];
  mealTypes: settings[];
}

export interface Fetching {
  clicked: boolean;
  deactivate: boolean;
}
