import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useFormikContext } from "formik";
import { ErrorMessage } from "./MyComponents";
import { Col } from "./Config";

export default function formikInput({ value, label, multi = false }) {
  const { handleChange, setFieldTouched, touched, errors } = useFormikContext();
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={handleChange(value)}
        onBlur={() => setFieldTouched(value)}
        placeholder={label}
        multiline={multi}
      />
      <ErrorMessage visible={touched[value]} error={errors[value]} />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 40,
    maxHeight: 120,
    width: "80%",
    color: Col.Primary,
    borderColor: Col.Contrast,
    borderBottomWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});
