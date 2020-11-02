import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Col } from '../Config';

interface Props{
    title: string
    setChipsState: (title: string, state: boolean) => void
    chipsState: object
    chipBgColor: string
}

export default function Chip({ title, setChipsState, chipsState, chipBgColor }: Props) {

    console.log(chipsState)
    return (
        <TouchableOpacity onPress={() => setChipsState(title, !chipsState[title])}>
            <View>
                <View style={{...styles.container, backgroundColor: !chipsState[title] ? Col.White : chipBgColor}}>
                    <Text style={{...styles.text, color: !chipsState[title] ? '#7A7A7A' : Col.White}}>
                    {title} 
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Col.White,
        borderRadius: 60,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 6,
        marginBottom: 8
    },
    text: {
        color: Col.White,
        fontWeight: 'normal',
        fontSize: 14,
        alignSelf: 'center'
    }
})