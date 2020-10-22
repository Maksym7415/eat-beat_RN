import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Col, Weight, Typ } from './Config'


export default function Nutrient({ title = '', currentSize = '', maxSize = '', unit = '', width, child, children }){
    return (
        <View style={{...styles.container, width }}>
            {child !== true ? 
                <>
                    <View>
                        <Text style={styles.nutrient_title}>{`${title} (${unit})`}</Text>
                    </View>
                    <View style={styles.nutrient_numbers}>
                        <Text style={styles.unit}>{currentSize}</Text>
                        <View style={styles.maxCount}>
                            <Text style={styles.maxCountText}>{`of ${maxSize}`} </Text>
                        </View>
                    </View>
                </> : children}
                   
        </View>
    )
}
   
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 3,
        marginVertical: 3,
        marginRight: 5,
        width: '47%',
        backgroundColor: Col.White,
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 7
    },
    nutrient_title: {
        fontFamily: 'Roboto',
        fontWeight: Weight.Normal,
        fontSize: Typ.Normal,
        color: Col.Grey2
    },
    nutrient_numbers: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    unit: {
        fontWeight: Weight.Normal1,
        fontSize: Typ.H3,
        fontFamily: 'Roboto',
        color: Col.Grey1
    },
    maxCount: {
        backgroundColor: Col.Green,
        minWidth: 70,
        borderRadius: 8,  
        paddingTop: 5, 
        paddingBottom: 5, 
        paddingRight: 10, 
        paddingLeft: 10
    },
    maxCountText: {
        color: Col.Green1,
        fontFamily: 'Roboto',
        fontWeight: Weight.Normal,
        fontSize: Typ.Tiny,
        textAlign: 'center',
    }
})