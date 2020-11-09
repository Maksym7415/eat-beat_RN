import React, { useContext, useEffect, useState } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppContext } from '../../components/AppContext';
import { Col, Spacing, Typ } from '../../components/Config';
import Button from '../../components/custom/ConfirmationButton';
import RecipeCard from '../../components/custom/RecipeCard';
import server from '../../server';

export default function UserRecipes({ navigation }) {

    const [feed, setFeed] = useState([]);
    const { getRecipeId } = useContext(AppContext);

    const getData = async () => {
        const { data } = await server.getRecipes()
        setFeed(data)
    }

    useEffect(() => {
        
        getData()
    }, [])

    useEffect(() => {
        let focus = navigation.addListener("focus", () => {
            getData();
        });
        () => {
          focus = null;
        };
    }, [])

    const actionHandler = ({id, title}) => {
        getRecipeId(id)
            navigation.navigate('user_recipe', {
                title 
            })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {feed.map((el, index) => (
                    <View key={`${index}`} style={styles.cardContainer}>
                        <RecipeCard title={el.title} actionHandler={actionHandler} id={el.id} image={`http://10.4.30.212:8081/${el.recipe.image}`} recipe={true}/>
                    </View>
                ))}
            </View>
            <Button 
                title={'NEW RECIPE'} 
                onClickHandler={() => navigation.navigate('new')} 
                bckColor={Col.Green1} 
                textColor={Col.White} 
                fts={Typ.Small}
                ftw={'500'}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.r_small,
        flexDirection: "row",
        flexWrap: "wrap",
      },
    cardContainer: {
        width: "50%",
    },
})