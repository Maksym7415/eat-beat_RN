import React, { FC, useContext } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { AppContext } from '../../components/AppContext';
import server from '../../server';
import Scanner from '../../components/Scanner';
import { Col } from '../../components/Config';
import { Memo, NavProps, RecipeIngredient } from '../../components/interfaces';
import moment from 'moment'

const SnacksScannerScreen: FC<NavProps> = ({ navigation }) => {

  const { calendar } = useContext<Memo>(AppContext)

  const onSearch = async (code: string): Promise<RecipeIngredient> => {
    return await server.snackByBarcode({ code })
  }

  const onAdd = async (ingredient: RecipeIngredient): Promise<void> => {
    await server.addSnacks({
      meal: {...ingredient, id: false, spoonacularId: ingredient.id},
      quantity: 1,
      date: moment(calendar.date).format('YYYY-MM-DD HH:mm')
    });
    navigation.navigate('meals')
  }

  const onExit = () => {
    navigation.navigate('SnacksPopular')
  }

  if (!useIsFocused()) return null
  return (
    <Scanner
      addLabel={'ADD TO MEALS'}
      color={Col.Snacks}
      onAdd={onAdd}
      onExit={onExit}
      onSearch={onSearch}
    />
  )
}

export default SnacksScannerScreen
