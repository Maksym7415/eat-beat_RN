import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { on } from 'cluster';

interface Props {
  value?: boolean;
  onCheck?: (name: string, value: boolean) => void;
  blend?: string;
  size?: number;
  checkColor?: string;
  name: string;
}

const CheckBox: FC<Props> = ({
  onCheck,
  size = 16,
  value = false,
  blend = "white",
  checkColor = "white",
  name,
}) => {
  const onPressCheckbox = () => {
    if (typeof onCheck === 'function') {
      onCheck(name, !value)
    }
  }
  const UI = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        backgroundColor: value ? blend : "transparent",
        borderWidth: value ? 0 : 2,
        borderColor: blend,
        width: size,
        height: size,
      }}
    >
      {value ? (
        <Icon name="check" size={size} color={checkColor} />
      ) : (
        <View />
      )}
    </View>
  )

  return typeof onCheck === 'function' ?
    (<Pressable onPress={onPressCheckbox}>{UI()}</Pressable>) :
    (<View>{UI()}</View>);
};
export default CheckBox;
