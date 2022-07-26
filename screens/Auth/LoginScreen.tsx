import React, { FC, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ErrorMessage } from "../../components/MyComponents";
import { Formik } from "formik";
import FormikInput from "../../components/FormikInput";
import * as Yup from "yup";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing } from "../../components/Config";
import { AuthProps, NavProps } from "../../components/interfaces";
import { Text } from "../../components/custom/Typography";
import server from "../../server";
import Logo from "./common/Logo";
import LayoutScroll from "../../components/custom/LayoutScroll";
import Constants from 'expo-constants';
import Version from '../../components/Version';

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const LoginScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useContext(AppContext);
  const signIn = async (value: AuthProps) => {
    setClicked(true);
    const response = await server.signIn(value);
    if (response.ok) {
      login(false);
    } else {
      if (response.status === 403 && response.data.code == 121)
        navigation.navigate("confirm", value);
      setClicked(false);
      setError(true);
    }
  };

  return (
    <LayoutScroll style={styles.container}>
      <Version
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          opacity: 0.5,
        }}
      />
      <Logo />
      <View style={styles.boxContainer}>
        <Text type="h6" style={styles.header}>
          Login
        </Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Validation}
          onSubmit={(value) => signIn(value)}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInput value="email" label="Email" error={error} />
              <FormikInput value="password" label="Password" error={error} />
              <ErrorMessage
                visible={error}
                error="Login or password are not registered"
                style={styles.errorContainer}
              />
              <Button
                clicked={clicked}
                onPress={handleSubmit}
                label="SIGN IN"
              />
            </>
          )}
        </Formik>
        <View style={styles.footer}>
          <Text type="body2">
            Don't have an account?
            <Text
              type="bodyBold2"
              style={styles.txtBtn}
              onPress={() => navigation.navigate("register")}
            >
              {"  Sign up"}
            </Text>
          </Text>
          <Text
            type="bodyBold2"
            style={styles.forgot}
            onPress={() => navigation.navigate("restore")}
          >
            Forgot password?
          </Text>
        </View>
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
  footer: {
    alignItems: "center",
    marginVertical: Spacing.small,
  },
  orContainer: {
    marginTop: "20%",
    width: "60%",
    alignItems: "center",
  },
  boxContainer: {
    padding: Spacing.large,
    backgroundColor: Col.White,
    borderRadius: 8,
    width: "100%",
    elevation: 12,
  },
  txtBtn: {
    color: Col.Main,
  },
  forgot: {
    color: Col.Main,
    padding: Spacing.medium,
    paddingBottom: 0,
  },
  errorContainer: {
    marginTop: Spacing.small,
  },
});

export default LoginScreen;
