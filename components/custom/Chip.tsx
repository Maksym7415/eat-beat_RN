import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Col } from '../Config';

interface Props{
    title: string
    setChipsState: (title: string, state: boolean) => void
    chipBgColor: string
    state: boolean
    isEnabled?: boolean
    chipsState: object
}

export default function Chip({ title, setChipsState, state, chipBgColor, isEnabled, chipsState = {} }: Props) {
    const { Male, Female } = chipsState
    return (
        <TouchableOpacity onPress={() => setChipsState(title, !state)}>

            <View>
                <View style={{...styles.container, backgroundColor: !state ? Col.White : chipBgColor, borderColor: isEnabled && Male && Female ? 'red': Col.Back3}}>
                    <Text style={{...styles.text, color: !state ? '#7A7A7A' : Col.White}}>
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
        marginBottom: 8,
        borderWidth: 1
    },
    text: {
        color: Col.White,
        fontWeight: 'normal',
        fontSize: 14,
        alignSelf: 'center'
    }
})