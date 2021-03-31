import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import server from '../../server';
import roundNumber from '../../utils/roundNumber';
import { AppContext } from '../../components/AppContext';
import { Col } from '../../components/Config';
import { Memo, NavProps, RecipeIngredient, StockType } from '../../components/interfaces';
import { styles } from './ShoppingListScreen.styles';

import IngredientItem, { ActionsRow } from '../../components/IngredientItem';
import { IconMaker } from '../../components/SvgMaker';
import { Button } from '../../components/MyComponents';
import ModalCommon from '../../components/ModalCommon'
import SearchIngredients from '../../components/SearchIngredients';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import Loader from '../../components/Loader';
import { useIsFocused } from '@react-navigation/native';
import Text from '../../components/custom/Typography';

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
  const [data, setData] = useState<IngredientItemData[]>([])
  const [checkedIds, setCheckedIds] = useState<CheckedMap>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false)
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
  const [editableIngredient, setEditableIngredient] = useState<RecipeIngredient>(null)
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)

  const fetchIngredients = async (): Promise<void> => {
    const updated = await server.getStocks({type: StockType.shoppingList})
    setData(updated)
    setCheckedIds({})
    setSelectAllChecked(false)
  }

  const onPressCheckbox = (id: number): void => {
    const map = { ...checkedIds }
    if (map[id]) {
      delete map[id]
    } else {
      map[id] = true
    }
    setCheckedIds(map)
  }

  const onPressEdit = (id: number) => {
    const ingredient = data.find(ing => ing.id === id)
    if (ingredient) {
      setEditableIngredient({...ingredient, possibleUnits: [ingredient.unit]})
      setEditModalVisible(true)
    }
  }

  const onPressDelete = () => {
    setDeleteModalVisible(true)
  }

  const onPressSelectAll = () => {
    const map: CheckedMap = {}
    if (!selectAllChecked) {
      data.forEach((item) => {
        map[item.id] = true
      })
    }
    setSelectAllChecked(!selectAllChecked)
    setCheckedIds(map)
  }

  const onPressOrder = useCallback(() => {
    const ids = Object.keys(checkedIds)
    const toOrder: RecipeIngredient[] = []
    data.forEach((ingredient) => {
      if (ids.indexOf(String(ingredient.id)) !== -1) {
        toOrder.push(ingredient)
      }
    })
    if (toOrder.length) {
      setCheckedIds({})
      setSelectAllChecked(false)
      setIngredientsOrderList(toOrder)
      navigation.push('foodOrdering')
    }
  }, [checkedIds])

  const onPressAdd = useCallback(() => {
    setSearchModalVisible(true)
  }, [])

  const onAddIngredient = useCallback(async (ingredient: RecipeIngredient) => {
    setSearchModalVisible(false)
    setLoading(true)
    const success = await server.addToStocks(StockType.shoppingList, [ingredient])
    if (success) {
      await fetchIngredients()
    }
    setLoading(false)
  }, [])

  const onUpdateIngredient = useCallback(async (ingredient: RecipeIngredient) => {
    setEditModalVisible(false)
    setLoading(true)
    const success = await server.updateInStocks(
      ingredient.id,
      {type: StockType.shoppingList, amount: ingredient.amount}
    )
    if (success) {
      await fetchIngredients()
    }
    setEditableIngredient(null)
    setLoading(false)
  }, [])

  const onDeleteIngredients = useCallback(async () => {
    setDeleteModalVisible(false)
    setLoading(true)
    const success = await server.removeFromStocks({
      type: StockType.shoppingList,
      ingredients: Object.keys(checkedIds).map(id => parseInt(id))
    })
    if (success) {
      await fetchIngredients()
    }
    setLoading(false)
  }, [checkedIds])

  const onScreenFocus = useIsFocused();
  useEffect(() => {
    if (onScreenFocus) {
      setLoading(true)
      server.getStocks({type: StockType.shoppingList}).then((ingredients) => {
        setData(ingredients)
      }).finally(() => {
        setLoading(false)
      })
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
              amount={'' + roundNumber(item.item.amount)}
              unit={item.item.unit}
              name={item.item.name}
              onPressEdit={() => onPressEdit(item.item.id)}
            />
          )
        }}
      />
      {data.length > 0 &&
        <ActionsRow
          amount={Object.keys(checkedIds).length}
          checkbox={{checked: selectAllChecked, onPress: onPressSelectAll, bgColor: Col.Stocks}}
          onPressDeleteSelected={onPressDelete}
        />
      }
      {data.length === 0 &&
        <View style={styles.emptyHolder}>
          <Text type={'body'}>Shopping list is empty</Text>
        </View>
      }
      <View style={styles.buttonsHolder}>
        {Object.keys(checkedIds).length > 0 && (
          <Button
            label={'ORDER SELECTED ITEMS'}
            isShow={true}
            style={{backgroundColor: Col.Stocks}}
            onPress={onPressOrder}
          />
        )}
      </View>
      <View style={styles.addButtonHolder}>
        <TouchableOpacity onPress={onPressAdd} activeOpacity={0.7}>
          <IconMaker name={'addRounded'} fill={'#fff'}/>
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
    </View>
  );
}

export default ShoppingListScreen
