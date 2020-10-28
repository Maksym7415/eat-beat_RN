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
});

const RestoreScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const { login } = useContext(AppContext);
  const signIn = async ({ email }: AuthProps) => {
    setClicked(true);
    try {
      //await axios.post("/auth/sign-in", { email });
      //login();
      Alert.alert("эта функция не реализована на бэкэнде");
    } catch (error) {
      setClicked(false);
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text type="h6" style={styles.header}>
          Forgot your password?
        </Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Validation}
          onSubmit={(value) => signIn(value)}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInput value="email" label="Enter your e-mail" />
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
            onPress={() => navigation.push("login")}
          >
            Log in
          </Text>
          <Text>|</Text>
          <Text
            type="bodyBold2"
            style={styles.txtBtn}
            onPress={() => navigation.push("register")}
          >
            Sign up
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
});

export default RestoreScreen;
