import React from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from './custom/CheckBox';
import Text from "./custom/Typography";
import { Col } from './Config';
import SvgMaker from './SvgMaker';
import { IngredientProducts, Product } from './interfaces';

interface checkBoxProps {
  checked: boolean
  onPress: () => void
  bgColor?: string
  checkColor?: string
  size?: number
}

interface IngredientItemProps {
  checkbox?: checkBoxProps,
  image?: string
  amount: string
  unit: string
  name: string
  onPressEdit?: () => void
}


const IngredientItem: React.FC<IngredientItemProps> = (props) => {
  return (
    <View style={styles.container}>
      {!!props.checkbox &&
        <TouchableOpacity style={styles.checkBoxHolder} onPress={props.checkbox.onPress} activeOpacity={0.7}>
          <CheckBox
            name={props.name}
            value={props.checkbox.checked}
            size={props.checkbox.size || 18}
            blend={props.checkbox.bgColor || Col.Profile}
            checkColor={props.checkbox.checkColor || Col.White}
          />
        </TouchableOpacity>
      }
      {!!props.image &&
        <View style={styles.imageHolder}>
          <Image style={styles.image} source={{uri: props.image,}} />
        </View>
      }
      <View style={styles.amountHolder}>
        <Text type="bodyBold">{props.amount}</Text>
      </View>
      <View style={styles.unitHolder}>
        <Text type="cap">{props.unit}</Text>
      </View>
      <View style={styles.nameHolder}>
        <Text type="cap">{props.name}</Text>
      </View>
      {typeof(props.onPressEdit) === 'function' && (
        <TouchableOpacity style={styles.actionHolder} onPress={props.onPressEdit}>
          <SvgMaker name={'edit'} />
        </TouchableOpacity>
      )}
    </View>
  )
}

interface ProductItemProps extends Product {
  onChangeAmount: () => void
  backgroundColor?: string
}
export const ProductItem: React.FC<ProductItemProps> = (props) => {
  return (
    <View style={[styles.container, {backgroundColor: props.backgroundColor ? props.backgroundColor : Col.Ghost}]}>
      <View style={styles.amountHolder}>
        <Text type="bodyBold">{props.quantity}</Text>
      </View>
      <View style={styles.unitHolder}>
        <Text type="cap">{props.units}</Text>
      </View>
      <View style={styles.nameHolder}>
        <Text type="cap" ellipsizeMode={'tail'} numberOfLines={2}>{props.name}</Text>
      </View>
      <View style={styles.priceHolder}>
        <Text type="cap">{props.price} {props.currency || '€'}</Text>
      </View>
      <TouchableOpacity style={[styles.actionHolder, styles.amountButton]} onPress={props.onChangeAmount}>
        <Text type="cap">{props.amount}</Text>
      </TouchableOpacity>
    </View>
  )
}


interface ActionsRowProps {
  checkbox: checkBoxProps,
  amount: number,
  onPressDeleteSelected: () => void
}

export const ActionsRow: React.FC<ActionsRowProps> = (props) => {
  return (
    <View style={[styles.container, styles.topBorder, styles.spaceBetween]}>
      <View style={[styles.row, styles.center]}>
        <TouchableOpacity style={styles.checkBoxHolder} onPress={props.checkbox.onPress} activeOpacity={0.7}>
          <CheckBox
            name={'summary'}
            value={props.checkbox.checked}
            size={props.checkbox.size || 18}
            blend={props.checkbox.bgColor || Col.Profile}
            checkColor={props.checkbox.checkColor || Col.White}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionLabelHolder} onPress={props.checkbox.onPress} activeOpacity={0.7}>
          <Text type={'cap'}>Select All</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}/>
        {props.amount > 0 && (
          <TouchableOpacity style={[styles.marginRight]} onPress={props.onPressDeleteSelected} activeOpacity={0.7}>
            <Text type={'cap'} style={styles.deleteText}>Delete selected ({props.amount})</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default IngredientItem

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 48,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F7F7FB'
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F7F7FB'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginRight: {
    marginRight: 16,
  },
  checkBoxHolder: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHolder: {
    width: '12%',
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
  },
  amountHolder: {
    marginLeft: 5,
    width: '18%',
    justifyContent: 'center',
  },
  nameHolder: {
    marginLeft: 5,
    width: '25%',
    justifyContent: 'center',
  },
  unitHolder: {
    marginLeft: 5,
    width: '20%',
    justifyContent: 'center',
  },
  actionHolder: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Col.Stocks
  },
  priceHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: Col.Red
  },
  actionCheckboxHolder: {
    padding: 16
  },
  actionLabelHolder: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Col.Ghost,
    paddingHorizontal: 6,
  },
  error: {
    borderColor: Col.Error,
  }
})
