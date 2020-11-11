import React, { FC, useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Col, Spacing } from "../../components/Config";
import { getDate } from "../../utils/date";
import { Text } from "../../components/custom/Typography";
import { AppContext } from "../../components/AppContext";
import { Memo } from "../../components/interfaces";

const CalendarButton: FC = () => {
  const { calendar, saveCal } = useContext<Memo>(AppContext);
  const { date } = calendar;
  const dateString = getDate(date);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => saveCal({ visible: true, date })}
    >
      <View style={styles.container}>
        <Text type="cap" style={styles.text}>
          {dateString.month}
        </Text>
        <Text type="bodyBold" style={styles.text}>
          {dateString.day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CalendarButton;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Col.Main,
    marginRight: Spacing.medium,
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  text: {
    color: Col.White,
  },
});
