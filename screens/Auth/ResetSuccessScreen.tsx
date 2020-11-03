import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../../components/MyComponents";
import { Col, Spacing } from "../../components/Config";
import { NavProps } from "../../components/interfaces";
import { Text } from "../../components/custom/Typography";
import Logo from "./common/Logo";

const ResetSuccessScreen: FC<NavProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.boxContainer}>
        <Text type="h6" style={styles.header}>
          Successful
        </Text>
        <Text type="body2">
          You've successfully changed your password, now you can login with your
          new password
        </Text>
        <Button
          style={styles.btn}
          onPress={() => navigation.navigate("login")}
          label="Go"
        />
      </View>
    </View>
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

export default ResetSuccessScreen;
