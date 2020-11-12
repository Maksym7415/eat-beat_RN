import React, { FC, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { Button, ErrorMessage } from "../../components/MyComponents";
import { Formik } from "formik";
import FormikInput from "../../components/FormikInput";
import { Col, Spacing } from "../../components/Config";
import { NavProps } from "../../components/interfaces";
import { Text } from "../../components/custom/Typography";
import server from "../../server";
import Logo from "./common/Logo";

const Validation = Yup.object().shape({
  verificationCode: Yup.number().required().min(5).label("verification Code"),
  password: Yup.string().required().min(6).label("Reset Password"),
});

interface passProps {
  password: string;
  verificationCode: string;
}

const ChangePasswordScreen: FC<NavProps> = ({ navigation, route }) => {
  const Email = route.params.email;

  const [resend, setResend] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const changePassword = async (options: passProps) => {
    setClicked(true);
    const response = await server.updatePassword(options);
    if (response) {
      navigation.navigate("resetSuccess");
    } else {
      setClicked(false);
      setError(true);
    }
  };

  const handleResend = async () => {
    setResend(true);
    setTimeout(setResend(false), 60000);
    const sent = await server.resendPasswordCode(Email);
    if (sent) {
      Alert.alert(
        "Verification",
        "Please Check your Email for the Verification Code"
      );
    } else {
      Alert.alert(
        "Error",
        "Sorry!\nSomething went wrong while trying to get a new code, please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.boxContainer}>
        <Text type="h6" style={styles.header}>
          Reset Password
        </Text>
        <Text type="body2" style={styles.header}>
          Please Enter the verification code you recieved via email, then enter
          your new password.
        </Text>
        <Formik
          initialValues={{ password: "", verificationCode: "" }}
          validationSchema={Validation}
          onSubmit={(value) => changePassword(value)}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInput
                maxLength={5}
                value="verificationCode"
                label="Verification Code"
                error={error}
              />
              <FormikInput
                maxLength={50}
                value="password"
                label="Enter new password"
                error={error}
              />
              <ErrorMessage
                visible={error}
                error="Password reset was rejected"
                style={styles.errorContainer}
              />
              <Button
                clicked={clicked}
                onPress={handleSubmit}
                label="CHANGE PASSWORD"
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

export default ChangePasswordScreen;
