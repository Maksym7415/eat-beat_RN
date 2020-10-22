import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import NutritionItem from '../components/Nutrition';
import Nutrient from '../components/Nutrient';
import Nutrition from '../components/Nutrition';
import HealthCircle from '../components/HealthCircle';
import Divider from '../components/Divider';
import Collapce from '../components/Collapce';
import Modal from '../components/Modal';
import { AntDesign } from '@expo/vector-icons'
import { Typ, Col, Weight } from '../components/Config';

const testNutrtitionArray = [
  {
    nutrition_title: 'sugar',
    nutrition_measure: 19,
    nutrition_unit: 'g',
    nutrition_number: 80,
    color: '#EB665E'
  },
  {
    nutrition_title: 'Fiber',
    nutrition_measure: 7,
    nutrition_unit: 'g',
    nutrition_number: 25,
    color: '#2DAF0C'
  },
  {
    nutrition_title: 'Vitamin A',
    nutrition_measure: 3500,
    nutrition_unit: 'IU',
    nutrition_number: 3500,
    color: '#EDDE5D'
  }
]

const testNutrients = [
  {
    title: 'Calories',
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
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = (sw) => {
    setModalVisible(sw)
  }

  return (
    <View style={styles.container}>
      <Modal modalVisible={modalVisible} showModal={showModal}/>
      <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5, marginRight: 5}}>
          <View style={{width: '47%', marginRight: 8}}>
            <View style={{width: '100%'}}><Text style={styles.title}>Total Meals</Text></View>
            <Nutrient width={'100%'} child={true}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.scoreNumber}>3</Text>
              </View>  
            </Nutrient>
          </View>
          <View style={{width: '47%'}}>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.title}>Health Score</Text>
              <TouchableOpacity onPress={() => showModal(true)}>
                <AntDesign name='questioncircle' size={11} />
              </TouchableOpacity>
              </View>
            
            <Nutrient width={'100%'} child={true}>
              <View style={{flexDirection: 'row', paddingRight: 12}}>
                  <View style={{width: '50%'}}>
                    <HealthCircle
                        value={0.71}
                        size={46}
                        thickness={6}
                        color={Col.Green1}
                        unfilledColor={Col.Back3}
                        animationMethod="spring"
                        animationConfig={{ speed: 4 }}
                      />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.scoreNumber}>71</Text>
                    <Text style={{...styles.scoreNumber, fontSize: Typ.H2, textAlignVertical: 'bottom'}}>/100</Text>
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
            <Nutrient key={index} {...item} width={'47%'}/>
        )}
        </View>
        <Divider
          {...styles.divider}
        />
        <Collapce 
          title={'To much (3)'}
          titleStyle={'error_text'}
          icon_type={'alert'}
        />
         <Collapce 
          title={'Not enough (5)'}
          titleStyle={'info_text'}
          icon_type={'info'}
        />
         <Divider
         {...{...styles.divider, marginTop: 7}}

        />
        <View style={styles.nutrition_container}>
          {testNutrtitionArray.map((item) =>    
              <Nutrition {...item}/>
          )}
        </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: '#E5E5E5',
    height: '100%'
    //justifyContent: "center",
    //alignItems: "center",
   // flex: 1,
  },
  itemContainer: {
    width: '100%',
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
},
wrapContainer: {
  marginHorizontal: 3,
  marginVertical: 3,
  width: '47%',
  backgroundColor: Col.White,
  borderRadius: 8,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 10,
  paddingTop: 7
},
nutrient_numbers: {
  width: '100%',
  marginTop: 10,
  flexDirection: 'row',
  justifyContent: 'space-between'
},
divider: {
  borderBottomColor: 'black',
  borderBottomWidth: 0.5,
  marginBottom: 15,
  marginTop: 15
},
title: {
  fontSize: Typ.Normal, 
  color: Col.Grey1, 
  textAlign: 'center', 
  fontWeight: Weight.Bold,
  paddingRight: 5
},
scoreNumber: {
  fontSize: Typ.H1, 
  fontWeight: Weight.Normal,
  color: Col.Grey1,
  fontFamily: 'Roboto',
  textAlignVertical: 'center', 
},
nutrition_container: {
  // width: '95%',
  backgroundColor: Col.White,
  marginHorizontal: 10,
  paddingHorizontal: 10,
  paddingTop: 8,
  borderRadius: 8,

}
});
