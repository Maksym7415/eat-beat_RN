import React, { useState, useEffect } from 'react';

import { View, Text, Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Col, Spacing } from '../../components/Config';
import { Divider } from '../../components/MyComponents';
import Chip from '../../components/custom/Chip';
import { Picker } from '@react-native-picker/picker';
import Select from '../../components/custom/Select';
import Input from '../../components/custom/Input';
import Button from '../../components/custom/ConfirmationButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import server from '../../server';
import Nutrition from '../../components/Nutrition';

interface Options {
    title: string,
    value: number
}

export default function PersonalDataScreen({ navigation } ) {

    const [selected, setSelected] = useState<Options>({title: 'Choose activity', value: 0})
    const [initialState, setInitialState] = useState<object>({
        personalData: {},
        activity: {},
        gender: {}

    })
    const [feed, setFeed] = useState<object>({})
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [chipsState, setChipsState] = useState<object>({Male: false, Female: false});

    const [personalData, setPersonalData] = useState<object>({})
    const setChips = (name: string, state: boolean) => {
        let newState = {}
        //if(Object.keys(chipsState)[0] === name) return;
        
        Object.keys(chipsState).forEach((el) => el === name ? newState[name] = state : newState[el] = !state)
            
        setChipsState(newState)
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

    const blurHandler = (name: string) => {
        setPersonalData((v:any) => ({...v, [name]: {...v[name], edit: false}}))
    }

    const savePersonalDataHandler = async () => {
        let personalObject = {
            gender: Object.keys(chipsState)[0].toLowerCase(),
            age: +personalData['Age'].value,
            height: +personalData['Height'].value,
            currentWeight: +personalData['Weight'].value,
            preferences: isEnabled,
            activity: selected.value,
        }
        Object.keys(personalObject).forEach((el) => {
            if(el !== 'preferences' && (!personalObject[el] || personalObject[el] === '-----')) {
                delete personalObject[el]
            }
        })
        await server.updateProfile(personalObject)
        await getProfileData();
    }

    const getProfileData = async () => {
        const { data: { gender, activity, preferences, ...other } } = await server.getProfile();
        const personalParams = {};
        const __editiablePersonalParams = ['age', 'height', 'currentWeight'];
        const units = ['years', 'cm', 'kg'];
        let unit = -1
        Object.keys(other).forEach((el) => {
            if(__editiablePersonalParams.includes(el)) {
                unit+=1
                if(el === 'currentWeight') {
                    return personalParams['Weight'] = {
                        title: 'Weight',
                        value: other[el] || '-----',
                        unit: units[unit],
                        edit: false
                    }
                }
                personalParams[el[0].toUpperCase() + el.slice(1)] = {
                    title: el[0].toUpperCase() + el.slice(1),
                    value: other[el] || '-----',
                    unit: units[unit],
                    edit: false
                }
            }
        })
        setInitialState({personalParams: personalParams, gender: {[gender && gender[0].toUpperCase() + gender.slice(1)]: true}, isEnabled: preferences})
        setPersonalData(personalParams)
        setIsEnabled(preferences)
       // setSelected(activity)
       if(!gender) {
           return setChipsState({Male: false, Female: false})
       }
        setChipsState({ [gender[0].toUpperCase() + gender.slice(1)]: true, [gender === 'male' ? 'Female' : 'Male']: false })
    }

    useEffect(() => {
        
        getProfileData();
    }, [])

    useEffect(() => {
        let focus = navigation.addListener("blur", () => {
            
            setPersonalData(initialState.personalParams);
            setIsEnabled(initialState.isEnabled)
            if(Object.keys(initialState.gender)[0] === 'null') {
                return setChipsState({Male: false, Female: false})
            }
            setChipsState(initialState.gender);
        });
        () => {
          focus = null;
        };
      }, [personalData]);

    return (
        <View style={{flex: 1, backgroundColor: Col.Back3}}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                
                    <View style={styles.toggleContainer}>
                        <Text style={styles.toggleText}>
                            Use individual infake 
                            recommendations
                        </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#616161" }}
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
                                        state={chipsState.Male}
                                        setChipsState={setChips} 
                                        chipsState={chipsState} 
                                        title={'Male'}
                                        chipBgColor={'#616161'}
                                        isEnabled={isEnabled}
                                    />
                                    <Chip
                                        state={chipsState.Female}
                                        setChipsState={setChips} 
                                        chipsState={chipsState} 
                                        title={'Female'}
                                        chipBgColor={'#616161'}
                                        isEnabled={isEnabled}
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
                                        onBlur={blurHandler}
                                        defaultIcon={false}
                                        defaultIconSize={16}
                                        additionalIcon={false}
                                    /> 
                                    : 
                                    <TouchableOpacity onPress={() => onEditHandler(personalData[el].title)}>
                                        <Text style={{color: personalData[el].value === '-----' && isEnabled ? 'red': Col.Black}}>
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
                            <View style={styles.ageContainer}>
                                <Text style={styles.activityText}>
                                Activity
                                </Text>
                                <View style={{width: '50%'}}>
                                    <Select
                                        isEnabled={isEnabled}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />

                                </View>
                            </View>
                        </View>      
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
        <View style={{paddingHorizontal: 16, position: 'absolute', width: '100%', bottom: 46}}>
            <Button 
                title={'Save changes'} 
                onClickHandler={savePersonalDataHandler} 
                bckColor={'#616161'}
                textColor={Col.White}
                fts={14}
                ftw={'500'}
                absolute={false}
            />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
    position: 'relative'
    },
    toggleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
        paddingHorizontal: 16,
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
        marginVertical: 16,
        paddingHorizontal: 16,
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
  });