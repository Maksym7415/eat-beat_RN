import React from 'react';

import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons as Icon } from "@expo/vector-icons";
import KeyboardShift from '../KeyboardShift';
import { Col } from '../Config';

interface Props {
    type: string
    label: string
    value: number
    onChange: (value: string, name: string) => void
    onPressHandler: (name: string) => void
    onBlurHandler: (name: string) => void
    defaultIcon: string
    defaultIconSize: number
    additionalIcon: string
    isEnabled: boolean
}

export default function Input({ label, type, value, onChange, onPressHandler, defaultIcon, defaultIconSize, additionalIcon, onBlur: onBlurHandler, isEnabled }: Props) {

    return (
        <View style={styles.itemContainer}>
            <View style={[!defaultIcon ? {...styles.container, paddingVertical: 8} : styles.container, {...styles.container, borderColor: '#DADDDF'}]}>          
                <TextInput
                editable={!isEnabled}
                autoFocus 
                style={styles.labelText} 
                onBlur={() => onBlurHandler(label)} 
                onChangeText={(text) => onChange(text, label)} 
                keyboardType={type} 
                value={isNaN(+value) ? '' : value + ''} 
                style={{width: '80%'}}/>
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
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DADDDF'
    },
    labelText: {
        alignSelf: 'center'
    }
})