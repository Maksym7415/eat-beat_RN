import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons as Icon } from "@expo/vector-icons";
import KeyboardShift from '../KeyboardShift';

interface Props {
    type: string
    label: string
    value: number
    onChange: (value: string, name: string) => void
    onPressHandler: (name: string) => void
    defaultIcon: string
    defaultIconSize: number
    additionalIcon: string
}

export default function Input({ label, type, value, onChange, onPressHandler, defaultIcon, defaultIconSize, additionalIcon }: Props) {

    return (
        <View style={styles.itemContainer}>
            <View style={styles.container}>          
                <TextInput style={styles.labelText} onChangeText={(text) => onChange(text, label)} keyboardType={type} value={value + ''} style={{width: '80%'}}/>
                    <View>
                        {defaultIcon && <Icon
                            onPress={() => onPressHandler(label)}             
                            name={defaultIcon}
                            size={defaultIconSize}
                        />}
                        {
                        additionalIcon && 
                            <Icon  
                                name={additionalIcon} 
                                size={21}                           
                            />
                        }
                    </View>
                
            </View>
        </View>
    )   

}
const styles = StyleSheet.create({
    itemContainer: {
        width: '50%'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 19,
        paddingVertical: 3,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DADDDF'
    },
    labelText: {
        alignSelf: 'center'
    }
})