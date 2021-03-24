import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface Props {
  color?: string
}

export default function Loader (props: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.container}  size="small" color={props.color || '#000'} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
});
