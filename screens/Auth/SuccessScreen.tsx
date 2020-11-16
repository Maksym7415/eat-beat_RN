import React, { FC, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../../components/MyComponents";
import { Col, Spacing } from "../../components/Config";
import { NavProps } from "../../components/interfaces";
import { Text } from "../../components/custom/Typography";
import { AppContext } from "../../components/AppContext";
import Logo from "./common/Logo";
import LayoutScroll from "../../components/custom/LayoutScroll";

const SuccessScreen: FC<NavProps> = ({ navigation }) => {
  const { login } = useContext(AppContext);

  useEffect(() => {
    navigation.addListener('focus', () => {
      login(true);
    });
    
  }, [])

  return (
    <LayoutScroll style={styles.container}>
      <Logo />
      <View style={styles.boxContainer}>
        <Text type="h6" style={styles.header}>
          Successful
        </Text>
        <Text type="body2">
          Your account is ready. You can use the application
        </Text>
        <Button style={styles.btn} onPress={() => login()} label="GO" />
      </View>
    </LayoutScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Col.Main,
    padding: Spacing.large,
  },
  header: {
    marginBottom: Spacing.medium,
  },
  boxContainer: {
    padding: Spacing.large,
    backgroundColor: Col.White,
    borderRadius: 8,
    width: "100%",
    elevation: 12,
  },
  logoContainer: {
    marginTop: 80,
    marginBottom: 50,
  },
  btn: {
    marginTop: Spacing.giant,
  },
});

export default SuccessScreen;
