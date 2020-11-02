import React, { useState, useEffect } from 'react';
import Header from './Header';
import { View, Modal, Dimensions, Text, StyleSheet } from 'react-native';
import { Col, Spacing, Typ } from './Config';
import Chip from './custom/Chip';
import { Divider } from "./MyComponents";
import RadioBtn from './Radio';
import Button from './custom/ConfirmationButton';

export default function FilterModal({ modalVisible, hideModal, data, saveFilterData, constaintNumber }: any) {


    const [radioState, setRadioState] = useState<object>({})
    const [chipsState, setChipsState] = useState<object>({})

    const setNewRadioState = (value, name) => {
        setRadioState((v) => {
            let newStateObject = {}
            Object.keys(v).forEach((el) => {
                if(el[name]) newStateObject[name] = false
                newStateObject[name] = true
            })
            return newStateObject
        })
    }

    const setChips = (name, state) => {
        setChipsState((v) => ({...v, [name]: state}))
    }

    const saveFilterConfig = () => {
        const intolerancesArray:any = []
        Object.keys(chipsState).forEach(el => chipsState[el] === true ? intolerancesArray.push(el.toLowerCase()) : false )
        saveFilterData({intolerances: intolerancesArray.join(' ,'), diets: Object.keys(radioState)[0]})
        hideModal(true)
    }

    useEffect(() => {
        let diets = {}, intolerances = {}
        data.diets && data.diets.forEach(el => diets[el.name] = el.isUsers)
        data.intolerances && data.intolerances.forEach(el => el.isUsers === true ?  intolerances[el.name] = true : false)
        setRadioState(diets)
        setChipsState(intolerances)
    }, [data.diets])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <Header hideModal = {hideModal} name={`Constraint(${constaintNumber})`} showInput={false} />
            <View style={{backgroundColor: Col.Back3, paddingHorizontal: 16, height: Dimensions.get('window').height}}>
                <View style={styles.intolerances}>
                    <Text style={styles.intolerances_text}>Intolerances</Text>
                    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 22}}>  
                        {data.intolerances && data.intolerances.map((el) => <Chip chipBgColor={Col.Green} chipsState={chipsState} setChipsState={setChips} title={el.name} key={el.id}/>)}
                    </View>
                </View>       
                <Divider styler={styles.divider}/>
                <View >
                    <Text style={styles.intolerances_text}>Diet</Text>
                    <View style={{ marginTop: 22}}>
                        {data.diets && data.diets.map((el) => <RadioBtn key={el.id} label={el.name} defaultValue = {el.isUsers} setSelect = {(value, name) => setNewRadioState(value, name)} newState = {radioState}/>)}
                    </View>
                </View>
                <Divider styler={styles.divider}/>
                <View>
                    <Text style={styles.intolerances_text}>Meal Types</Text>
                   <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 22}}>  
                        {data.mealTypes && data.mealTypes.map((el) => <Chip title={el.name} key={el.id}/> )}
                    </View>
                </View>
                    <Button title={'Save changes'} bckColor={Col.Green} textColor={Col.White} fts={Typ.Small} ftw={'500'} onClickHandler={saveFilterConfig} />
                
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    intolerances: {
        marginTop: 26
    },
    intolerances_text: {
        fontWeight: '500',
        fontSize: 20,

    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: Col.Divider,
        marginVertical: Spacing.r_small,
    }

})