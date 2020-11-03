export const Col = {
  Main: "#F29B27",
  Black: "#333942",
  Black1: "#000000",
  Dark: "#46566D",
  Light: "#8498B1",
  Inactive: "#CDD1D6",
  Background: "#F7F7FB",
  Divider: "#E7E7E7",
  DarkGreen: "#397504",
  Green: "#2DAF0C",
  Green1: "#4C9C05",
  LightGreen: "#D8FCCF",
  Red: "#EB665E",
  DarkBlue: "#1C6995",
  Blue: "#2C98F0",
  Yellow: "#EDDE5D",
  White: "#FFF",
  Grey: "#666666",
  Shadow: "rgba(0,0,0,0.3)",
  Header: "#EFF0F4",
  Error: "#FF364F",
  Ghost: "#6E7882",

  Profile: "#616161",
  Recipes: "#4C9C05",

  Primary: "#107dcb",
  Primary1: "#3096df",
  Primary2: "rgba(16, 170, 204, 0.2)",
  Primary3: "rgba(0, 153, 255, 0.09)",
  Back: "#000C1C",
  Back1: "#000F24",
  Back2: "#00132E",
  Back3: "#F7F7FB",
  Front: "#203B5C",
  Front0: "#355A88",
  Front1: "#1A2D47",
  Front2: "#16253B",
  Front3: "rgba(32, 59, 92, 0.8)",
  Front4: "rgba(32, 59, 92, 0.6)",
  Contrast: "#EDEDED",
  Faded: "#8291A4",
  RedSoft: "#E6815C",
  Violet: "#D817EE",
  Grey1: "#46566D",
  Grey2: "#7E7E7E",
  Grey3: "#E7E7E7",
  Grey4: "#FAFAFA",
  Grey5: "#ADB4BB",
  Info: "#5E6CEB",
  c: "#3B990F",
  a: "#ADEA4F",
};

export const Typ = {
  H1: 34,
  H2: 24,
  H3: 20,
  Normal: 16,
  Small: 14,
  Tiny: 12,
};

export const Spacing = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  giant: 48,
  // reduced margin
  r_small: 12,
};

export const Font = "Roboto";

export const Weight = {
  Bold: "bold",
  Normal: "normal",
  Normal1: "500",
};

export const mapItems = [
  {
    id: "123",
    image: "https://unsplash.com/photos/Q9Cw7EzsxSw/download?force=true&w=640",
    location: "USA",
    label: "dudu",
  },
  {
    id: "124",
    image: "https://unsplash.com/photos/Q9Cw7EzsxSw/download?force=true&w=640",
    location: "USA",
    label: "dada",
  },
];
export const Database = {
  home: [
    {
      nutrition_title: "sugar",
      nutrition_measure: 19,
      nutrition_unit: "g",
      nutrition_number: 80,
      color: "#EB665E",
    },
    {
      nutrition_title: "Fiber",
      nutrition_measure: 7,
      nutrition_unit: "g",
      nutrition_number: 25,
      color: "#2DAF0C",
    },
    {
      nutrition_title: "Vitamin A",
      nutrition_measure: 3500,
      nutrition_unit: "IU",
      nutrition_number: 3500,
      color: "#EDDE5D",
    },
  ],
  feed: {
    date: "2020-01-01",
    fkUserId: 1,
    healthScore: 75,
    id: 1,
    totalMeals: 3,
    defaultNutrients: [
      {
        title: "Calories",
        unit: "kcal",
        currentSize: 1318,
        maxSize: 1800,
      },
      {
        title: "Protein",
        unit: "g",
        currentSize: 43,
        maxSize: 30,
      },
      {
        title: "Fat",
        unit: "g",
        currentSize: 57,
        maxSize: 50,
      },
      {
        title: "Carbs",
        unit: "g",
        currentSize: 57,
        maxSize: 50,
      },
    ],
    tooMuchNutrients: [],
    notEnough: [],
    nutrientsData: [
      {
        nutrition_title: "sugar",
        nutrition_measure: 19,
        nutrition_unit: "g",
        nutrition_number: 80,
        color: "#EB665E",
      },
      {
        nutrition_title: "Fiber",
        nutrition_measure: 7,
        nutrition_unit: "g",
        nutrition_number: 25,
        color: "#2DAF0C",
      },
      {
        nutrition_title: "Vitamin A",
        nutrition_measure: 3500,
        nutrition_unit: "IU",
        nutrition_number: 3500,
        color: "#EDDE5D",
      },
    ],
    nutrientsUnits: {
      Alcohol: "g",
      Caffeine: "mg",
      Calcium: "mg",
      Calories: "kcal",
      Carbs: "g",
      Cholesterol: "mg",
      Copper: "mg",
      Fiber: "g",
      Folate: "ug",
      Iron: "mg",
      Magnesium: "mg",
      Manganese: "mg",
      Phosphorus: "mg",
      Potassium: "mg",
      Protein: "g",
      Selenium: "ug",
      Sodium: "mg",
      Sugar: "g",
      "Total Fat": "g",
      "Vitamin A": "IU",
      "Vitamin B1": "mg",
      "Vitamin B12": "ug",
      "Vitamin B2": "mg",
      "Vitamin B3": "mg",
      "Vitamin B5": "mg",
      "Vitamin B6": "mg",
      "Vitamin C": "mg",
      "Vitamin D": "ug",
      "Vitamin E": "mg",
      "Vitamin K": "ug",
      Zinc: "mg",
    },
  },
  meals: [
    {
      id: 0,
      title: "Amaranth Breakfast",
      image:
        "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 1,
      title: "Black coffee without sugar",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      title: "Black coffee without sugar",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      title: "Black ",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
  ],
};
