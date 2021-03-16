import React, { FC, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Text from "./custom/Typography";
import { Col, Typ, Spacing } from "./Config";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Button } from "./MyComponents";
import { PropsEditModal } from './interfaces'


const newEditModal: FC<PropsEditModal> = ({
  setData,
  data,
  hideModal,
  blend = Col.Green,
  date,
  clicked,
  bg
}) => {
  const { id, name, servings, modalVisible, creationTime, source } = data;
  const handleFetch = (creationTime: string) => {
    const hrs = new Date(creationTime).getHours().toString();
    const min = new Date(creationTime).getMinutes().toString();
    return {
      hrs: hrs.length > 1 ? hrs : "0" + hrs,
      min: min.length > 1 ? min : "0" + min,
      portion: servings.toString(),
    };
  };
  const [newTime, setNewTime] = useState(handleFetch(creationTime));

  const handleSubmit = () => {
    if (clicked) return;
    const d = new Date(date);
    const hours = `${newTime.hrs}:${newTime.min}`;
    const times = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
      .split("/")
      .map((el) => (el.length === 1 ? "0" + el : el))
      .join("-");
    const format: string = times + " " + hours;
    setData(id, {
      creationTime: format,
      servings: Number(newTime.portion),
      source
    });
  };

  const editServings = (value: number) => {
    const initialValue = Number(newTime.portion);
    setNewTime({
      ...newTime,
      portion: `${initialValue + value}`,
    });
  };
  const beautifyTime = () => {
    let h = newTime.hrs.length > 1 ? newTime.hrs : "0" + newTime.hrs;
    h = +h > 23 || isNaN(+h) ? "23" : h;
    let m = newTime.min.length > 1 ? newTime.min : "0" + newTime.min;
    m = +m > 59 || isNaN(+m) ? "59" : m;
    setNewTime({
      ...newTime,
      hrs: h,
      min: m,
    });
  };

  useEffect(() => {
    setNewTime(handleFetch(creationTime));
  }, [data]);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text type="h6" style={{ color: "black" }}>
              {name}
            </Text>
            <View>
              <Text type="bodyBold2" style={styles.title}>
                Servings
              </Text>
              <View style={styles.amountContainer}>
                <TouchableOpacity
                  style={[styles.btn, { borderColor: bg || Col.Main }]}
                  onPress={() => editServings(-0.5)}
                  disabled={Number(newTime.portion) < 1}
                >
                  <Icon style={{ color: bg || Col.Main }} name="minus" size={24} />
                </TouchableOpacity>
                <View style={styles.amountWrapper}>
                  <TextInput
                    maxLength={4}
                    style={styles.amount}
                    keyboardType="numeric"
                    value={newTime.portion}
                    onChangeText={(portion) => {
                      if (!isNaN(+portion)) setNewTime({ ...newTime, portion });
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.btn, { borderColor: bg || Col.Main }]}
                  onPress={() => editServings(0.5)}
                >
                  <Icon style={{ color: bg || Col.Main }} name="plus" size={24} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text
                type="bodyBold2"
                style={{
                  marginBottom: 8,
                }}
              >
                Time
              </Text>
              <View style={styles.timeContainer}>
                <View style={[styles.amountWrapper, { width: "48%" }]}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.amount}
                    value={newTime.hrs}
                    maxLength={2}
                    onEndEditing={beautifyTime}
                    onChangeText={(hrs) => setNewTime({ ...newTime, hrs })}
                  />
                </View>
                <Text
                  style={{
                    ...styles.amount,
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  :
                </Text>
                <View style={[styles.amountWrapper, { width: "48%" }]}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.amount}
                    value={newTime.min}
                    maxLength={2}
                    onEndEditing={beautifyTime}
                    onChangeText={(min) => setNewTime({ ...newTime, min })}
                  />
                </View>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <View />
              <Button
                type="text"
                label="CANCEL"
                onPress={hideModal}
                style={{ marginVertical: 0 }}
                labelStyle={{ color: clicked ? "grey" : "black" }}
              />
              <Button
                type="text"
                label="OK"
                onPress={handleSubmit}
                style={{ marginVertical: 0 }}
                labelStyle={{ color: clicked ? "grey" : "black" }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Col.Shadow,
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.large,
  },
  modalView: {
    shadowColor: "#000",
    backgroundColor: "white",
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.r_small * 2,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
  title: {
    marginBottom: Spacing.small,
    marginTop: Spacing.medium,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    paddingHorizontal: 27,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: Col.Grey4,
    borderWidth: 1.5,
    alignItems: "center",
  },
  amountWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "7%",
    paddingVertical: Spacing.small,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Col.Grey3,
    backgroundColor: Col.Background,
  },
  amount: {
    fontSize: Typ.H1,
    fontWeight: "normal",
    color: Col.Grey,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.medium,
  },
});
export default newEditModal;
