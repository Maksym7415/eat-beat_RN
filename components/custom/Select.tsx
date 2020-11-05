import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing } from "../Config";
import Text from "./Typography";

interface Options {
  title: string;
  value: number;
}

interface Props {
  selected: number;
  onSelect: (value: number) => void;
  disabled: boolean;
}

const Select: FC<Props> = ({ selected, onSelect, disabled }) => {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<Options>({
    title: "Choose Activity",
    value: 0,
  });

  const options: Options[] = [
    { title: "BMR", value: 1.2 },
    { title: "Sedentary", value: 1.375 },
    { title: "Light", value: 1.46 },
    { title: "Moderate", value: 1.55 },
    { title: "Active", value: 1.64 },
    { title: "Very active", value: 1.72 },
    { title: "Extra active", value: 1.9 },
  ];

  const changeHanlder = (title: string, value: number) => {
    if (selected !== value) {
      onSelect(value);
      setItem({ title, value });
    }
    setShow(!show);
  };

  return (
    <View>
      <Pressable disabled={!disabled} onPress={() => setShow(!show)}>
        <View
          style={[
            styles.container,
            { borderColor: !selected && disabled ? Col.Error : Col.Inactive },
          ]}
        >
          <Text type="body2">{item.title}</Text>
          <Icon name={show ? "arrow-drop-up" : "arrow-drop-down"} size={20} />
        </View>
      </Pressable>
      {show ? (
        <View style={styles.options}>
          <ScrollView>
            {options.map(({ title, value }) => (
              <TouchableOpacity
                key={title}
                onPress={() => changeHanlder(title, value)}
                style={{
                  backgroundColor: value === selected ? Col.Grey : Col.White,
                }}
              >
                <Text
                  type="body2"
                  style={[
                    styles.label,
                    {
                      backgroundColor:
                        value === selected ? Col.Inactive : Col.White,
                    },
                  ]}
                >
                  {title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.small,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  options: {
    position: "absolute",
    borderRadius: 8,
    borderColor: Col.Divider,
    borderWidth: 1,
    zIndex: 1,
    height: 130,
    top: 42,
    right: 0,
    width: "100%",
    overflow: "hidden",
  },
  item: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Col.Inactive,
  },
  label: {
    paddingVertical: 12,
    paddingHorizontal: 17,
  },
});
export default Select;
