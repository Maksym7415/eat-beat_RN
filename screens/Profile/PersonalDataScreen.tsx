import React, { useState, FC, useContext } from "react";
import { View, Switch, StyleSheet, ScrollView } from "react-native";
import Text from "../../components/custom/Typography";
import server from "../../server";
import Select from "../../components/custom/Select";
import { Col, Spacing } from "../../components/Config";
import { Memo, NavProps, ProfileProps } from "../../components/interfaces";
import { Button, Divider } from "../../components/MyComponents";
import ToggleChip from "../../components/custom/ToggleChip";
import { AppContext } from "../../components/AppContext";
import InputFeild from "./common/InputFeild";

const PersonalDataScreen: FC<NavProps> = ({ navigation }) => {
  const { myData, getData } = useContext<Memo>(AppContext);
  const [feed, setFeed] = useState<ProfileProps>(myData);
  const [selected, setSelected] = useState<number>(myData.fkActivityId);
  const [disabled, setDisabled] = useState<boolean>(myData.preferences);
  const [chips, setChips] = useState<string>(myData.gender);

  const enableEditing = () => {
    setDisabled(!disabled);
  };

  const savePersonalDataHandler = async () => {
    console.log(disabled);
    const { age, height, currentWeight } = feed;
    const personalObject = {
      gender: chips,
      preferences: disabled,
    };

    if (age) Object.assign(personalObject, { age });
    if (height) Object.assign(personalObject, { height });
    if (currentWeight) Object.assign(personalObject, { currentWeight });
    if (selected) Object.assign(personalObject, { fkActivityId: selected });
    if (disabled) {
      if (age && height && currentWeight) {
        const res = await server.updateProfile(personalObject);
        if (res) getData();
      }
    } else {
      const res = await server.updateProfile(personalObject);
      if (res) getData();
    }
  };

  return (
    <View style={styles.canvas}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.toggleContainer}>
          <Text type="body" style={styles.wide}>
            Use individual infake recommendations
          </Text>
          <Switch
            trackColor={{ false: Col.Inactive, true: Col.Lemon }}
            thumbColor={Col.White}
            ios_backgroundColor="#DADDDF"
            onValueChange={enableEditing}
            value={disabled}
          />
        </View>
        <Divider />
        <View style={styles.personalContainer}>
          <View style={styles.genderContainer}>
            <Text type="body">Gender</Text>
            <View style={[styles.row, styles.wide]}>
              <ToggleChip
                title={"Male"}
                state={chips === "male"}
                onPress={() => setChips("male")}
              />
              <ToggleChip
                title={"Female"}
                state={chips === "female"}
                onPress={() => setChips("female")}
              />
            </View>
          </View>
          <InputFeild
            label="Age"
            onChange={(value) => setFeed({ ...feed, age: Number(value) })}
            input={feed.age}
            required={disabled}
            suffix="years"
          />
          <InputFeild
            label="Height"
            onChange={(value) => setFeed({ ...feed, height: Number(value) })}
            input={feed.height}
            required={disabled}
            suffix="cm"
          />
          <InputFeild
            label="Weight"
            onChange={(value) =>
              setFeed({ ...feed, currentWeight: Number(value) })
            }
            input={feed.currentWeight}
            required={disabled}
            suffix="kg"
          />
          <View style={styles.genderContainer}>
            <Text type="body" style={styles.activityText}>
              Activity
            </Text>
            <View style={{ width: "50%" }}>
              <Select
                selected={selected}
                required={disabled}
                onSelect={(value) => setSelected(value)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: Spacing.medium }}>
        <Button
          label="SAVE CHANGES"
          onPress={savePersonalDataHandler}
          style={styles.saveBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: Col.White,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Spacing.medium,
    paddingHorizontal: Spacing.medium,
  },
  wide: {
    width: "50%",
  },
  row: {
    flexDirection: "row",
  },
  select: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  personalContainer: {
    marginVertical: Spacing.medium,
    paddingHorizontal: Spacing.medium,
  },
  genderContainer: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityText: {
    width: "50%",
    paddingTop: Spacing.medium,
  },
  saveBtn: {
    backgroundColor: Col.Grey,
  },
});
export default PersonalDataScreen;
