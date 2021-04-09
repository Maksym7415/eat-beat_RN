import React, { FC } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { NavProps, RecipeIngredient, StockType } from '../../components/interfaces';
import server from '../../server';
import Scanner from '../../components/Scanner';
import { Col } from '../../components/Config';

const SnacksScannerScreen: FC<NavProps> = ({ navigation }) => {

  const onSearch = async (code: string): Promise<RecipeIngredient> => {
    return await server.searchByBarcode({ code })
  }

  const onAdd = async (ingredient: RecipeIngredient): Promise<void> => {
    // TODO: add something to somewhere (TDB)
    // await server.addToStocks(StockType.fridge, [ingredient])
    navigation.navigate('SnacksPopular')
  }

  const onExit = () => {
    navigation.navigate('SnacksPopular')
  }

  if (!useIsFocused()) return null
  return (
    <Scanner
      addLabel={'ADD TO FRIDGE'}
      color={Col.Snacks}
      onAdd={onAdd}
      onExit={onExit}
      onSearch={onSearch}
    />
  )
}

export default SnacksScannerScreen
