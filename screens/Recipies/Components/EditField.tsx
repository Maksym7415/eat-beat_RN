import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Col } from '../../../components/Config';

interface Edit {
    editTitle?: boolean
    editIngradients?: boolean
    editInstruction?: boolean
}
interface RecipeData {
    title?: string,
    Instruction?: string
}

interface EProps {
    title: string
    type: string
    editName: string
    editHandler: (editName: string, state: boolean) => void
    onChangeHandler: (text:string, name: string, idField: number) => void
    editState: Edit
    setText: () => void
    text: RecipeData
    textFieldsArray: Array<number> 
    addNewField: () => void
}

export default function EditField ({title, type, editName, editHandler, onChangeHandler, editState, text}: EProps) {
    return (
        <View style={styles[type]}>
            <View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{width: '90%'}}>
                        {title}
                    </Text>
                   {!editState[editName] ? 
                    <MaterialIcons
                        onPress={() => editHandler(editName, true)}
                        name={'edit'}
                        color={'#46566D'}
                        size={22}
                    /> : null}
                </View>
                {editState[editName] ? 
                 <TextInput
                    value={text[editName]}
                    style={{borderWidth: 1, borderColor: Col.Grey2, width: '75%', borderRadius: 8, height: 35, marginTop: 10}}
                    onChangeText={(text) => onChangeHandler(text, editName)}
                    onBlur={() => editHandler(editName, false)}
                /> : <Text>{text[editName]}</Text>}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    editContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    editContainer1: {
        minHeight: 109,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Col.White,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12
    },
})