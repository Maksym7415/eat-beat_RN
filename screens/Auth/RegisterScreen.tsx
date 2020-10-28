import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput";
import { Col, Spacing } from "../../components/Config";
import { Button } from "../../components/MyComponents";
import { Text } from "../../components/custom/Typography";
import { AuthProps, NavProps } from "../../components/interfaces";
import server from "../../server";
import SvgMaker from "../../components/SvgMaker";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const RegisterScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const signUp = async (value: AuthProps) => {
    setClicked(true);
    const logged = await server.register(value);
    if (logged) {
      navigation.navigate("login");
    } else {
      setClicked(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <SvgMaker name="logo" />
      </View>
      <View style={styles.boxContainer}>
        <Text type="h6" style={styles.header}>
          Create account
        </Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Validation}
          onSubmit={(value) => signUp(value)}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInput value="email" label="Email" />
              <FormikInput value="password" label="Password" />
              <Button
                clicked={clicked}
                onPress={handleSubmit}
                label="REGISTER"
              />
            </>
          )}
        </Formik>
        <View style={styles.footer}>
          <Text type="body2">
            Already have an account?
            <Text
              type="bodyBold2"
              style={styles.txtBtn}
              onPress={() => navigation.navigate("login")}
            >
              {"  Sign in"}
            </Text>
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
  logoContainer: {
    marginTop: 80,
    marginBottom: 50,
  },
});
export default RegisterScreen;
