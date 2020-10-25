import React, { FC, useContext, useState } from "react";
import axios from "axios";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "../../components/MyComponents";
import { Formik } from "formik";
import FormikInput from "../../components/FormikInput";
import * as Yup from "yup";
import { AppContext } from "../../components/AppContext";
import { Col } from "../../components/Config";
import { NavProps } from "../../components/interfaces";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

interface buffer {
  email: string;
  password: string;
}

const LoginScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const { login } = useContext(AppContext);
  const signIn = async (value: buffer) => {
    setClicked(true);
    try {
      await axios.post("/auth/sign-in", value);
      login();
    } catch (e) {
      setClicked(false);
      console.log(e, value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text>Hello,</Text>
        <Text>Sign into your Account</Text>
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
            <Button clicked={clicked} onPress={handleSubmit} label="Sign In" />
            <Button
              onPress={() => navigation.push("Register")}
              label="Sign Up"
            />
          </>
        )}
      </Formik>
      <Text style={styles.signUp} onPress={() => navigation.push("Register")}>
        Here for the first time?
        <Text style={{ color: Col.Primary }}> Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Col.Background,
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
  warning: {
    color: Col.Red,
  },
  signUp: {
    marginTop: 20,
    color: Col.Black,
    fontSize: 16,
  },
});

export default LoginScreen;
