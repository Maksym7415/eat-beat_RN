import React, { FC } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { NavProps, RecipeIngredient, StockType } from '../../components/interfaces';
import server from '../../server';
import Scanner from '../../components/Scanner';
import { Col } from '../../components/Config';

const ScannerScreen: FC<NavProps> = ({ navigation }) => {

  const onSearch = async (code: string): Promise<RecipeIngredient> => {
    return await server.searchByBarcode({ code })
  }

  const onAdd = async (ingredient: RecipeIngredient): Promise<void> => {
    await server.addToStocks(StockType.fridge, [ingredient])
    navigation.navigate('myFridge')
  }

  const onExit = () => {
    navigation.navigate('myFridge')
  }

  if (!useIsFocused()) return null
  return (
    <Scanner
      addLabel={'ADD TO FRIDGE'}
      color={Col.Stocks}
      onAdd={onAdd}
      onExit={onExit}
      onSearch={onSearch}
    />
  )
}

export default ScannerScreen
