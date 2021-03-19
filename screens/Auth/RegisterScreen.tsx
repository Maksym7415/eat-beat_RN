import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput";
import { Col, Spacing } from "../../components/Config";
import { Button, ErrorMessage } from "../../components/MyComponents";
import { Text } from "../../components/custom/Typography";
import { AuthProps, NavProps } from "../../components/interfaces";
import server from "../../server";
import Modal from "../../components/Modal";
import Logo from "./common/Logo";
import CheckBox from "../../components/custom/CheckBox";
import LayoutScroll from "../../components/custom/LayoutScroll";

const Validation = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const RegisterScreen: FC<NavProps> = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [toggleTerms, setToggleTerms] = useState(false);
  const [doc, setDoc] = useState({
    label: "Privacy Policy",
    desc: "PrivacyPolicy",
  });

  const signUp = async (value: AuthProps) => {
    setClicked(true);
    const response = await server.register(value);
    if (response.ok) {
      navigation.navigate("confirm", value);
    } else {
      if (response.status === 400) setError(true);
      setClicked(false);
    }
  };

  const showModal = (label: string, desc: string) => {
    setDoc({ label, desc });
    setVisible(true);
  };
  return (
    <>
      <Modal
        modalVisible={visible}
        label={doc.label}
        content={doc.desc}
        showModal={() => setVisible(false)}
      />
      <LayoutScroll style={styles.container}>
        <Logo />
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
                <FormikInput value="password" label="Password" maxLength={50} />
                <ErrorMessage
                  visible={error}
                  error={`this email is already registered`}
                  style={styles.errorContainer}
                />
                <View style={styles.termsContainer}>
                  <CheckBox
                    blend={Col.Main}
                    value={toggleTerms}
                    name={"reg"}
                    onCheck={(name, newValue) => setToggleTerms(newValue)}
                  />
                  <View style={styles.textContainer}>
                    <Text>By creating an account, you agree to EatBeat's</Text>
                    <Text
                      onPress={() =>
                        showModal("EAT BEAT Terms of Use", "TermsOfUse")
                      }
                      style={{ color: Col.Main }}
                    >
                      Terms of Use
                    </Text>
                    <Text> and </Text>
                    <Text
                      onPress={() =>
                        showModal("Privacy Policy", "PrivacyPolicy")
                      }
                      style={{ color: Col.Main }}
                    >
                      Privacy Policy
                    </Text>
                  </View>
                </View>
                <Button
                  clicked={clicked}
                  deactivate={!toggleTerms}
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
      </LayoutScroll>
    </>
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
  errorContainer: {
    marginTop: Spacing.small,
  },
  termsContainer: {
    flexDirection: "row",
    marginVertical: Spacing.r_small,
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: Spacing.medium,
  },
});
export default RegisterScreen;
