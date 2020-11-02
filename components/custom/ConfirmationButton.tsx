import { fstat } from 'fs';
import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button({ title, onClickHandler, bckColor, textColor, fts, ftw, absolute }) {

    return (
        <TouchableOpacity style={{...styles.contanier, backgroundColor: bckColor, bottom: absolute ? 125 : 0, position: absolute ? 'absolute' : 'relative'}} onPress={onClickHandler}>
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
        alignSelf:'center',
        width: '100%'
    }
})