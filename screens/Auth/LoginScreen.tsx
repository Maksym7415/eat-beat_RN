import React, { FC, useContext, useState } from "react";
import axios from "axios";
import { Alert, StyleSheet, View } from "react-native";
import { Button } from "../../components/MyComponents";
import { Formik } from "formik";
import FormikInput from "../../components/FormikInput";
import * as Yup from "yup";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing } from "../../components/Config";
import { AuthProps, NavProps } from "../../components/interfaces";
import { Text } from "../../components/custom/Typography";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const LoginScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const { login } = useContext(AppContext);
  const signIn = async ({ email, password }: AuthProps) => {
    setClicked(true);
    try {
      await axios.post("/auth/sign-in", { email, password });
      login();
    } catch (error) {
      setClicked(false);
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.container}>
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
              <FormikInput value="email" label="Email" />
              <FormikInput value="password" label="Password" />
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
              onPress={() => navigation.push("register")}
            >
              {"  Create account"}
            </Text>
          </Text>
          <Text
            type="bodyBold2"
            style={styles.forgot}
            onPress={() => navigation.push("restore")}
          >
            Forgot password?
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Col.Green,
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
    color: Col.Green,
  },
  forgot: {
    color: Col.Green,
    padding: Spacing.medium,
    paddingBottom: 0,
  },
});

export default LoginScreen;
