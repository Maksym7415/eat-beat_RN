import React, { FC, useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Col, Spacing } from "./Config";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import SvgMaker from "./SvgMaker";
import { Text } from "../components/custom/Typography";
import { Divider } from "./MyComponents";

interface dataArray {
  name: string;
  value: number;
}

interface Props {
  title: string;
  icon_type: string;
  data: dataArray[];
  styler?: object;
}

const Collapse: FC<Props> = ({ title, styler, icon_type, data }) => {
  const [arrow, setArrow] = useState(false);
  return (
    <TouchableWithoutFeedback
      disabled={!data.length}
      onPress={() => setArrow(!arrow)}
    >
      <View style={styles.container}>
        <View style={styles.collapseClosed}>
          <View style={styles.icon}>
            <SvgMaker name={icon_type} />
            <Text type="bodyBold" style={[styler, styles.text]}>
              {title}
            </Text>
          </View>
          <Icon
            name={arrow ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            color={Col.Grey1}
            size={24}
          />
        </View>
        {arrow ? (
          <View>
            <Divider styler={styles.collapseDivider} />
            {data.map((item) => (
              <View key={item.name} style={{ flexDirection: "row" }}>
                <Text style={styles.collapseText}>{item.name}</Text>
                <Divider styler={styles.verticalDivider} />
                <Text style={styles.collapseText}>{`${
                  item.value || 0
                } %`}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flexDirection: "column",
    backgroundColor: Col.White,
    marginVertical: Spacing.tiny,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.small,
  },
  collapseClosed: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    marginLeft: Spacing.small,
  },
  collapseDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Col.Grey3,
    marginVertical: Spacing.small,
  },
  verticalDivider: {
    marginRight: 15,
    borderLeftWidth: 1,
    borderLeftColor: Col.Grey3,
  },
  collapseText: {
    width: "50%",
    marginBottom: 6,
    color: Col.Grey,
  },
});
export default Collapse;
