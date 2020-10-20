import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NutritionItem({ color, nutrition_title, nutrition_measure, nutrition_unit, nutrition_number }) {

    const precent = Math.round(nutrition_measure/nutrition_number*100)
  return (
    <View style={styles.itemContainer}>
        <View style={styles.itemWrapper}>
            <Text>{nutrition_title}</Text>
            <Text>({nutrition_unit})</Text>
            <Text>{nutrition_measure}/</Text>
            <Text>{nutrition_number}</Text>
           
        </View>    
        <View style={styles.precentWrapper}>
        <Text>{`${precent} %`}</Text>
        <Text style={{width: precent, backgroundColor: color, marginLeft: 10}}></Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    itemContainer: {
       // width: 350,
        marginBottom: 10,
       flexDirection: 'row',
    },
    itemWrapper: {
        width: 250,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    precentWrapper: {
        flexDirection: 'row'
    }
});
