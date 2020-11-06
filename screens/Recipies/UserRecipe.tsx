import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Col, Typ } from '../../components/Config';
import Button from '../../components/custom/ConfirmationButton';

export default function UserRecipes({ navigation }) {



    return (
        <View>
            <Button 
                title={'NEW RECIPE'} 
                onClickHandler={() => navigation.navigate('new')} 
                bckColor={Col.Green1} 
                textColor={Col.White} 
                fts={Typ.Small}
                ftw={'500'}
            />
        </View>
    )
}