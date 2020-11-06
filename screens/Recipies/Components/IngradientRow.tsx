import { HeaderBackground } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Col } from '../../../components/Config';

export default function IngradientRow({ name, title, unit, uri, servings }) {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri }} />
            <Text>{servings}</Text>
            <Text>{title}</Text>
            <Text>{name}</Text>
            <Text>{unit}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: Col.Grey3,
        backgroundColor: 'white' 
    },
    image: {
        width: 30,
        height: 30,
    }
})