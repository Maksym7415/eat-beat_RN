import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import SvgMaker from "../../components/SvgMaker";

interface Props {
  onPress: () => void;
  name?: string;
}

const BurgerIcon: FC<Props> = ({ onPress, name = "menu" }) => {
  return (
    <TouchableOpacity style={{ padding: 5, marginLeft: 16 }} onPress={onPress}>
      <SvgMaker name={name} />
    </TouchableOpacity>
  );
};

export default BurgerIcon;
