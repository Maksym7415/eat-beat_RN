import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from '../../components/custom/Typography';
import Collapse from '../../components/Collapse';
import EditModal from '../../components/EditModal';
import {
    Fetching,
    Memo,
  } from "../../components/interfaces";
import { AppContext } from "../../components/AppContext";
import server from '../../server'
import { correctFormat } from '../../utils/date';
import { Col } from '../../components/Config';
import AppBackend from '../../components/BackendSwitcher/store';


interface ModalData {
    id: number;
    name: string;
    servings: number;
    modalVisible: boolean;
    creationTime: number;
    data: object;
  }

function RestaurantMenu({ navigation, route }) {
    const { calendar, isFetching } = useContext<Memo>(AppContext);
    const [fetching, setFetching] = useState<Fetching>({
      clicked: false,
      deactivate: false,
    });
    const { date } = calendar;
    const [modalData, setModalData] = useState<ModalData>({
        id: 0,
        name: "",
        servings: 1,
        modalVisible: false,
        creationTime: new Date(date).getTime(),
      });
    const backendAppUrl = AppBackend.getBaseUrl();
    const thirdPartyUrl = AppBackend.getBasethirdPartyUrl()

      const addMenuItem = async (id: number, {servings, creationTime}: object) => {
        setModalData({
            ...modalData,
            modalVisible: false
        })
       const result = await server.addRestaurantsMeal({quantity: servings, date: creationTime, meal: {...modalData.meal, title: modalData.meal.name, is_partner: route.params.isPartner}});
        if(result.ok) {
            navigation.navigate("meals");
        }
      }

      const modalAction = (data: object) => {
        setModalData({
            ...modalData,
            id: data.id,
            name: data.name,
            meal: data,
            modalVisible: true,
            creationTime: new Date().getTime(),
        });
      }

      const previewPage = (item) => {
        navigation.navigate("previewRestaurantScreen", {
            title: item.name,
            details: { ...item, instructions: item.description, page: 'restaurants', nutrients: item.nutrition.nutrients, from: 'restaurantMenu' },
            item: {meal: {...item, nutrients: item.nutrition.nutrients, title: item.name, restName: route.params.restName, is_partner: route.params.isPartner}, quantity: 1, date: correctFormat()}
          });
      }

    return (
        <View style={styles.container}>
            <EditModal
                clicked={fetching.clicked}
                data={modalData}
                date={date}
                setData={(id, body) => addMenuItem(id, body)}
                hideModal={() => {
                if (fetching.clicked) return;
                setModalData({ ...modalData, modalVisible: false });
                }}
                bg={Col.Restaurants}
            />
            <View style={styles.collapseContainer}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, }}
                    showsVerticalScrollIndicator={false}
                >
                    {route.params.menu && Object.keys(route.params.menu).map((elm , key) => 
                    <View key={key} style={styles.collapseWrapper}>
                        <Collapse 
                            title={elm} 
                            icon_type={false} 
                            isPrecent={false} 
                            requestData={route.params.menu[elm]}
                            data={route.params.menu[elm].map((el) => el.image === 'default_dish_image.png' ? {...el, image: backendAppUrl + el.image} : {...el, image: thirdPartyUrl + el.image })} 
                            cb={(data) => modalAction(data)} routeToCb={previewPage}
                        />
                    </View>)}
                </ScrollView>
            </View>
        </View>
    )
}

export default RestaurantMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    collapseContainer: {
        paddingHorizontal: 16,
    },
    collapseWrapper: {
        // marginTop: 12,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
    }
})