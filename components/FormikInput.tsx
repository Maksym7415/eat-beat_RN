import React, { FC } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useFormikContext } from "formik";
import { ErrorMessage } from "./MyComponents";
import { Col, Spacing } from "./Config";
import { InputProps } from "./interfaces";

const formikInput: FC<InputProps> = ({ value, label, error }) => {
  const { handleChange, setFieldTouched, touched, errors } = useFormikContext();
  return (
    <>
      <TextInput
        style={[styles.input, error && styles.borderEr]}
        onChangeText={handleChange(value)}
        onBlur={() => setFieldTouched(value)}
        placeholder={label}
        secureTextEntry={value === "password"}
      />
      <ErrorMessage visible={touched[value]} error={errors[value]} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: Col.Dark,
    borderRadius: 8,
    padding: Spacing.r_small,
    borderColor: Col.Contrast,
    marginVertical: Spacing.tiny,
    fontFamily: "Roboto",
  },
  borderEr: {
    borderColor: Col.Error,
  },
});
export default formikInput;
