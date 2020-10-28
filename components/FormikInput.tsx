import React, { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useFormikContext } from "formik";
import { Ionicons as Icon } from "@expo/vector-icons";
import { ErrorMessage } from "./MyComponents";
import { Col, Spacing } from "./Config";
import { InputProps } from "./interfaces";

const formikInput: FC<InputProps> = ({ value, label, error }) => {
  const { handleChange, setFieldTouched, touched, errors } = useFormikContext();
  const [hide, setHide] = useState(true);
  const [focus, setFocus] = useState(false);
  return (
    <>
      <View
        style={[
          styles.container,
          focus && styles.focus,
          error && styles.borderEr,
        ]}
      >
        <TextInput
          style={styles.input}
          onChangeText={handleChange(value)}
          onBlur={() => {
            setFieldTouched(value);
            setFocus(false);
          }}
          placeholder={label}
          onFocus={() => setFocus(true)}
          secureTextEntry={value === "password" && hide}
        />
        {value === "password" ? (
          <Icon
            name={hide ? "md-eye" : "md-eye-off"}
            size={24}
            color={Col.Grey}
            onPress={() => setHide(!hide)}
          />
        ) : (
          <View />
        )}
      </View>
      <ErrorMessage visible={touched[value]} error={errors[value]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: "row",
    padding: Spacing.r_small,
    borderColor: Col.Contrast,
    marginVertical: Spacing.tiny,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    color: Col.Dark,
    fontFamily: "Inter_400Regular",
    fontSize: 16,
  },
  borderEr: {
    borderColor: Col.Error,
  },
  focus: {
    borderColor: Col.Main,
  },
});
export default formikInput;
