import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from '../../components/custom/Typography';
import Collapse from '../../components/Collapse';
import EditModal from '../../components/newEditModal';
import {
    Fetching,
    Memo,
  } from "../../components/interfaces";
import { AppContext } from "../../components/AppContext";
import server from '../../server'
import { correctFormat } from '../../utils/date';
import { Col } from '../../components/Config';

const mockData = {
    Salad: [
        {
            id: 1,
            name: 'Greek salad',
            image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/4/23/0/BX0204_greek-salad_s4x3.jpg.rend.hgtvcom.826.620.suffix/1529943050536.jpeg'
        },
        {
            id: 2,
            name: `Caesar salad with parmesan and lemon`,
            image: 'https://www.simplyrecipes.com/thmb/j1WtO-KNzo7D7e3j5skU2CIQGk4=/1800x1200/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2009__09__caesar-salad-horiz-a-1800-4a465eb53456465091e34138675259c2.jpg'
        },
        {
            id: 3,
            name: 'Vegetable salad',
            image: 'https://static.onecms.io/wp-content/uploads/sites/19/2011/04/08/chunky-vegetable-salad-ay-2000.jpg'
        }
    ],
    Meat: [
        {
            id: 1,
            name: 'Fresh meat with sous',
            image: 'https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/125:94/w_2393,h_1800,c_limit/meat-80049790.jpg'
        },
        {
            id: 2,
            name: 'Just Roast meat:)',
            image: 'https://hallmark.brightspotcdn.com/dims4/default/8d68940/2147483647/strip/true/crop/3000x1684+0+0/resize/1140x640!/quality/90/?url=http%3A%2F%2Fhallmark-channel-brightspot.s3.amazonaws.com%2F69%2F94%2F04ce790dbdf55d6eb5cd689e2fa6%2Fhome-family-everyday-roast-beef.jpg'
        },
    ]
}

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

      const addMenuItem = async (id: number, {servings, creationTime}: object) => {
        setModalData({
            ...modalData,
            modalVisible: false
        })
       const result = await server.addRestaurantsMeal({quantity: servings, date: creationTime, meal: {...modalData.meal, title: modalData.meal.name, is_partner: route.params.is_partner}});
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
            modalVisible: true
        });
      }

      const previewPage = (item) => {
        navigation.navigate("previewPage", {
            title: item.name,
            details: { ...item, instructions: item.description, page: 'restaurants', nutrients: item.nutrition.nutrients, from: 'restaurantMenu' },
            item: {meal: {...item, title: item.name, is_partner: route.params.is_partner}, quantity: 1, date: correctFormat()}
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
                        <Collapse title={elm} icon_type={false} isPrecent={false} data={route.params.menu[elm]} cb={(data) => modalAction(data)} routeToCb={previewPage}/>
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