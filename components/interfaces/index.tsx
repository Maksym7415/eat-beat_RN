export interface InputProps {
  value: string;
  label: string;
  error?: boolean;
}

export interface AuthProps {
  name?: string;
  email: string;
  password: string;
}

export interface NavProps {
  navigation: {
    navigate: (name: string, params?: object) => void;
    push: (name: string) => void;
    goBack: () => void;
    setOptions: (props: object) => void;
  };
  route: {
    params?: any;
  };
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
  saveCal: (currentDate: Cal) => void;
  login: () => void;
  signOut: () => void;
  getData: () => void;
  pushData: () => void;
  isFetching: (value: boolean) => void;
  showModal: (value: boolean) => void
  isShow: boolean
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
  cuisines: Array<string>;
  dishTypes: Array<Array<string>>;
  diets: Array<Array<string>>;
  occasions: Array<string>;
  analyzedInstructions: Array<string>;
  actionHandler: (a:string) => void
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
