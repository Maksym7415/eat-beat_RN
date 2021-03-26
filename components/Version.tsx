import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Constants from 'expo-constants';
import BackendSwitcher from './BackendSwitcher';
import { Col } from './Config';
import Typography from './custom/Typography';

const AMOUNT_OF_TAPS = 5

interface Props {
  style: ViewStyle
}

export default function Version (props: Props) {
  const [count, setCount] = useState<number>(0)

  const onPressVersion = useCallback(() => {
    const updatedCount = count +1
    if (updatedCount >= AMOUNT_OF_TAPS) {
      setCount(0)
      BackendSwitcher.openSwitcher()
    } else {
      setCount(updatedCount)
    }
  }, [count])

  return (
    <TouchableOpacity style={props.style || styles.container} activeOpacity={1} onPress={onPressVersion}>
      <Typography type='cap' style={{color: Col.White}}>
        {`version ${Constants.nativeAppVersion}-${Constants.nativeBuildVersion}`}
      </Typography>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {}
});
