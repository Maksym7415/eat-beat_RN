import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons as Icon, MaterialIcons, Entypo } from "@expo/vector-icons";
import { Col, Typ } from '../../../components/Config';
import Button from '../../../components/custom/ConfirmationButton';
import Select from './Select';
import Servings from './Servings';

export default function Ingradients({ addNewField, textFieldsArray, onChangeIngradientsHandler, onBlurIngradientsHandler, setTextFieldsArray, isEnabled, selected, setSelected, value, setValue })  { 
    return (
        <View style={styles.editContainer1}>     
                <View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{width: '100%'}}>
                        {'Ingredients'}
                    </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'column', width: '100%', marginTop: 10}}>
                {textFieldsArray.map((field) => (
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}> 
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                            <TextInput
                                key={field.id}
                                value={field.title}
                                style={{borderColor: Col.Grey2, borderBottomWidth: 1, width: '30%', borderRadius: 8, height: 40, padding:0}}
                                onChangeText={(text) => onChangeIngradientsHandler(text, field.id)}
                                // onBlur={() => onBlurIngradientsHandler(field.id)}
                                placeholder={'food'}
                            />
                            {/* <Select
                                isEnabled={isEnabled}
                                selected={selected}
                                setSelected={setSelected}
                            /> */}
                            <TextInput
                                key={field.unitId}
                                value={field.unitTitle}
                                style={{borderColor: Col.Grey2, borderBottomWidth: 1, width: '30%', borderRadius: 8, height: 40, padding:0}}
                                onChangeText={(text) => onChangeIngradientsHandler(text, field.unitId, true)}
                                // onBlur={() => onBlurIngradientsHandler(field.id)}
                                placeholder={'unit'}
                            />
                            <Servings
                                id={field.id}
                                servings={field.servings}
                                setValue={setTextFieldsArray}
                            />
                            </View>
                            <Icon name='delete' size={22} style={{alignSelf: 'center'}} onPress={() => setTextFieldsArray((arr) => arr.filter((el) => el.id !== field.id))}/>
                            {/* {!field.isTextShow && <MaterialIcons name='check' size={22} style={{alignSelf: 'center'}} onPress={() => onBlurIngradientsHandler(field.id)}/>} */}
                    </View>
                ))}
                </View>
                <Button 
                    title={'Add new ingredient'} 
                    onClickHandler={() => addNewField('Ingredients', true)} 
                    border={styles.border}
                    bckColor={''} 
                    textColor={'#46566D'} 
                    fts={Typ.Small}
                    ftw={'500'}
                />

                </View>
                
            </View>
    )
}

const styles = StyleSheet.create({
    border: {
        borderColor: Col.Grey2,
        borderWidth: 1
    },
    editContainer1: {
        minHeight: 109,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Col.White,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 12
    },
})