import React from 'react';
import { StyleSheet, Text, View } from "react-native";



export const NutrientData = ({ title = '', currentSize = '', maxSize = '', unit = '' }) => {
    return (
        <>
            <View>
                <Text>{title}</Text>
            </View>
            <View style={styles.nutrient_numbers}>
                <Text>{`${currentSize}(${unit})`}</Text>
                <Text style={{backgroundColor: 'green', borderRadius: 7,  paddingTop:  5, paddingBottom: 5, paddingRight: 10, paddingLeft: 10}}>{`of ${maxSize}`} </Text>
            </View>
        </>
    )
}
   

export default function Nutrient({ children, width }) {
    return (
        <View style={{...styles.container, width }}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 3,
        marginVertical: 3,
        width: '47%',
        backgroundColor: 'red',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 7
    },
    nutrient: {

    },
    nutrient_numbers: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})