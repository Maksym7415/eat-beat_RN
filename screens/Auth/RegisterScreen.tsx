import React, { FC, useState } from "react";
import axios from "axios";
import { Alert, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput";
import { Col, Spacing } from "../../components/Config";
import { Button } from "../../components/MyComponents";
import { Text } from "../../components/custom/Typography";
import { AuthProps, NavProps } from "../../components/interfaces";

const Validation = Yup.object().shape({
  name: Yup.string().required().label("Full Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const RegisterScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const signUp = async ({ name, email, password }: AuthProps) => {
    setClicked(true);
    try {
      await axios.post("/auth/sign-up", { email, password });
      navigation.goBack();
    } catch (error) {
      console.log(error, { email, password });
      Alert.alert(error);
      setClicked(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text type="h6" style={styles.header}>
          Create account
        </Text>
        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          validationSchema={Validation}
          onSubmit={(value) => signUp(value)}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInput value="name" label="Full Name" />
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
              onPress={() => navigation.push("login")}
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
export default RegisterScreen;
