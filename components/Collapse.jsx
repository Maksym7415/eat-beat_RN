import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import Divider from "./Divider";
import { Col, Spacing, Typ, Weight } from "./Config";
import { MaterialIcons } from "@expo/vector-icons";
import SvgMaker from "./SvgMaker";

const alertMessages = [
  {
    title: "Total Fat",
    precent: "135%",
  },
  {
    title: "Cholesterol",
    precent: "141%",
  },
  {
    title: "Sodium",
    precent: "179%",
  },
];

export default function Collapse({ title, styler, icon_type }) {
  const [arrow, setArrow] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => setArrow(!arrow)}>
      <View style={styles.container}>
        <View style={styles.collapseClosed}>
          <View style={styles.icon}>
            <SvgMaker name={icon_type} />
            <Text style={[styler, styles.text]}>{title}</Text>
          </View>
          <MaterialIcons
            name={arrow ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            color={Col.Grey1}
            size={24}
          />
        </View>
        <View>
          {arrow && (
            <>
              <Divider styler={styles.collapseDivider} />
              {alertMessages.map((item) => (
                <View key={item.title} style={{ flexDirection: "row" }}>
                  <Text style={styles.collapseText}>{item.title}</Text>
                  <Divider styler={styles.verticalDivider} />
                  <Text style={styles.collapseText}>{item.precent}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: Col.White,
    flexDirection: "column",
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.medium,
    marginVertical: Spacing.tiny,
  },
  collapseClosed: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    flexDirection: "row",
    flex: 1,
  },
  text: {
    marginLeft: Spacing.small,
  },
  collapseDivider: {
    borderBottomColor: Col.Grey3,
    borderBottomWidth: 1,
    marginVertical: Spacing.small,
  },
  verticalDivider: {
    borderLeftWidth: 1,
    borderLeftColor: Col.Grey3,
    marginRight: 15,
  },
  collapseText: {
    width: "50%",
    marginBottom: 6,
    fontFamily: "Roboto",
    fontWeight: Weight.Normal,
    fontSize: Typ.Tiny,
    color: Col.Grey,
  },
});
