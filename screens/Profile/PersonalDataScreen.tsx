import React, { useState, useRef } from 'react';

import { View, Text, Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Col, Spacing } from '../../components/Config';
import { Divider } from '../../components/MyComponents';
import Chip from '../../components/custom/Chip';
import { Picker } from '@react-native-picker/picker';
import Select from '../../components/custom/Select';
import Input from '../../components/custom/Input';
import Button from '../../components/custom/ConfirmationButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PersonalDataScreen() {

    const ref = useRef(null)
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [chipsState, setChipsState] = useState<object>({Male: true});
    const [personalData, setPersonalData] = useState<object>({
        Age: {
            title: 'Age',
            value: '23',
            unit: 'years',
            edit: false
        },
        Height: {
            title: 'Height',
            value: '175',
            unit: 'cm',
            edit: false
        },
        Weight: {
            title: 'Weight',
            value: '75',
            unit: 'kg',
            edit: false
        },
    })
    const [intakeNorm, setIntakeNorm] = useState({
        calories: {
            title: 'Calories (kcal)',
            value: ''
        },
        proteins: {
            title: 'Proteins (g)',
            value: ''
        },
        fats: {
            title: 'Total fats (g)',
            value: ''
        },
        carbs: {
            title: 'Total Carbs (g)',
            value: ''
        },
    })
        
    const setChips = (name: string, state: boolean) => {
        if(Object.keys(chipsState)[0] === name) return;
        setChipsState({...{}, [name]: state})
    }

    const onChangeHandler = (value: string, name: string) => {
        setIntakeNorm((v: any) => ({...v, [name]: {...v[name], value}})) 
    }

    const personalChangeHandler = (value: string, name: string) => {
        setPersonalData((v: any) => ({...v, [name]: {...v[name], value}}))
    }

    const onEditHandler = (name: string) => {
        setPersonalData((v:any) => ({...v, [name]: {...v[name], edit: true}}))
    }

    const onPressHandler = (name: string) => {
        setPersonalData((v:any) => ({...v, [name]: {...v[name], edit: false}}))
    }

    return (
        <ScrollView>
            {console.log(intakeNorm)}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                
                    <View style={styles.toggleContainer}>
                        <Text style={styles.toggleText}>
                            Use individual infake 
                            recommendations
                        </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#DADDDF"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <Divider styler={styles.divider}/>
                        <View style={styles.personalContainer}>
                            <View style={styles.genderContainer}>
                                <Text>
                                    Gender
                                </Text>
                                <View style={styles.chipsConatainer}>
                                    <Chip 
                                        setChipsState={setChips} 
                                        chipsState={chipsState} 
                                        title={'Male'}
                                        chipBgColor={'#616161'}
                                    />
                                    <Chip 
                                        setChipsState={setChips} 
                                        chipsState={chipsState} 
                                        title={'Female'}
                                        chipBgColor={'#616161'}
                                    />
                                </View>
                            
                            </View>
                        
                            
                            {Object.keys(personalData).map((el) => (
                                <View style={styles.ageContainer}>
                                    <Text style={styles.ageText}>
                                        {personalData[el].title}
                                    </Text>
                                    <View style={styles.yearsContainer}>
                                    {personalData[el].edit ? <Input
                                        label={personalData[el].title}
                                        type={'numeric'}
                                        value={personalData[el].value}
                                        onChange={personalChangeHandler}
                                        onPressHandler={onPressHandler}
                                        defaultIcon={'check'}
                                        defaultIconSize={16}
                                        additionalIcon={false}
                                    /> 
                                    : 
                                    <TouchableOpacity onPress={() => onEditHandler(personalData[el].title)}>
                                        <Text>
                                            {personalData[el].value}
                                        </Text>
                                    </TouchableOpacity>
                                    }
                                    <Text>
                                        {personalData[el].unit}
                                    </Text>
                                    </View>
                                </View>
                            ))}
                            <View style={{...styles.ageContainer}}>
                                <Text style={styles.activityText}>
                                Activity
                                </Text>
                                <View style={{width: '50%'}}>
                                    <Select value={'MEDIUM'}/>

                                </View>
                            </View>
                        </View>
                        <Divider styler={styles.divider}/>
                        <View style={styles.intakeNormContainer}>
                            <Text>
                                Daily intake norm
                            </Text>
                            <View>
                                {Object.keys(intakeNorm).map((el: string) => (
                                    <View style={styles.normItemContainer}>
                                        <Text>
                                            {intakeNorm[el].title}
                                        </Text>
                                        <Input
                                            label={el}
                                            value={intakeNorm[el].value}
                                            type={'numeric'}
                                            onPressHandler={() => console.log('ex')}
                                            onChange={(value, name) => onChangeHandler(value, name)}
                                            defaultIcon={'keyboard-arrow-up'}
                                            defaultIconSize={21}
                                            additionalIcon={'keyboard-arrow-down'}
                                        />
                                </View>
                                ))}
                            </View>
                    </View>
                    <View style={{marginTop: 40, marginBottom: 32}}>
                        <Button 
                            title={'Save changes'} 
                            onClickHandler={() => console.log(1)} 
                            bckColor={'#616161'}
                            textColor={Col.White}
                            fts={14}
                            ftw={'500'}
                            absolute={false}
                        />
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   alignItems: "center",
    //   justifyContent: "center"
    backgroundColor: Col.White,
    paddingHorizontal: 16,
    },
    toggleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16
    },
    toggleText: {
        width: 150
    },
    divider: {
        borderBottomWidth: 1,
        //marginVertical: Spacing.small,
        borderBottomColor: Col.Divider,
      },
    personalContainer: {
        marginVertical: 16
    },
    genderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    chipsConatainer: {
        display: 'flex',
        flexDirection: 'row',

    },
    ageContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 27,
    },
    ageText: {
        width: '50%'
    },
    yearsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '50%',
    },
    activityText: {
        width: '50%',
        alignSelf: 'flex-start',
        paddingTop: 15
    },
    intakeNormContainer: {
        marginTop: 16
    },
    normItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    }
  });