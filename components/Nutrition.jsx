import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NutritionItem({ color, nutrition_title, nutrition_measure, nutrition_unit, nutrition_number }) {

    const precent = Math.round(nutrition_measure/nutrition_number*100)
  return (
    <View style={styles.itemContainer}>
            <Text style={{width:'22%'}}>{nutrition_title}</Text>
            <Text style={{width:'10%'}}>({nutrition_unit})</Text>
            <Text style={{width:'15%'}}>{nutrition_measure}/</Text>
            <Text style={{width:'15%'}}>{nutrition_number}</Text>
            <Text style={{width:'12%'}}>{`${precent} %`}</Text>
            <Text style={{width: precent/2, backgroundColor: color}}></Text>      
    </View>
  );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 10,
        flexDirection: 'row',
    }
});
