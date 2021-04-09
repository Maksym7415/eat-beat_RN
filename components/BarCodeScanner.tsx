import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from "./custom/Typography";
import { Camera } from 'expo-camera';
import { Col, Spacing } from "./Config";

export interface BarCodeProps {
  type: any
  data: string
}

interface BarCodeScannerProps {
  message?: string
  onBarCodeScanned: (props: BarCodeProps) => void
}

const BarCodeScanner: FC<BarCodeScannerProps> = ({ onBarCodeScanned, message }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text type={'cap'}>No camera usage permissions given</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, styles.center]}>
      <Camera
        style={styles.camera}
        type={type}
        onBarCodeScanned={onBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['ean13'],
        }}
      />
      <View style={styles.overlay}>
        {!!message && (
          <View style={styles.messageHolder}>
            <Text type={'cap'} style={styles.messageText}>{message}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default BarCodeScanner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  camera: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#f00'
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  header: {
    width: '100%',
    height: 55
  },
  headerLeft: {
    width: '15%',
    height: 55
  },
  headerCenter: {
    width: '70%',
    height: 55
  },
  headerRight: {
    width: '15%',
    height: 55
  },
  messageHolder: {
    width: undefined,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    color: Col.White
  }
})
