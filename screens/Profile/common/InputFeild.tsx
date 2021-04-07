import React, { FC, forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, TextInput, View } from "react-native";
import { Col, Spacing } from "../../../components/Config";
import Text from "../../../components/custom/Typography";

interface Props {
  label: string;
  input: string | number | null;
  onChange: (value: string) => void;
  disabled?: boolean;
  suffix?: string;
  required?: boolean;
  limit?: number[];
}

const InputFeild: FC<Props> = forwardRef(({
  label,
  onChange,
  input,
  suffix = "",
  disabled = false,
  required = false,
  limit = [0, 1],
}, ref: Ref<React.ReactText>) => {
  const [value, setValue] = useState(input);
  useImperativeHandle(ref, () => value);
  const handleChange = () => {
    if (value === "") return;
    let newVal: number = isNaN(Number(value)) ? 18 : Number(value);
    if (newVal < limit[0]) newVal = limit[0];
    if (newVal > limit[1]) newVal = limit[1];
    setValue(`${newVal}`);
    onChange(`${newVal}`);
  };
  useEffect(() => {
    setValue(input);
  }, [input]);
  return (
    <View style={styles.container}>
      <Text type="body">{label}</Text>
      <View style={styles.chipsConatainer}>
        <TextInput
          value={value?.toString()}
          editable={!disabled}
          maxLength={3}
          keyboardType="number-pad"
          placeholder={value ? value?.toString() : "---"}
          onChangeText={(value) => setValue(value)}
          onBlur={handleChange}
          onEndEditing={handleChange}
          placeholderTextColor={required || value ? Col.Error : Col.Black}
          style={styles.input}
        />
        <Text type="body2">{suffix}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Spacing.small,
  },
  chipsConatainer: {
    width: "50%",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    marginRight: Spacing.medium,
  },
});
export default InputFeild
