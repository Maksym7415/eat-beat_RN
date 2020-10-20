import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NutritionItem from '../components/Nutrition'

const testNutrtitionArray = [
  {
    nutrition_title: 'sugar',
    nutrition_measure: 19,
    nutrition_unit: 'g',
    nutrition_number: 80,
    color: 'red'
  },
  {
    nutrition_title: 'Fiber',
    nutrition_measure: 7,
    nutrition_unit: 'g',
    nutrition_number: 25,
    color: 'blue'
  },
  {
    nutrition_title: 'Vitamin A',
    nutrition_measure: 4500,
    nutrition_unit: 'IU',
    nutrition_number: 5000,
    color: 'yellow'
  }
]

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>Welcome</Text> */}
        <View style={styles.itemContainer}>
          {testNutrtitionArray.map((item, index) => 
          <NutritionItem key={index}
            nutrition_title={item.nutrition_title}
            nutrition_measure={item.nutrition_measure}
            nutrition_unit={item.nutrition_unit}
            nutrition_number={item.nutrition_number} 
            color={item.color}
          /> )}
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  itemContainer: {
    width: 350,
    flexDirection: 'column',
    marginRight: 65,
},
});
