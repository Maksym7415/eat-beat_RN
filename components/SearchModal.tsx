import React, { useState } from 'react';
import Header from './Header';
import { View, Modal, Dimensions } from 'react-native';
import { Col } from './Config';

export default function SearchModal({ modalVisible, hideModal, onChangeHandler, value, searchHandler }: any) {



    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
                <Header hideModal = {hideModal} onChangeHandler={onChangeHandler} value={value} searchHandler = {searchHandler} showInput={true}/>
            <View style={{height: Dimensions.get('window').height, backgroundColor: Col.White, opacity: 0.7}}> 
            </View>
        </Modal>

    )
}