import React, { FC, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Col } from './Config';
import BarCodeScanner, { BarCodeProps } from './BarCodeScanner';
import ModalCommon from './ModalCommon';
import { Text } from './custom/Typography';
import { RecipeIngredient } from './interfaces';

const messages = {
  scanning: 'Point your camera at a barcode',
  searching: 'Searching...',
  notFound: 'Product not found',
  foundSomething: 'Found something'
}

interface ScannerProps {
  color: string
  addLabel: string
  onSearch: (code: string) => Promise<RecipeIngredient>
  onAdd: (ingredient: RecipeIngredient) => Promise<void>
  onExit: () => void
}

const Scanner: FC<ScannerProps> = ({ color, addLabel, onSearch, onAdd, onExit }) => {
  const [scanningEnabled, setScanningEnabled] = useState(true)
  const [displayNotFound, setDisplayNotFound] = useState(false)
  const [displayAddProductModal, setDisplayAddProductModal] = useState(false)
  const [ingredient, setIngredient] = useState<RecipeIngredient>(null)
  const [message, setMessage] = useState(messages.scanning)

  const onBarCodeScanned = async ({ type, data }: BarCodeProps) => {
    if (!scanningEnabled) return
    setScanningEnabled(false)
    setMessage(messages.searching)
    const response = await onSearch(data)
    if (!!response) {
      setIngredient(response)
      setMessage(messages.foundSomething)
      setDisplayAddProductModal(true)
    } else {
      setMessage(messages.notFound)
      setIngredient(null)
      setDisplayNotFound(true)
    }
  }

  const onPressTryAgain = () => {
    setMessage(messages.scanning)
    setDisplayNotFound(false)
    setScanningEnabled(true)
  }

  const onPressOk = () => {
    setDisplayNotFound(false)
    onExit()
  }

  const onPressAdd = async () => {
    setDisplayAddProductModal(false)
    await onAdd(ingredient)
  }

  return (
    <View style={[styles.container, styles.center]}>
      <BarCodeScanner onBarCodeScanned={onBarCodeScanned} message={message}/>
      {setDisplayNotFound && (
        <ModalCommon visible={displayNotFound}>
          <View style={styles.modalContent}>
            <Text type={'body2'}>{messages.notFound}</Text>
          </View>
          <View style={styles.modalButtons}>
            <Text type={'button'} onPress={onPressTryAgain} style={[styles.modalButton, {color}]}>TRY AGAIN</Text>
            <Text type={'button'} onPress={onPressOk} style={[styles.modalButton, {color}]}>OK</Text>
          </View>
        </ModalCommon>
      )}
      {displayAddProductModal && !!ingredient && (
        <ModalCommon visible={displayAddProductModal}>
          <View style={styles.modalContent}>
            <View style={styles.modalProductHolder}>
              <View style={styles.modalProductImageHolder}>
                {!!ingredient.image && (
                  <Image
                    source={{uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}}
                    resizeMode={'cover'}
                    style={styles.modalProductImage}
                  />
                )}
              </View>
              <View style={styles.modalProductTitleHolder}>
                <Text type={'body2'} numberOfLines={2} ellipsizeMode={'tail'}>
                  Found product - <Text type={'bodyBold2'} >{ingredient.name}</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.modalButtons}>
            <Text type={'button'} onPress={onPressAdd} style={[styles.modalButton, {color}]}>{addLabel}</Text>
          </View>
        </ModalCommon>
      )}
    </View>
  )
}

export default Scanner

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    height: 80,
    width: '100%',
  },
  modalContent: {
    padding: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalButton: {
    minWidth: 70,
    color: Col.Stocks,
    paddingHorizontal: 8,
    paddingVertical: 10,
    textAlign: 'center',
  },
  modalProductHolder: {
    flexDirection: 'row',
  },
  modalProductImageHolder: {
    width: 40,
    height: 40,
    backgroundColor: Col.Light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalProductTitleHolder: {
    flexShrink: 1,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalProductImage: {
    width: 40,
    height: 40,
  },
})
