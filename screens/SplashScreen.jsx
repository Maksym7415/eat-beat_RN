import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import NutritionItem from '../components/Nutrition';
import Nutrient, { NutrientData } from '../components/Nutrient';
import HealthCircle from '../components/HealthCircle';
import Divider from '../components/Divider'

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
    nutrition_measure: 3500,
    nutrition_unit: 'IU',
    nutrition_number: 3500,
    color: 'yellow'
  }
]

const testNutrients = [
  {
    title: 'Caleroies',
    unit: 'kcal',
    currentSize: 1318,
    maxSize: 1800
  },
  {
    title: 'Protein',
    unit: 'g',
    currentSize: 43,
    maxSize: 30
  },
  {
    title: 'Fat',
    unit: 'g',
    currentSize: 57,
    maxSize: 50
  }
]

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5, marginRight: 5, marginBottom: 15}}>
          <View style={{width: '47%', marginRight: 5}}>
            <View style={{width: '100%'}}><Text style={{fontSize: 20, textAlign: 'center'}}>Total Meals</Text></View>
            <Nutrient width={'100%'}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 36, textAlignVertical: 'center'}}>3</Text>
              </View>  
            </Nutrient>
          </View>
          <View style={{width: '47%'}}>
            <View style={{width: '100%'}}><Text style={{fontSize: 20, textAlign: 'center', }}>Health Score</Text></View>
            
            <Nutrient width={'100%'}>
              <View style={{flexDirection: 'row'}}>
                  <View style={{width: '50%'}}>
                    <HealthCircle
                        value={0.71}
                        size={50}
                        thickness={6}
                        color="#2b80ff"
                        unfilledColor="#f2f2f2"
                        animationMethod="spring"
                        animationConfig={{ speed: 4 }}
                      />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 36, textAlignVertical: 'center', height: 38}}>71</Text>
                    <Text style={{fontSize: 16, textAlignVertical: 'bottom', height: 16, alignSelf: 'flex-end'}}>/100</Text>
                  </View> 
              </View>
            </Nutrient>
          </View>
      </View>
      <Divider
         {...styles.divider}
      />
        <View style={styles.itemContainer}>      
          {testNutrients.map((item, index) => 
            <Nutrient key={index} width={'47%'}>

            <NutrientData key={index} {...item}/>
          </Nutrient>
        )}
        </View> */}

        <View style={{borderRadius: 5, backgroundColor: 'grey', marginHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 40}}>
          <Text >
            Too much(3)
          </Text>
          <Image  source= {require('../assets/arrow_down.png')} style={{width: 25, height: 25}}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    //alignItems: "center",
    flex: 1,
  },
  itemContainer: {
    width: '100%',
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
},
nutrient_numbers: {
  width: '100%',
  marginTop: 10,
  flexDirection: 'row',
  justifyContent: 'space-between'
},
divider: {
  borderBottomColor:'black',
  borderBottomWidth: 1,
  marginBottom: 15
}
});
