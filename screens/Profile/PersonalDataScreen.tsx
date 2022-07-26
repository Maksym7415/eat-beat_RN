import React, { useState, FC, useContext, useEffect, useRef } from 'react';
import { View, Switch, StyleSheet, Picker } from "react-native";
import Text from "../../components/custom/Typography";
import server from "../../server";
import Select from "../../components/custom/Select";
import { Col, Spacing } from "../../components/Config";
import {
  Fetching,
  Memo,
  NavProps,
  ProfileProps,
} from "../../components/interfaces";
import { Button, Divider } from "../../components/MyComponents";
import ToggleChip from "../../components/custom/ToggleChip";
import { AppContext } from "../../components/AppContext";
import InputFeild from "./common/InputFeild";
import { useIsFocused } from "@react-navigation/native";
import LayoutScroll from "../../components/custom/LayoutScroll";
import ACTIVITY from './activity.json'

const PersonalDataScreen: FC<NavProps> = ({ navigation }) => {
  const { myData, getData } = useContext<Memo>(AppContext);
  const [feed, setFeed] = useState<ProfileProps>(myData);
  const [selected, setSelected] = useState<number>(myData.fkActivityId);
  const [disabled, setDisabled] = useState<boolean>(myData.preferences);
  const [chips, setChips] = useState<string>(myData.gender);
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false,
  });

  const ageValueRef = useRef()
  const heightValueRef = useRef()
  const weightValueRef = useRef()

  const enableEditing = () => {
    setDisabled(!disabled);
  };

  const savePersonalDataHandler = async () => {
    const age = !!ageValueRef.current && isNaN(Number(ageValueRef.current)) ? 20 : Number(ageValueRef.current)
    const height = !!heightValueRef.current && isNaN(Number(heightValueRef.current)) ? 170 : Number(heightValueRef.current)
    const currentWeight = !!weightValueRef.current && isNaN(Number(weightValueRef.current)) ? 50 : Number(weightValueRef.current)

    const personalObject = {
      gender: chips,
      preferences: disabled,
    };

    if (age) Object.assign(personalObject, { age });
    if (height) Object.assign(personalObject, { height });
    if (currentWeight) Object.assign(personalObject, { currentWeight });
    if (selected || 1) Object.assign(personalObject, { fkActivityId: selected || 1 });
    setFetching({ clicked: true, deactivate: true });
    if (disabled) {
      if (age && height && currentWeight && chips) {
        const res = await server.updateProfile(personalObject);
        if (res) {
          getData();
        }
      }
    } else {
      const res = await server.updateProfile(personalObject);
      if (res) {
        getData();
      }
    }
    setFetching({ clicked: false, deactivate: false });
  };

  const refreshPage = () => {
    setFeed(myData);
    setChips(myData.gender);
    setDisabled(myData.preferences);
    setSelected(myData.fkActivityId);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) refreshPage();
  }, [isFocused]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.canvas}>
      <LayoutScroll>
        <View style={styles.toggleContainer}>
          <Text type="body" style={styles.wide}>
            Use individual intake recommendations
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
                required={!chips && disabled}
                title={"Male"}
                state={chips === "male"}
                onPress={() => setChips("male")}
              />
              <ToggleChip
                required={!chips && disabled}
                title={"Female"}
                state={chips === "female"}
                onPress={() => setChips("female")}
              />
            </View>
          </View>
          <InputFeild
            ref={ageValueRef}
            label="Age"
            onChange={(value) => setFeed({ ...feed, age: Number(value) })}
            limit={[18, 120]}
            input={feed.age}
            required={disabled}
            suffix="years"
          />
          <InputFeild
            ref={heightValueRef}
            label="Height"
            limit={[130, 220]}
            onChange={(value) => setFeed({ ...feed, height: Number(value) })}
            input={feed.height}
            required={disabled}
            suffix="cm"
          />
          <InputFeild
            ref={weightValueRef}
            label="Weight"
            limit={[30, 200]}
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
            <View style={[styles.picker, { width: "50%" }]}>
              <Picker
                selectedValue={selected}
                onValueChange={value => setSelected(value)}
              >
                {ACTIVITY.map((option, i) =>
                  <Picker.Item key={`picker_item_${i}`} label={option.title} value={option.value} />)}
              </Picker>
            </View>
          </View>
        </View>
        <View style={{height: 200}}/>
      </LayoutScroll>
      <View style={{ padding: Spacing.medium }}>
        <Button
          label="SAVE CHANGES"
          deactivate={fetching.deactivate}
          clicked={fetching.clicked}
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
  picker: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Col.Inactive,
  }
});
export default PersonalDataScreen;
