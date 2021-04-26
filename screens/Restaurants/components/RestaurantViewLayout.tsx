import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/custom/Typography';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import SvgMaker from '../../../components/SvgMaker';
import { Col } from '../../../components/Config';
import { Button } from "../../../components/MyComponents";
import server from '../../../server';

interface Props {
    id: number
    title: string
    address: string
    description: string
    is_partner: boolean
    setOpen: Function
    navigation: object
}


function RestaurantViewLayout({ id, title, address, description, isPartner, setOpen, navigation, distance } : Props) {
    const menuHandler = (title: string) => {
        async function getMenu(restId: number) {
            const result = await server.getRestaurantMenu(restId);
            const correctFormat = {}
            result.data.forEach((el) => correctFormat[el.category] = [...(correctFormat[el.category] || []),  el]);
            if(result.ok) {
                setOpen(false);
                navigation.navigate('restaurantMenu', {title, isPartner, menu: correctFormat, restName: title});
            }
        }
        getMenu(id)
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerWrapper}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => setOpen(false)}>
                        <Icon name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                {isPartner && <SvgMaker name='partnerStar' />}
                    <Text type='bodyBold' style={{paddingLeft: isPartner ? 10 : 0}}>
                        {title}
                    </Text>
                </View>
                <View style={styles.addressContainer}>
                    <Text>
                        {address}
                    </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text>
                        {description}
                    </Text>
                </View>
                {/* <View style={styles.distanceContainer}>
                    <Text>
                        {distance}
                    </Text>
                </View> */}
                <View>
                    <Button
                        label="OPEN MENU"
                        onPress={() => menuHandler(title)}
                        style={styles[`btnStyle${Number(isPartner)}`]}
                    />
                </View>
            </View>
        </View>
    )    
}

export default RestaurantViewLayout;


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#fff',
        bottom: 0,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8
    },
    containerWrapper: {
        width: '100%',
       paddingHorizontal: 16,
       paddingVertical: 16
    },
    iconContainer: {
        width: '100%',
        alignItems: 'flex-end',

    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
    },
    addressContainer: {
        paddingBottom: 10,
    },
    descriptionContainer: {
        paddingBottom: 10,
    },
    distanceContainer: {
        paddingBottom: 30,
    },
    btnStyle1: {
        backgroundColor: Col.Main
    },
    btnStyle0: {
        backgroundColor: Col.Restaurants
    }
});