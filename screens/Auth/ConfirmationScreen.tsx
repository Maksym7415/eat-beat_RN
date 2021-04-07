import React, { FC, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, ErrorMessage } from "../../components/MyComponents";
import { Formik } from "formik";
import FormikInput from "../../components/FormikInput";
import * as Yup from "yup";
import { Col, Spacing } from "../../components/Config";
import { NavProps } from "../../components/interfaces";
import { Text } from "../../components/custom/Typography";
import server from "../../server";
import Logo from "./common/Logo";
import LayoutScroll from "../../components/custom/LayoutScroll";

const Validation = Yup.object().shape({
  verificationCode: Yup.number()
    .required()
    .min(5)
    .label("verification Code")
    .typeError("Code must be a number"),
});

const ConfirmationScreen: FC<NavProps> = ({ navigation, route }) => {
  const Email = route.params.email;

  const [clicked, setClicked] = useState(false);
  const [resend, setResend] = useState(false);
  const [error, setError] = useState(false);
  const [clear, setClear] = useState(false)
  const onConfirm = async (value) => {
    setClicked(true);
    const verified = await server.verifyAccount(value.verificationCode);
    if (verified.ok) {
      const logged = await server.signIn(route.params);
      if (logged) navigation.navigate("success");
    } else {
      setClicked(false);
      setError(true);
    }
  };

  const handleResend = async () => {
    setResend(true);
    setClear(true);
    setTimeout(setResend(false), 60000);
    const sent = await server.resendCode(Email);
    if (sent) {
      Alert.alert(
        "Verification",
        "Please Check your Email for the Verification Code"
      );
      setClear(false);
    } else {
      setClear(false);
      Alert.alert(
        "Error",
        "Sorry!\nSomething went wrong while trying to get a new code, please try again later."
      );
    }
  };

  return (
    <LayoutScroll style={styles.container}>
      <Logo />
      <View style={styles.boxContainer}>
        <Text type="h6" style={styles.header}>
          Confirmation
        </Text>
        <Text type="body2" style={styles.header}>
          Thanks for registration. We will message you on “{Email}” in order to activate your account.
        </Text>
        <Formik
          initialValues={{ verificationCode: "" }}
          validationSchema={Validation}
          onSubmit={(value) => onConfirm(value)}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInput
                value="verificationCode"
                label="Enter your code"
                error={error}
                maxLength={5}
                clear={clear}
              />
              <ErrorMessage
                visible={error}
                error="The Code you entered is incorrect"
                style={styles.errorContainer}
              />
              <Button
                clicked={clicked}
                onPress={handleSubmit}
                label="CONFIRM"
                style={{ marginTop: Spacing.xlarge }}
              />
              <Button
                type="text"
                clicked={resend}
                onPress={handleResend}
                label="Resend me again"
                style={{ marginVertical: 0 }}
                labelStyle={{ color: Col.Ghost }}
              />
            </>
          )}
        </Formik>
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
  logoContainer: {
    marginTop: 80,
    marginBottom: 50,
  },
});

export default ConfirmationScreen;
