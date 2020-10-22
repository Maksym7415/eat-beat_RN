import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { MyButton, ButtonOutline } from "../components/MyComponents";
import { Formik } from "formik";
import FormikInput from "../components/FormikInput";
import * as Yup from "yup";
import { AppContext } from "../components/AppContext";
import { Col, auth } from "../components/Config";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AppContext);
  const signIn = async (value) => {
    await auth
      .signInWithEmailAndPassword(value.email, value.password)
      .then(() => login(value))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.h1}>Hello,</Text>
        <Text style={styles.h2}>Sign into your Account</Text>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Validation}
        onSubmit={(value) => signIn(value)}
      >
        {({ handleSubmit }) => (
          <>
            <FormikInput value="email" label="Email" />
            <FormikInput value="password" label="Password" />
            <MyButton onPress={handleSubmit} label="Sign In" />
          </>
        )}
      </Formik>

      <Text style={styles.signUp} onPress={() => navigation.push("SignUp")}>
        Here for the first time?
        <Text style={{ color: Col.Primary }}> Sign Up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Col.Back,
  },
  orContainer: {
    marginTop: "20%",
    width: "60%",
    alignItems: "center",
  },
  txtContainer: {
    width: "80%",
    marginTop: "25%",
    marginBottom: "15%",
  },
  h1: {
    fontSize: 30,
    color: Col.Primary,
    fontWeight: "bold",
  },
  h2: {
    color: Col.Grey3,
    fontSize: 24,
  },
  warning: {
    color: Col.prompt,
  },
  signUp: {
    marginTop: 20,
    color: Col.SubText,
    fontSize: 16,
  },
});
