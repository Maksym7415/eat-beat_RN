import React, { useState } from 'react';
import { MaterialIcons,  } from "@expo/vector-icons";
import { View, TouchableWithoutFeedback, Text, ScrollView, StyleSheet } from 'react-native';
import { Col } from '../../../components/Config';

interface Options {
    title: string,
    value: number
}
let count = 0

export default function Select({selected = {}, setSelected, isEnabled}) {

    const [show, setShow] = useState<string>('none')
    const options: Array<Options> = [
        {title: 'BMR', value: 1.2},
        {title: 'Sedentary', value: 1.375},
        {title: 'Light', value: 1.46},
        {title: 'Moderate', value: 1.55},
        {title: 'Active', value: 1.64},
        {title: 'Very active', value: 1.72},
        {title: 'Extra active', value: 1.9},
    ]
    const changeHanlder = (title: string, value: number) => {
        setSelected({title, value});
        setShow('none')
        count = 1
    }
    
    const showHandler = () => {
        count+=1;
        if(count % 2) {
            return setShow('none')
        }
        return setShow('flex')
    }

    return(
        <View>
            <TouchableWithoutFeedback onPress={showHandler} >
                <View style={{...styles.container, borderColor: !selected.value && isEnabled ? 'red' :  '#DADDDF'}}>
                    <View style={styles.optionContainer}>
                        <Text style={{color: Col.Grey2, opacity: 0.5, paddingBottom: 7}}>
                            {selected.title}    
                        </Text>
                        <MaterialIcons name="arrow-drop-down" size={20} color={Col.Grey2}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {show==='flex'? 
            <View style={{...styles.options,  zIndex: 1, height: 130, position: 'absolute', top: 50, left: 0, width: '100%',}}>
                <ScrollView >
                    {options.map(({ title, value }: Options, index) => {
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => changeHanlder(title, value)} style={{borderRadius: 8, borderWidth: 1, borderColor: '#DADDDF', zIndex: 10}}>
                                <Text style={{ paddingVertical: 12, paddingHorizontal: 17, backgroundColor: value === selected.value ? '#DADDDF' : Col.White}}>
                                    {title}
                                </Text> 
                            </TouchableWithoutFeedback>   
                        )
                    })}
                </ScrollView>
            </View>
            :<View/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 18,
        paddingVertical: 13,
        borderRadius: 8,
    },
    optionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderColor: Col.Grey2
    },
    options: {
        display: 'flex',
        borderRadius: 8,
        //borderWidth: 1.5,
        borderColor: '#DADDDF',
    }
})