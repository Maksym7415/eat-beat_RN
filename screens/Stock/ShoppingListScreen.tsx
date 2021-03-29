import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { AppContext } from "../../components/AppContext";
import { Col } from "../../components/Config";
import { Memo, NavProps, RecipeIngredient } from '../../components/interfaces';
import { styles } from './MyFridgeScreen.styles';

import IngredientItem, { ActionsRow } from '../../components/IngredientItem';
import { IconMaker } from '../../components/SvgMaker';
import { Button } from '../../components/MyComponents';
import ModalCommon from '../../components/ModalCommon'
import SearchIngredients from '../../components/SearchIngredients';
import DeleteConfirmation from '../../components/DeleteConfirmation';

import MOCKED from './mocked.ingredients.json'
import Loader from '../../components/Loader';
import { useIsFocused } from '@react-navigation/native';

interface IngredientItemData extends RecipeIngredient {}
interface CheckedMap {
  [key: number]: boolean
}

const mapData = (data: any[]): IngredientItemData[] => {
  const mapped: IngredientItemData[] = []
  data.forEach((item) => {
    mapped.push({
      id: item.id,
      image: item.image,
      amount: item.amount,
      unit: item.unit,
      name: item.name
    } as IngredientItemData)
  })
  return mapped
}

const ShoppingListScreen: FC<NavProps> = ({ navigation }) => {

  const { setIngredientsOrderList } = useContext<Memo>(AppContext)
  const [data, setData] = useState<IngredientItemData[]>(mapData(MOCKED))
  const [checkedIds, setCheckedIds] = useState<CheckedMap>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false)
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
  const [editableIngredient, setEditableIngredient] = useState<RecipeIngredient>(null)
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)

  const onPressCheckbox = (id: number): void => {
    const map = { ...checkedIds }
    if (map[id]) {
      delete map[id]
    } else {
      map[id] = true
    }
    setCheckedIds(map)
  }

  const onPressEdit = useCallback((id: number) => {
    const ingredient = data.find(ing => ing.id === id)
    if (ingredient) {
      setEditableIngredient(ingredient)
      setEditModalVisible(true)
    }
  }, [])

  const onPressDelete = useCallback(() => {
    setDeleteModalVisible(true)
  }, [checkedIds])

  const onPressSelectAll = useCallback(() => {
    const map: CheckedMap = {}
    if (!selectAllChecked) {
      data.forEach((item) => {
        map[item.id] = true
      })
    }
    setSelectAllChecked(!selectAllChecked)
    setCheckedIds(map)
  }, [selectAllChecked])

  const onPressOrder = useCallback(() => {
    const ids = Object.keys(checkedIds)
    const toOrder: RecipeIngredient[] = []
    data.forEach((ingredient) => {
      if (ids.indexOf(String(ingredient.id)) !== -1) {
        toOrder.push(ingredient)
      }
    })
    if (toOrder.length) {
      console.log('ShoppingListScreen -> setIngredientsOrderList', toOrder)
      setIngredientsOrderList(toOrder)
      navigation.push('foodOrdering')
    }
  }, [checkedIds])

  const onPressAdd = useCallback(() => {
    setSearchModalVisible(true)
  }, [])

  const onAddIngredient = useCallback((ingredient: RecipeIngredient) => {
    // TODO: send "add" request and re-fetch data
    console.log('ShoppingListScreen -> onAddIngredientFromSearch -> ingredient', ingredient)
    setSearchModalVisible(false)
  }, [])

  const onUpdateIngredient = useCallback((ingredient: RecipeIngredient) => {
    // TODO: send "update" request and re-fetch data
    console.log('ShoppingListScreen -> onUpdateIngredient -> ingredient', ingredient)
    setEditModalVisible(false)
    setEditableIngredient(null)
  }, [])

  const onDeleteIngredients = useCallback(() => {
    // TODO: send "delete" request and re-fetch data
    console.log('ShoppingListScreen -> onDeleteIngredients -> ids', Object.keys(checkedIds))
    setDeleteModalVisible(false)
  }, [checkedIds])

  const onScreenFocus = useIsFocused();
  useEffect(() => {
    if (onScreenFocus) {
    }
  }, [onScreenFocus]);

  return (
    <View style={styles.container}>
      {searchModalVisible &&
      <ModalCommon visible={searchModalVisible}>
        <SearchIngredients
          onPressOk={onAddIngredient}
          onPressCancel={() => setSearchModalVisible(false)}
        />
      </ModalCommon>
      }
      {editModalVisible &&
      <ModalCommon visible={editModalVisible}>
        <SearchIngredients
          title={`Update ${editableIngredient.name}`}
          toEdit={editableIngredient}
          onPressOk={onUpdateIngredient}
          onPressCancel={() => setEditModalVisible(false)}
        />
      </ModalCommon>
      }
      {deleteModalVisible &&
      <ModalCommon visible={deleteModalVisible}>
        <DeleteConfirmation
          amount={Object.keys(checkedIds).length}
          onPressConfirm={onDeleteIngredients}
          onPressCancel={() => setDeleteModalVisible(false)}
        />
      </ModalCommon>
      }
      <FlatList
        style={{flexGrow: 0}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => '' + item.id}
        data={data}
        renderItem={(item) => {
          return (
            <IngredientItem
              key={`ingredient_${item.index}`}
              checkbox={{
                checked: !!checkedIds[item.item.id],
                bgColor: Col.Stocks,
                onPress: () => onPressCheckbox(item.item.id)
              }}
              image={`https://spoonacular.com/cdn/ingredients_100x100/${item.item.image}`}
              amount={'' + item.item.amount}
              unit={item.item.unit}
              name={item.item.name}
              onPressEdit={() => onPressEdit(item.item.id)}
            />
          )
        }}
      />
      <ActionsRow
        amount={Object.keys(checkedIds).length}
        checkbox={{checked: selectAllChecked, onPress: onPressSelectAll, bgColor: Col.Stocks}}
        onPressDeleteSelected={onPressDelete}
      />
      <View style={{paddingHorizontal: 16, height: 80, width: '100%'}}>
        {Object.keys(checkedIds).length > 0 && (
          <Button
            label={'ORDER SELECTED ITEMS'}
            isShow={true}
            style={{backgroundColor: Col.Stocks}}
            onPress={onPressOrder}
          />
        )}
      </View>
      <View style={{alignItems:'flex-end'}}>
        <TouchableOpacity onPress={onPressAdd} activeOpacity={0.7}>
          <IconMaker name={'addRounded'} fill={'#fff'}/>
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
    </View>
  );
}

export default ShoppingListScreen
