import { NavigationProps } from "./navInterface";
import { GestureResponderEvent } from 'react-native'

export interface InputProps {
  value: string;
  label: string;
  error?: boolean;
  maxLength?: number;
  clear?: boolean | string
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
  routeFrom: string
}

export interface Cal {
  visible: boolean;
  date: Date;
}

export interface SearchByIngredientsParam {
  id: number
  name: string
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
  showModal: (value: boolean, page: string) => void;
  recipeId: number;
  getRecipeId: (id: number) => void;
  isShow: object;
  editMode: boolean;
  toggleEdit: (v: boolean) => void;
  searchByIngredientsParams: SearchByIngredientsParam[]
  setSearchByIngredientsParams: (params: SearchByIngredientsParam[]) => void
  ingredientsOrderList: RecipeIngredient[]
  setIngredientsOrderList: (ingredients: RecipeIngredient[]) => void
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

export enum StockType {
  'fridge' = 'fridge',
  'shoppingList' = 'shoppingList',
}

export interface GetStockIngredientsParams {
  type: StockType
  offset?: number
  limit?: number
}

export interface SearchIngredientsParams {
  name: string
  offset?: number
  limit?: number
}

export interface SearchRecipesByIngredientsParams {
  ingredients: string
  limit?: number
}

export interface SearchRecipesByIngredientsResponse {
  results: RecommendedMeals[]
}

export interface UpdateStockIngredientsParams {
  type: StockType
  amount: number
}

export interface RemoveStockIngredientsParams {
  type: StockType
  ingredients: number[]
}

export interface RecipeIngredient {
  id: number
  amount: number
  name: string
  image: string
  unit: string,
  possibleUnits?: string[]
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
  name?: string
  is_partner?: boolean
  restName?: string
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

 interface DataProps {
  id: number;
  name: string;
  servings: number;
  creationTime: string;
  modalVisible: boolean;
  source: string
}

 interface BodyEditModal {
  creationTime: string;
  servings: number;
  source: string
}

export interface PropsEditModal {
  setData: (id: number, body: BodyEditModal) => void;
  hideModal: () => void;
  data: DataProps;
  blend?: string;
  clicked?: boolean;
  date?: Date;
  bg: string
}

export interface Styles {
  [key: string]: any
}

export interface ConfirmationButton {
  title: string
  onClickHandler: (event: GestureResponderEvent) => void
  bckColor: string
  textColor: string
  fts: string
  ftw: string
  border: object
  disabled: boolean
}

export interface ModalData {
  id: number;
  name: string;
  servings: number;
  modalVisible: boolean;
  creationTime: number;
  data: {
    id?: number
  };
}

export interface AddMealsProps {
  creationTime: number;
  servings: number;
}
