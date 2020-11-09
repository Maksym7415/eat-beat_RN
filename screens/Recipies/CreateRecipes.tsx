import * as ImagePicker from "expo-image-picker";
import React, { useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Col, Spacing, Typ } from '../../components/Config';
import Button from '../../components/custom/ConfirmationButton';
import { MaterialCommunityIcons as Icon, } from "@expo/vector-icons";
import { Divider } from "../../components/MyComponents";
import Ingradients from "./Components/Ingradients";
import EditField from "./Components/EditField";
import IngradientRow from "./Components/IngradientRow";

interface Props {
    navigation: any
}

interface Edit {
    editTitle?: boolean
    editIngradients?: boolean
    editInstruction?: boolean
}

interface Ingradients {
    [key: string]: string
}

interface RecipeData {
    title?: string,
    Instruction?: string
}


export default function NewRecipe({ navigation }: Props) {

    const [textFieldsArray, setTextFieldsArray] = useState<Array<object>>([{
        id: 0,
        unitId: 20,
        title: '',
        unitTitle: '',
        isTextShow: false,
        servings: 0 
    }])
    const [selected, setSelected] = useState<Options>({title: 'Choose', value: 0})
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [initialState, setInitialState] = useState<RecipeData>({})
    const [text, setText] = useState<RecipeData>({})
    const [ingradients, setIngradients] =useState<Ingradients>({})
    const [image, setImage] = useState<null>(null)
    const [editMode, setEditMode] = useState<Edit>({
        "editIngradients": false,
        "editInstruction": false,
        "editTitle": false,
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

    const editModeHandler = (name: string, state: boolean) => {
        setEditMode((mode) => ({...mode, [name]: state}))
        
    }

    const onChangeHandler = (text: string, name: string) => {
        setText((value: RecipeData) => ({...value, [name]: text}))
    }

    const addNewField = (name: string, state: boolean) => {
        setTextFieldsArray([...textFieldsArray, {id: textFieldsArray.length, title: '', isTextShow: false, servings: 0}])
    }

    const onChangeIngradientsHandler = (text: string, idField: number, isUnit: boolean) => {
        if(isUnit) {
            console.log(textFieldsArray)
            return setTextFieldsArray(textFieldsArray.map(el => el.unitId === idField ? {...el, unitTitle: text} : el ))
        }
        setTextFieldsArray(textFieldsArray.map(el => el.id === idField ? {...el, title: text} : el ))
    }

    const onBlurIngradientsHandler = (idField: number) => { 
        setTextFieldsArray(textFieldsArray.map(el => el.id === idField ? {...el, isTextShow: true} : el  ))
    }

    return(
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
                
                <EditField 
                    title={'Add recipe title'} 
                    editName={'editTitle'} 
                    type={'editContainer'}
                    editHandler={editModeHandler}
                    editState={editMode}
                    onChangeHandler={onChangeHandler}
                    text={text}
                    setText={setText}
                />
                </View>
                <Ingradients
                    addNewField={addNewField} 
                    textFieldsArray={textFieldsArray}
                    onChangeIngradientsHandler={onChangeIngradientsHandler} 
                    onBlurIngradientsHandler={onBlurIngradientsHandler}
                    setTextFieldsArray={setTextFieldsArray}
                    isEnabled={isEnabled}
                    selected={selected}
                    setSelected={setSelected}
                />
                {/* <EditField 
                    title={'Instructions'} 
                    editName={'editInstruction'} 
                    type={'editContainer1'}
                    editHandler={editModeHandler}
                    editState={editMode}
                    onChangeHandler={onChangeHandler}
                    text={text}
                    setText={setText}
                /> */}
               { [
                    { id: 0, uri: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg', servings: 2, title: 'slice', name: 'bred', unit: '(160 g)'},
                    { id: 1, uri: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg', servings: 4, title: 'small', name: 'apple', unit: '(40 g)'}
                    
                ].map(el => <IngradientRow {...el}/> )}
                    
                <Button 
                    title={'SAVE CHANGES'} 
                    onClickHandler={() => console.log(textFieldsArray)} 
                    bckColor={Col.Green1} 
                    textColor={Col.White} 
                    fts={Typ.Small}
                    ftw={'500'}
                />
                <Button 
                    title={'Cancel'} 
                    onClickHandler={() => console.log(navigation)} 
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
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    editContainer1: {
        minHeight: 109,
        display: 'flex',
        flexDirection: 'row',
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