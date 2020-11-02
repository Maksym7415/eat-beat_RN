import React from 'react';

import { View, Text, TextInput } from 'react-native';
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Col } from './Config';


export default function Header({ onChangeHandler, searchHandler, value, hideModal, showInput, name }: any) {
    return (
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Col.Green1, paddingVertical: 10, paddingTop: 30}}>
            <Icon
              style={{marginLeft: 16}}
              onPress={hideModal}
              name={'arrow-back'}
              color={Col.White}
              size={24}
            />
            
            {showInput === false ? <Text style={{width: '80%', color: Col.White, alignSelf: 'center', fontSize: 20}}>{name}</Text> : <>
            <TextInput 
                style={{width: '60%', color: Col.White, borderBottomColor: Col.White, borderBottomWidth: 1}} 
                placeholder='Search'
                placeholderTextColor={Col.White} 
                selectionColor={Col.White} 
                underlineColorAndroid={Col.White}
                onChangeText={onChangeHandler}
                value={value}
                autoFocus
            />
            <Icon
              style={{marginRight: 16}}
              onPress={searchHandler}
              name={'search'}
              color={Col.White}
              size={24}
            />
            </>}
        </View>
    );

}