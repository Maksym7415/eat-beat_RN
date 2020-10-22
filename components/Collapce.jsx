import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Divider from './Divider'
import { Col, Typ, Weight  } from './Config'
import { AntDesign } from '@expo/vector-icons'

const alertMessages = [
    {
      title: 'Total Fat',
      precent: '135%'
    },
    {
      title: 'Cholesterol',
      precent: '141%'
    },
    {
      title: 'Sodium',
      precent: '179%'
    }
  ]

export default function Collapce({ title, titleStyle, icon_type }) {
    const [arrow, setArrow] = useState(false)
    
    const getIconUri = (icon) => {
        switch(icon) {
            case 'alert': 
                return <Image  source={require('../assets/alert_icon.png')}/>
            case 'info': 
                return <Image  source={require('../assets/info_icon.png')}/>
        }
    }

    return (
        <View style={styles.container}>
            {/* <AntDesign name='warning' color='red' size={24} /> */}
        <View style={styles.collapceClosed}>
          <View style={styles.icon}>
            {getIconUri(icon_type)}
          </View>
          <Text style={styles[titleStyle]}>
            {title}
          </Text>
          <TouchableOpacity onPress={() => setArrow(!arrow)}>
            <Image  source= {!arrow ? require('../assets/arrowDown.png') : require('../assets/arrowUp.png')} />
          </TouchableOpacity>
        </View>
        <View>
         {arrow && <>
            <Divider
              {...styles.collapseDivider}
            />
             <View style={styles.collapceOpen}>
              {alertMessages.map((item) => 
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.collapceText}>
                  {item.title}
                </Text>
                <Divider
                  {...styles.verticalDivider}
                />
                <Text style={styles.collapceText}>
                  {item.precent}
                </Text>
              </View>
            )}
          </View>
          </>}
        </View>
       
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8, 
        backgroundColor: Col.White, 
        marginHorizontal: 10, 
        paddingHorizontal: 3,
        flexDirection: 'column',
        marginBottom: 8
    },
    collapceClosed: {
        alignItems: 'center', 
        marginHorizontal: 5, 
        flexDirection: 'row', 
        alignContent: 'center', 
        marginVertical: 15
    },
    collapceOpen: {
        marginHorizontal: 5, 
        marginBottom: 5
    },  
    icon: {
        marginLeft: 5,
        width: '7%'
    },
    error_text: {
        width: '85%',
        color: Col.Error
    },
    info_text: {
        width: '85%',
        color: Col.Info
    },
    collapseDivider: {
        borderBottomColor:Col.Grey3,
        borderBottomWidth: 0.5,
        marginVertical: 7
    },
    verticalDivider: {
        borderLeftWidth: 0.5,
        borderLeftColor:Col.Grey3,
        marginRight: 15
    },
    collapceText: {
        width: '50%',
        marginBottom: 6,
        fontFamily: 'Roboto',
        fontWeight: Weight.Normal,
        fontSize: Typ.Tiny,
        color: Col.Grey
    }
  });