import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from "react-native";
import { Col, Spacing } from "../../components/Config";
import { NavProps } from '../../components/interfaces';
import { styles } from './ScannerScreen.styles';

const ScannerScreen: FC<NavProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>

    </View>
  );
}

export default ScannerScreen
