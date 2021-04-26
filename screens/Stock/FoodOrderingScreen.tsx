import React, { FC, useContext, useState, useEffect, ReactText } from 'react';
import { View, FlatList, Picker, TouchableOpacity, Alert } from 'react-native';
import { AppContext } from "../../components/AppContext";
import {
  IngredientProducts,
  Memo,
  NavProps,
  OrderProductsRequestParams,
  Product,
  Shop
} from '../../components/interfaces';
import server from '../../server';
import roundNumber from '../../utils/roundNumber';
import IngredientItem from '../../components/IngredientItem';
import Text from "../../components/custom/Typography";
import { styles } from './FoodOrderingScreen.styles';
import Loader from '../../components/Loader';
import ModalCommon from '../../components/ModalCommon';
import AddSub from '../../components/AddSub';
import { IconMaker } from '../../components/SvgMaker';
import { Button } from '../../components/MyComponents';
import { Col } from '../../components/Config';

const FoodOrderingScreen: FC<NavProps> = ({ navigation }) => {
  const { ingredientsOrderList } = useContext<Memo>(AppContext)
  const [ingredientProducts, setIngredientProducts] = useState<IngredientProducts[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [availableShops, setAvailableShops] = useState<Shop[]>([])
  const [selectedShop, setSelectedShop] = useState<number>(0)
  const [editProduct, setEditProduct] = useState<IngredientProducts>(null)

  useEffect(() => {
    if (selectedShop) {
      setLoading(true)
      server.matchProducts({shop_id: selectedShop, ingredients: ingredientsOrderList}).
        then((response) => {
          response.forEach(ingredient => {
            ingredient.products = ingredient.products.map(p => {
              return {
                ...p,
                amount: 1
              }
            })
          })
          setIngredientProducts(response)
          setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
    }
  }, [selectedShop])

  useEffect(() => {
    setLoading(true)
    server.getShops().then((shops) => {
      setAvailableShops(shops)
      if (shops.length) {
        setSelectedShop(shops[0].shop_id)
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  const onPressOrder = async () => {
    setLoading(true)
    const products: Product[] = []
    ingredientProducts.map(ingredient => {
      if (ingredient.selectedProduct) {
        const product = ingredient.products.find(p => p.id === ingredient.selectedProduct)
        if (product) {
          products.push({...product})
        }
      }
    })
    const params: OrderProductsRequestParams = {
      shop_id: selectedShop,
      products
    }
    if (await server.orderProducts(params)) {
      setLoading(false)
      Alert.alert('Good news!', 'Your order successfully submitted.')
      navigation.goBack()
    } else {
      Alert.alert('Oops...', 'Something went wrong')
    }
    setLoading(false)
  }

  const onChangeAmount = (ingredientId: number, productId: number, amount: number) => {
    const items = [...ingredientProducts]
    items.forEach(ingredient => {
      if (ingredient.ingredient_id === ingredientId) {
        ingredient.products = ingredient.products.map(p => {
          const updated = {...p}
          if (p.id === productId) {
            updated.amount = amount
          }
          return updated
        })
      }
    })
    setIngredientProducts(items)
  }

  const onPressAmount = (ingredientId: number, productId: number) => {
    let toEdit = null
    ingredientProducts.forEach(ingredient => {
      if (ingredient.ingredient_id === ingredientId) {
        toEdit = {...ingredient}
        toEdit.products = [ingredient.products.find(p => p.id === productId)]
      }
    })
    if (!!toEdit) {
      setEditProduct(toEdit)
    }
  }

  const onSelectProduct = (ingredientId: number, productId: number) => {
    const items = [...ingredientProducts].map(ingredient => {
      if (ingredient.ingredient_id === ingredientId) {
        return {...ingredient, selectedProduct: productId}
      } else {
        return {...ingredient}
      }
    })
    setIngredientProducts(items)
  }

  const getTotalPrice = (): [string, string] => {
    let price = 0
    let currency = '€'
    if (ingredientProducts.length) {
      ingredientProducts.forEach(ingredient => {
        if (ingredient.selectedProduct) {
          ingredient.products.forEach(p => {
            if (p.id === ingredient.selectedProduct) {
              if (p.currency) {
                currency = p.currency
              }
              price += (p.price * p.amount)
            }
          })
        }
      })
    }
    return [price ? roundNumber(price) : null, currency]
  }
  const [total, currency] = getTotalPrice()

  return (
    <View style={styles.container}>
      <View style={[styles.selectShopHolder, styles.picker]}>
        <Picker
          enabled={availableShops.length > 0}
          selectedValue={selectedShop}
          onValueChange={shopId => setSelectedShop(shopId)}
        >
          <Picker.Item key={`shop_not_selected`} label={'Please select preferred shop'} value={0} />
          {availableShops.map((shop, i) =>
            <Picker.Item key={`available_shop_${i}`} label={shop.shop_title} value={shop.shop_id} />)}
        </Picker>
      </View>
      <View style={styles.description}>
        <Text type={'body'} style={styles.descriptionText}>You plan to order the following items</Text>
      </View>
      <FlatList
        style={[{flexGrow: 0}, styles.list]}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => '' + item.id}
        data={ingredientsOrderList}
        renderItem={(item) => {
          const found = ingredientProducts.find(ip => ip.ingredient_id === item.item.id)
          const selectedProductId = found && found.selectedProduct || 0
          const selectedProduct = selectedProductId ?
            found.products.find(p => p.id === selectedProductId) : null
          return (
            <React.Fragment>
              <IngredientItem
                key={`ingredient_${item.index}`}
                amount={'' + roundNumber(item.item.amount)}
                unit={item.item.unit}
                name={item.item.name}
              />
              {!loading && !!selectedShop && !!found && found.products.length === 0 && (
                <View style={styles.productItemHolder}>
                  <Text type={'cap'} style={styles.notFoundText}>Products not found</Text>
                </View>
              )}
              {!loading && !!selectedShop && !!found && found.products.length > 0 && (
                <View style={styles.productItemHolder}>
                  <Picker
                    key={`picker_${item.item.id}`}
                    style={{width: '85%'}}
                    selectedValue={selectedProductId}
                    onValueChange={(id) => onSelectProduct(item.item.id, id)}
                  >
                    <Picker.Item value={0} label={'Select product'} key={`select_${item.item.id}_product`}/>
                    {found.products.map(p => {
                      let label = p.price + ' ' + (p.currency ? p.currency : '€') + ', '
                      if (p.quantity) {
                        label += p.quantity
                      }
                      if (p.units) {
                        label += p.units +  ', '
                      }
                      label += p.name
                      return (
                          <Picker.Item
                            key={`product_${p.id}`}
                            value={p.id}
                            label={label}
                          />
                      )
                    })}
                  </Picker>
                  {!!selectedProductId && (
                    <TouchableOpacity style={styles.productAmount} onPress={() => onPressAmount(item.item.id, selectedProductId)}>
                      <Text type={'bodyBold'}>{selectedProduct.amount}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </React.Fragment>
          )
        }}
      />
      {!!total && (
        <View style={styles.total}><Text type={'bodyBold'}>{`${total} ${currency} total`}</Text></View>
      )}
      {!!total && (
        <View style={styles.buttonsHolder}>
          <Button
            label={'PLACE ORDER'}
            isShow={true}
            style={{backgroundColor: Col.Stocks}}
            onPress={onPressOrder}
          />
        </View>
      )}
      {!!editProduct && (
        <ModalCommon visible={!!editProduct}>
          <AddSub
            title={editProduct.products[0].name}
            defaultValue={editProduct.products[0].amount}
            minValue={1}
            maxValue={999}
            onDone={(amount) => {
              const item = {...editProduct}
              setEditProduct(null)
              onChangeAmount(item.ingredient_id, item.products[0].id, amount)}
            }
            onCancel={() => setEditProduct(null)}
          />
        </ModalCommon>
      )}
      {loading && <Loader />}
    </View>
  );
}

export default FoodOrderingScreen
