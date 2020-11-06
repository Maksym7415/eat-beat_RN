import React, { useState, useEffect } from 'react';
import * as ImagePicker from "expo-image-picker";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons as Icon, } from "@expo/vector-icons";
import { Col, Spacing } from '../../components/Config';
import { Divider } from '../../components/MyComponents';
import server from '../../server';

interface Item {
    title: string
    max: number
    value: string
    error: string
}

interface Data {
    [key: string]: Item
}

export default function RecipeInfoScreen({ route }) {

    const edit = false;

    const [image, setImage] = useState<null>(null);
    const [data, setData] = useState<Data>({
        title: {
            title: 'title',
            max: 64,
            value: '',
            error: ''
        },

    })

    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri)
            console.log(result.uri)
        }
      };
    
    const onCnangeHandler = (text: string, name: string) => {
        setData((state) => ({...state, [name]: {...state[name], value: text, error: text.length > state[name].max ? `Title length can not be more than ${state[name].max} symbols` : '' }}))
    }

    useEffect(() => {
        console.log(props, 'fgdfdfgdfgdfkjgdfgdfgkjfgdgkdfkjei64')
        const getRecipeInfo = async () => {
            //const responce = await server.getRecipeInfo(route.params);
        }   
        getRecipeInfo();
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <View style={styles.imageContainer}>
                        <View style={{position: 'absolute', left: '40%', top: '35%', zIndex: 10, opacity: 0.5}}>
                            <TouchableOpacity
                                onPress={pickAvatar}
                            >
                                <Icon
                                    name={'camera-plus'}
                                    color={Col.Grey1}
                                    size={58}
                                />
                            
                            </TouchableOpacity>
                        </View>  
                        {image && <Image source={{ uri: image }} style={styles.image}/>}
                    </View>
                    <Divider styler={styles.divider}/>
                    <View style={{ paddingHorizontal: 16 }}>
                        <Text style={{ marginBottom: 10 }}>
                            Title*
                        </Text>
                    {!edit ? <Text>...</Text>
                        : <View>
                            <TextInput
                                value={data.title.value}
                                onChangeText={(text) => onCnangeHandler(text, 'title')}
                                placeholder={'Add recipe title'}
                                style={{borderColor: data.title.error ? '#FF364F' : Col.Grey2, borderBottomWidth: 1}}
                            />
                                { data.title.error ? <Text style={{color: '#FF364F', marginTop: 10}}>{ data.title.error}  </Text> : null}
                        </View>    }  
                    </View>
                </View>
            </View>
        </ScrollView>
    )
} 


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    border: {
        borderColor: Col.Grey2,
        borderWidth: 1
    },
    titleContainer: {
        backgroundColor: Col.White,
        paddingBottom: 23,
        borderRadius: 8,
        marginBottom: 12
    },
    divider: {
        borderBottomWidth: 1,
        marginVertical: Spacing.small,
        borderBottomColor: Col.Divider,
      },
    imageContainer: {
        height: 194,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
    },
    image: {
        width: '100%', 
        height: '100%',
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
    },
    editContainer: {
        minHeight: 109,
        backgroundColor: Col.White,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12
    },
})