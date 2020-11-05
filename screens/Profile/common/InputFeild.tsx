import React, { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Col, Spacing } from "../../../components/Config";
import Text from "../../../components/custom/Typography";

interface Props {
  label: string;
  input: string | number | null;
  onChange: (value: string) => void;
  disabled?: boolean;
  suffix?: string;
}

const InputFeild: FC<Props> = ({
  label,
  onChange,
  input,
  suffix = "",
  disabled = false,
}) => {
  const [value, setValue] = useState(input);
  const handleChange = () => {
    onChange(value);
  };
  return (
    <View style={styles.container}>
      <Text type="body" style={{ color: disabled ? "black" : Col.Grey }}>
        {label}
      </Text>
      <View style={styles.chipsConatainer}>
        <TextInput
          value={value?.toString()}
          editable={disabled}
          maxLength={3}
          keyboardType="number-pad"
          placeholder={value ? value?.toString() : "---"}
          onChangeText={(value) => setValue(value)}
          onEndEditing={handleChange}
          placeholderTextColor={disabled || value ? Col.Error : Col.Black}
          style={styles.input}
        />
        <Text type="body2">{suffix}</Text>
      </View>
    </View>
  );
};

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
export default InputFeild;