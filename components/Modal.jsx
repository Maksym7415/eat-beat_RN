import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from "react-native";
import { Entypo } from '@expo/vector-icons';
import {Weight, Typ, Col} from './Config'

export default function ModalWindow({ showModal, modalVisible }) {
    return (
        <>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            console.log('close')
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{alignItems: 'flex-end', width: '100%'}}>
                        <TouchableOpacity onPress={() =>showModal(false)}>
                            <Entypo name='cross' size={24} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{justifyContent: 'flex-start', width: '100%', marginBottom: 12}}>
                        <Text style={styles.modalTitle} >Health score</Text>
                    </View>
                    <View>
                        <Text style={{...styles.description, marginBottom: 24}}>
                            SHealth Score is an integral indicator characterising the proximity of the daily nutrient balance to the recommended intake norm. The value is calculated per day and includes all registered foods/meals.
                        </Text>
                        <Text style={{...styles.description, marginBottom: 24}}>
                            The maximum value is 100 points, the minimum is 0 points.
                        </Text>
                        <Text style={styles.description}>
                            When calculating the indicator, the following data are taken into account:
                        </Text>
                        <Text style={styles.description}>
                        - deviation from the norm for each nutrient
                        </Text>
                        <Text style={styles.description}>
                        - importance of nutrients (expert opinion of the project nutritionist)
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
      </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
    // /alignItems: "center",
      marginTop: '34%',
    },
    modalView: {
        marginTop: 18,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 20,
        paddingBottom: 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalTitle: {
        fontFamily: 'Roboto',
        fontWeight: Weight.Bold,
        fontSize: Typ.Normal
    },
    description: {
        fontFamily: 'Roboto',
        fontWeight: Weight.Normal,
        fontSize: Typ.Small
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: Col.White,
      fontWeight: Weight.Bold,
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  