import { fstat } from 'fs';
import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button({ title, onClickHandler, bckColor, textColor, fts, ftw }) {

    return (
        <TouchableOpacity style={{...styles.contanier, backgroundColor: bckColor}} onPress={onClickHandler}>
            <View>
                <Text style={{color: textColor, fontSize: fts, fontWeight: ftw}}>
                    {title.toUpperCase()}
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
        position:'absolute',
        bottom: 125,
        alignSelf:'center',
        width: '100%'
    }
})