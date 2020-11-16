import { HeaderBackground } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Col } from '../../../components/Config';
import CheckBox from '../../../components/custom/CheckBox';

export default function IngradientRow({ name, title, unit, uri, servings, checked, checkHandler, weight }) {
    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
          <CheckBox
            onCheck={checkHandler}
            blend={'#4C9C05'}
            checkColor={'#ffffff'}
            value={checked[name]}
            name={name}
            size={20}
          />
          {console.log(uri)}
            </View>
            <Image style={styles.image} source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${uri}` }} />
            <Text>{servings}</Text>
            <Text>{title}</Text>
            <Text>{name}</Text>
            <Text>({`${servings*weight.amount}${weight.unit}`})</Text>
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
    },
    checkboxContainer: {
        // flexDirection: "row",
        // marginBottom: 20,
      },
})