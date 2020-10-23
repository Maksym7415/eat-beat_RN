import React, { useContext, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput";
import { Col } from "../../components/Config";
import { MyButton } from "../../components/MyComponents";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

export default function RegisterScreen({ navigation }) {
  const [clicked, setClicked] = useState(false);
  const signUp = async (value) => {
    console.log(value);
    try {
      await axios.post("/auth/sign-up", value);
      navigation.goBack();
    } catch (e) {
      console.log(e, value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.h1}>Sign Up</Text>
      </View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Validation}
        onSubmit={(value) => signUp(value)}
      >
        {({ handleSubmit }) => (
          <>
            <FormikInput value="email" label="Email" />
            <FormikInput value="password" label="Password" />
            <MyButton onPress={handleSubmit} label="Sign Up" />
          </>
        )}
      </Formik>
      <Text style={styles.signUp} onPress={() => navigation.goBack()}>
        Return to <Text style={{ color: Col.Main }}> Sign In</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Col.Bg,
  },
  rowContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  txtContainer: {
    width: "80%",
    marginTop: "15%",
  },
  input: {
    height: 40,
    width: "80%",
    color: Col.Main,
    borderColor: Col.Secondary,
    borderBottomWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  h1: {
    fontSize: 30,
    color: Col.Main,
    fontWeight: "bold",
  },
  signUp: {
    marginTop: 20,
    color: Col.SubText,
    fontSize: 16,
  },
});
