
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { AppContext } from '../../components/AppContext';
import { Col, Spacing, Typ } from '../../components/Config';
import Button from '../../components/custom/ConfirmationButton';
import { Divider } from '../../components/MyComponents';
import server from '../../server';
import IngradientRow from './Components/IngradientRow';

export default function InstructionScreen({ navigation }) {

    const { recipeId, editMode, toggleEdit } = useContext(AppContext);
    const [feed, setFeed] = useState<object>({})
    const [value, setValue] = useState<string>('')

    const getRecipeInfo = useCallback(async () => {
        const { data } = await server.getRecipeInfo(recipeId);
        setFeed({
            title: data.title, 
            instruction: data.instruction, 
            mainNutrients: data.nutrition.nutrients.filter(el => el.title === 'Calories' || el.title === 'Protein' || el.title === 'Fat' || el.title === 'Carbs'),
            nutrients: data.nutrition.nutrients,
            servings: data.servings,
            ingredients: data.nutrition.ingredients
        })
    }, [recipeId])

    useEffect(() => {
        getRecipeInfo();
        let focus = navigation.addListener("focus", () => {
            toggleEdit(false)
        });
        () => {
          focus = null;
        };
    }, [])

    useEffect(() => {
        feed.instruction && setValue(feed.instruction)
    }, [feed])

    const changeHandler = (text) => {
        setValue(text)
    }

    const saveChanges = async () => {
        await server.updateRecipe(recipeId, {instruction: value});
        getRecipeInfo()
        toggleEdit(false)
    }

    return (
        <ScrollView>
            <View style={styles.ingradientContainer}>
            {!editMode ? 
            <View style={styles.InstructionContainer}>
                <Text style={styles.ingradientTitle}>
                    Instruction
                </Text>
                <Text>
                    {feed.instruction || 'You have not added any instruction for your recipe yet'}
                </Text>
            </View> :
            <View>
            <View>
                 <TextInput multiline value={value} onChangeText={changeHandler}/>
                 <Divider styler={styles.divider}/>
            </View>
            <View>
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
                 onClickHandler={() => toggleEdit(!editMode)} 
                 bckColor={''} 
                 textColor={'#7A7A7A'} 
                 fts={Typ.Small}
                 ftw={'500'}
             />
         </View>
            </View>
            }
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    ingradientContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    ingradientTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    ingradientTextField: {
        paddingHorizontal: 16,
        paddingTop: 22,
    },
    divider: {
        borderBottomWidth: 1,
        marginVertical: Spacing.small,
        borderBottomColor: 'rgba(0, 0, 0, 0.6)',

      },
    btnConatiner: {
        paddingHorizontal: 16
    },
    InstructionContainer: {
        
    }
})