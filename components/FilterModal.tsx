import React, { useState, useEffect } from 'react';
import Header from './Header';
import { View, Modal, Dimensions, Text, StyleSheet } from 'react-native';
import { Col, Spacing, Typ } from './Config';
import Chip from './custom/Chip';
import { Divider } from "./MyComponents";
import RadioBtn from './Radio';
import Button from './custom/ConfirmationButton';
import { ScrollView } from 'react-native-gesture-handler';
import UserSettings from './UserSettings';

export default function FilterModal({ modalVisible, hideModal, data, saveFilterData, constaintNumber, radioState, setRadioState, chipsState, setChipsState, mealsTypes, setMealsTypes }: any) {

    const saveFilterConfig = ({intolerances, diets, meals}, isClick: boolean) => {
        saveFilterData({meals: meals.filter((el) => el.isUsers).map((el) => el.name.toLowerCase()).join(' ,'), intolerances: intolerances.filter((el) => el.isUsers).map((el) => el.name.toLowerCase()).join(' ,'), diets: diets.filter((el) => el.isUsers).map((el) => el.name.toLowerCase()).join('')})
        !isClick && hideModal(true)
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >   
        
            <ScrollView>
            <Header hideModal = {hideModal} name={`Constraint(${constaintNumber})`} showInput={false} />
            <UserSettings  
                data={data} 
                saveFilterConfig={saveFilterConfig} 
                btnColor={Col.Green}
                chipColor={Col.Green}
                radioState={radioState}
                setRadioState={setRadioState} 
                chipsState={chipsState}
                setChipsState={setChipsState}
                mealsTypes={mealsTypes}
                setMealsTypes={setMealsTypes}
            />
            </ScrollView>
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