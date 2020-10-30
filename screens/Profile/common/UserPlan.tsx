import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Col } from "../../../components/Config";
import Text from "../../../components/custom/Typography";

interface feild {
  label: string;
  desc: string;
}

interface Props {
  userPlan: string;
}

const Feild: FC<feild> = ({ label, desc }) => {
  return (
    <View style={styles.feildContainer}>
      <Text style={{ color: Col.Black }}>{label}</Text>
      <Text style={{ color: Col.Ghost }} type="body2">
        {desc}
      </Text>
    </View>
  );
};

const UserPlan: FC<Props> = ({ userPlan }) => {
  return (
    <View style={styles.container}>
      <Feild label="Pricing plan" desc="Free" />
      <Feild label="From" desc={userPlan} />
      <Feild label="To" desc="-" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  feildContainer: {
    flex: 1,
  },
});
export default UserPlan;
