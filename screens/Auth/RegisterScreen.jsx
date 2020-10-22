import React, { useContext, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { fbLogin } from "../components/SocialAuth";
import FormikInput from "../components/FormikInput";
import { AppContext } from "../components/AppContext";
import { Col, auth, fdb } from "../components/Config";
import { CountryList } from "../components/CountryList";
import { MyButton, ButtonOutline } from "../components/MyComponents";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

export default function RegisterScreen({ navigation }) {
  const [clicked, setClicked] = useState(false);
  const { login } = useContext(AppContext);
  const signUp = async (value) => {
    if (clicked) return null;

    setClicked(true);
    setTimeout(setClicked(false), 3000);

    await auth
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(() => regUser(value))
      .catch((error) => alert(error));
  };

  const regUser = async (value) => {
    const { firstName, lastName, country, type } = value;
    try {
      let uid = auth.currentUser.uid;
      let input = {
        firstName,
        lastName,
        country,
      };
      let address = "/users/" + type + "/" + uid + "/public";
      fdb
        .ref(address)
        .set(input)
        .then(() => login(value))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.h1}>Sign Up</Text>
      </View>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          country: "",
          type: "Talent",
        }}
        validationSchema={Validation}
        onSubmit={(value) => signUp(value)}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <FormikInput value="firstName" label="First Name" />
            <FormikInput value="lastName" label="Last Name" />
            <FormikInput value="email" label="Email" />
            <FormikInput value="password" label="Password" />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={values.country}
                style={{ height: 50, width: 100 }}
                onValueChange={(v, i) => setFieldValue("country", v)}
                style={styles.picker}
              >
                {CountryList.map((c) => (
                  <Picker.Item key={c} label={c} value={c} />
                ))}
              </Picker>
            </View>
            <View style={styles.rowContainer}>
              <MyButton
                onPress={() => setFieldValue("type", "Recruiter")}
                label="Recruiter"
                width={"48%"}
                Color={values.type == "Recruiter" ? Col.Main : Col.SubText}
              />
              <MyButton
                onPress={() => setFieldValue("type", "Talent")}
                label="Talent"
                width={"48%"}
                Color={values.type == "Recruiter" ? Col.SubText : Col.Main}
              />
            </View>
            <MyButton onPress={handleSubmit} label="Sign Up" />
            <ButtonOutline
              onPress={() =>
                fbLogin().then(() => console.log("facebook singed in"))
              }
              label={"with Facebook"}
            />
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
  pickerContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    height: 40,
    width: "80%",
    borderColor: Col.Secondary,
    borderBottomWidth: 1,
  },
  picker: {
    color: Col.Main,
    width: "100%",
    height: "100%",
  },
});
