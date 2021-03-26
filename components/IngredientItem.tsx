import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import CheckBox from './custom/CheckBox';
import Text from "./custom/Typography";
import { Col } from './Config';
import SvgMaker from './SvgMaker';

interface checkBoxProps {
  checked: boolean
  onPress: () => void
  bgColor?: string
  checkColor?: string
  size?: number
}

interface IngredientItemProps {
  checkbox: checkBoxProps,
  image: string
  amount: string
  unit: string
  name: string
  onPressEdit?: () => void
}

const IngredientItem: React.FC<IngredientItemProps> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkBoxHolder} onPress={props.checkbox.onPress} activeOpacity={0.7}>
        <CheckBox
          name={props.name}
          value={props.checkbox.checked}
          onCheck={() => {}}
          size={props.checkbox.size || 18}
          blend={props.checkbox.bgColor || Col.Profile}
          checkColor={props.checkbox.checkColor || Col.White}
        />
      </TouchableOpacity>
      <View style={styles.imageHolder}>
        <Image style={styles.image} source={{uri: props.image,}} />
      </View>
      <View style={styles.amountHolder}>
        <Text type="h6">{props.amount}</Text>
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
            onCheck={() => {}}
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
    width: '15%',
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
    width: '15%',
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
  deleteText: {
    color: Col.Red
  },
  actionCheckboxHolder: {
    padding: 16
  },
  actionLabelHolder: {
    marginLeft: 8,
    justifyContent: 'center',
  }
})
