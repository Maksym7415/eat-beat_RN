import { fstat } from 'fs';
import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button({ title, onClickHandler, bckColor, textColor, fts, ftw, border = {}, disabled }) {

    return (
        <TouchableOpacity style={{...styles.contanier, backgroundColor: disabled ? '#E5E5E5' : bckColor, ...border}} onPress={onClickHandler}>
            <View>
                <Text style={{color: disabled ? '#CDD1D6' :  textColor, fontSize: fts, fontWeight: ftw}}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    contanier: {
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        alignSelf:'center',
        width: '100%'
    }
})