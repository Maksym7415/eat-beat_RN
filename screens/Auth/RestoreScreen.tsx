import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ErrorMessage } from "../../components/MyComponents";
import { Formik } from "formik";
import FormikInput from "../../components/FormikInput";
import * as Yup from "yup";
import { Col, Spacing } from "../../components/Config";
import { NavProps } from "../../components/interfaces";
import { Text } from "../../components/custom/Typography";
import Logo from "./common/Logo";
import server from "../../server";
import LayoutScroll from "../../components/custom/LayoutScroll";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

interface AuthProps {
  email: string;
}

const RestoreScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const sendRequest = async (value: AuthProps) => {
    setClicked(true);
    const response = await server.resetPassword(value);
    if (response) {
      navigation.navigate("changePassword", value);
    } else {
      setError(true);
      setClicked(false);
    }
  };

  return (
    <LayoutScroll style={styles.container}>
      <Logo />
      <View style={styles.boxContainer}>
        <Text type="h6" style={styles.header}>
          Forgot your password?
        </Text>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Validation}
          onSubmit={(value) => sendRequest(value)}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInput
                value="email"
                label="Enter your e-mail"
                error={error}
              />
              <ErrorMessage
                visible={error}
                error="This Email is not registered"
                style={styles.errorContainer}
              />
              <Button
                clicked={clicked}
                onPress={handleSubmit}
                label="SEND ME INSTRUCTIONS"
              />
            </>
          )}
        </Formik>
        <View style={styles.footer}>
          <Text
            type="bodyBold2"
            style={styles.txtBtn}
            onPress={() => navigation.navigate("login")}
          >
            Log in
          </Text>
          <Text>|</Text>
          <Text
            type="bodyBold2"
            style={styles.txtBtn}
            onPress={() => navigation.navigate("register")}
          >
            Sign up
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
    flexDirection: "row",
    justifyContent: "center",
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
    paddingHorizontal: Spacing.large,
  },
  forgot: {
    color: Col.Main,
    padding: Spacing.medium,
    paddingBottom: 0,
  },
  logoContainer: {
    marginTop: 80,
    marginBottom: 50,
  },
  errorContainer: {
    marginTop: Spacing.small,
  },
});

export default RestoreScreen;
