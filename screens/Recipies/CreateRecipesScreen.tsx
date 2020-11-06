import React, { useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons as Icon, } from "@expo/vector-icons";
import { Col, Spacing, Typ } from '../../components/Config';
import Button from '../../components/custom/ConfirmationButton';
import { Divider } from '../../components/MyComponents';
import { TextInput } from 'react-native-gesture-handler';
import Ingradients from './Components/Ingradients';
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

export default function CreateRecipeScreen({ navigation }) {

    const [image, setImage] = useState<null>(null);
    const [data, setData] = useState<Data>({
        title: {
            title: 'title',
            max: 64,
            value: '',
            error: ''
        },
        ingredients: {
            title: 'ingredients',
            max: 10000,
            value: '',
            error: ''
        },
        instruction: {
            title: 'instruction',
            max: 10000,
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

    const saveChanges = async () => {
        let formData;
        if(image){
            formData = new FormData();
            const part = image.split('.');
            const fileType = part[part.length-1]
            formData.append('file', {
                uri: image,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
        }
        
        let error = false;
        setData((state) => {
            const obj: Data = {}
            Object.values(state).forEach((item: Item) =>  {
                console.log(item)
                if(!item.value && item.title !== 'instruction' ) {
                    obj[item.title] = {...item, error: 'This field can not be empty'}
                    error = true
                }
                else  obj[item.title] = item
            })
            return obj
        })
        if(error) return;
        try{
            const { data: id } = await server.addRecipe({
                title: data.title.value,
                instruction: data.instruction.value,
                ingredientList: data.ingredients.value
            })
            //await server.addRecipeAvatar();
            navigation.navigate('user_recipe', {
                id,
                title: data.title.value 
            })
        }catch(error){
            console.log(error)
        }
       
    }

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
                    <TextInput
                        value={data.title.value}
                        onChangeText={(text) => onCnangeHandler(text, 'title')}
                        placeholder={'Add recipe title'}
                        style={{borderColor: data.title.error ? '#FF364F' : Col.Grey2, borderBottomWidth: 1}}
                    />
                    { data.title.error ? <Text style={{color: '#FF364F', marginTop: 10}}>{ data.title.error}  </Text> : null}
                </View>
                </View>

                <View style={styles.editContainer}> 
                    <Text style={{marginBottom: 10}}>
                        Ingradients*
                    </Text>
                    <TextInput
                        value={data.ingredients.value}
                        onChangeText={(text) => onCnangeHandler(text, 'ingredients')}
                        style={{borderColor: data.ingredients.error ? '#FF364F' : Col.Grey2, borderBottomWidth: 1}}
                        placeholder={'One ingredient per line'}
                        multiline
                    />
                    { data.ingredients.error ? <Text style={{color: '#FF364F', marginTop: 10}}>{ data.ingredients.error}  </Text> : null}
                </View>
                <View style={styles.editContainer}> 
                    <Text style={{marginBottom: 10}}>
                        Instruction
                    </Text>
                    <TextInput
                        value={data.instruction.value}
                        onChangeText={(text) => onCnangeHandler(text, 'instruction')}
                        style={{borderColor: Col.Grey2, borderBottomWidth: 1}}
                        placeholder={'Add instruction for recipe'}
                        multiline
                    />
                </View>
                <Button 
                    title={'SAVE'} 
                    onClickHandler={saveChanges} 
                    bckColor={Col.Green1} 
                    textColor={Col.White} 
                    fts={Typ.Small}
                    ftw={'500'}
                />
                <Button 
                    title={'Cancel'} 
                    onClickHandler={() => console.log(2)} 
                    bckColor={''} 
                    textColor={'#7A7A7A'} 
                    fts={Typ.Small}
                    ftw={'500'}
                />
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
    editText: {
        width: '90%',
        fontWeight: '500',
        fontSize: 20
    },
    iconEdit: {
    },
})               
{/* { [
                    { id: 0, uri: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg', servings: 2, title: 'slice', name: 'bred', unit: '(160 g)'},
                    { id: 1, uri: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg', servings: 4, title: 'small', name: 'apple', unit: '(40 g)'}
                    
                ].map(el => <IngradientRow {...el}/> )} */}