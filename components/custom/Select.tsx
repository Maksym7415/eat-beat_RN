import React, { FC, useEffect, useState } from "react";
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
  disabled?: boolean;
  required?: boolean;
}

const Select: FC<Props> = ({
  selected,
  onSelect,
  disabled = false,
  required = false,
}) => {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<Options>({
    title: "Choose Activity",
    value: 0,
  });

  const options: Options[] = [
    { title: "BMR", value: 1 },
    { title: "Sedentary", value: 2 },
    { title: "Light", value: 3 },
    { title: "Moderate", value: 4 },
    { title: "Active", value: 5 },
    { title: "Very active", value: 6 },
    { title: "Extra active", value: 7 },
  ];

  const changeHanlder = (title: string, value: number) => {
    if (selected !== value) {
      onSelect(value);
      setItem({ title, value });
    }
    console.log(value);
    setShow(!show);
  };

  useEffect(() => {
    if (selected) {
      const res = options.filter((val) => val.value == selected);
      if (res.length) setItem({ ...res[0] });
    }
  }, []);

  return (
    <View>
      <Pressable disabled={disabled} onPress={() => setShow(!show)}>
        <View
          style={[
            styles.container,
            { borderColor: !selected && required ? Col.Error : Col.Inactive },
          ]}
        >
          <Text type="body2">{item.title}</Text>
          <Icon name={show ? "arrow-drop-up" : "arrow-drop-down"} size={20} />
        </View>
      </Pressable>
      {show ? (
        <View style={styles.options}>
          <ScrollView>
            {options.map(({ title, value }, index) => (
              <TouchableOpacity
                key={title + index}
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
