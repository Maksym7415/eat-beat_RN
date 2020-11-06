import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon, } from "@expo/vector-icons";
import { Col } from '../../../components/Config';

interface Props {
    servings: number
    id: number
    setValue: () => void
}

export default function Servings({ servings, id, setValue }: Props) {
    return (
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {console.log(servings)}
            <TouchableOpacity style={{borderWidth: 1, borderRadius: 8, borderColor: servings ? Col.Green : Col.Grey3}} onPress={() => {
                if(servings === 0) return;
                return setValue((state) => state.map((el) => el.id === id ? {...el, servings: el.servings - 1} : el))
            }} >
            <Icon
                    style={{ color: servings ? Col.Green : Col.Grey3 }}
                    name="minus"
                    size={24}
                  />
            </TouchableOpacity>
            <View style={{paddingHorizontal: 12, backgroundColor: '#F7F7FB', paddingVertical: 5, borderRadius: 4, marginHorizontal: 2}}>
                <Text style={{color: '#666666', fontSize: 16, fontWeight: '500'}}>
                {servings}
                </Text>
            </View>
            <TouchableOpacity style={{borderWidth: 1, borderRadius: 8, borderColor: Col.Green}} onPress={() => setValue((state) => state.map((el) => el.id === id ? {...el, servings: el.servings + 1} : el))} >
                <Icon
                    style={{ color: Col.Green }}
                    name="plus"
                    size={24}
                />
            </TouchableOpacity>
        </View>
    )
}