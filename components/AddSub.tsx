import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Text from "./custom/Typography";
import { Col } from './Config';

interface Props {
  title?: string
  defaultValue?: number
  minValue?: number
  maxValue?: number
  onDone: (value: number) => void
  onCancel: () => void
}

const AddSub: FC<Props> = (props) => {
  const [value, setValue] = useState(props.defaultValue || props.minValue || 1)
  const disabledSub = () => {
    let disabled = false
    if (typeof props.minValue !== 'undefined' && value -1 < props.minValue) {
      disabled = true
    }
    return disabled
  }
  const disabledAdd = () => {
    let disabled = false
    if (typeof props.maxValue !== 'undefined' && value +1 >= props.maxValue) {
      disabled = true
    }
    return disabled
  }
  const onAdd = () => {
    setValue(value +1)
  }
  const onSub = () => {
    setValue(value -1)
  }
  return (
    <View style={styles.container}>
      {!!props.title && (
        <View style={styles.title}>
          <Text type={'label'} ellipsizeMode={'tail'} numberOfLines={1}>{props.title}</Text>
        </View>
      )}
      <View style={styles.holder}>
        <TouchableOpacity
          disabled={disabledSub()}
          style={[styles.button, disabledSub() ? styles.disabled : {}]}
          onPress={onSub}
          activeOpacity={0.9}
        >
          <Icon style={{ color: Col.Main }} name="minus" size={24} />
        </TouchableOpacity>
        <View style={styles.value}><Text type={'bodyBold'}>{value}</Text></View>
        <TouchableOpacity
          disabled={disabledAdd()}
          style={[styles.button, disabledAdd() ? styles.disabled : {}]}
          onPress={onAdd}
          activeOpacity={0.9}
        >
          <Icon style={{ color: Col.Main }} name="plus" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={props.onCancel}
          style={styles.actionButton}
        >
          <Text type={'button'}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onDone(value)}
          style={[styles.actionButton, {marginLeft: 70}]}
        >
          <Text type={'button'}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  holder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    alignItems: 'center',
    minWidth: 70,
    padding: 16,
  },
  button: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Col.Stocks,
    borderRadius: 16,
  },
  buttons: {
    marginTop: 20,
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    borderColor: Col.Disabled
  },
  actionButton: {
    padding: 12,
  },
});

export default AddSub;
