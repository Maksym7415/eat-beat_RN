import React, { FC } from "react";
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './custom/Typography';
import { Col } from './Config';

interface DeleteConfirmationProps {
  amount?: number
  onPressCancel: () => void
  onPressConfirm: () => void
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
  amount,
  onPressCancel,
  onPressConfirm
}) => {
  const amountStr = amount ? ` (${amount})` : ``
  return (
    <View style={styles.container}>
      <Text type={'h6'} style={styles.title}>Delete?</Text>
      <View style={styles.content}>
        <Text type={'body2'} style={styles.message}>Delete selected{amountStr}</Text>
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={onPressCancel}>
          <Text type="sub" style={{ color: Col.Black }}>
            CANCEL
          </Text>
        </Pressable>
        <Pressable onPress={onPressConfirm} style={{marginLeft: 42, marginRight: 8}}>
          <Text type="sub" style={{ color: Col.Error }}>
            DELETE
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default DeleteConfirmation

const styles = StyleSheet.create({
  container: {

  },
  title: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: '500',
    lineHeight: 24
  },
  content: {
    marginTop: 12,
  },
  message: {

  },
  buttons: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }

})
