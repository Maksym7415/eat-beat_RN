import React, { useState, useEffect } from "react";
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
interface Props {
  id: number;
  name: string;
  time: string;
  servings: string;
  modalVisible: boolean;
  setModalData: ({}) => void;
  creationTime: number;
  cb: (
    creationTime: number,
    time: string,
    amount: string,
    hideModal: boolean
  ) => void;
}

interface Expr {
  [key: string]: number;
}

interface Time {
  [key: string]: {
    max: number;
    min: number;
    value: string;
  };
}

export default function EditModal({ setModalData, id, name, time: pTime, servings, modalVisible, creationTime, cb}: Props) {
    const [amount, setAmount] = useState<string>(servings)
    const p_time = pTime.split(':')
    const [time, setTime] = useState<Time>({hour: {max: 23, min: 0, value: p_time[0]}, minutes: {max: 59, min: 0, value: p_time[1]?.length === 1 ? '0' + p_time[1]: p_time[1]}})

    const changeHandler = (text: string, name: string) => {
        const value = text.split(',')
        if(name === 'amount') {
            if(value.length === 1) return setAmount(text)
            if(value[1].length > 1) {
                return setAmount(value[0] + ',' + value[1][0])
            }
            if(+value[1] % 5 !== 0 ) return setAmount(value[0])
            
            return setAmount(text)
        }
        setTime({...time, [name]: {...time[name], value:  +text >= time[name].min && +text <= time[name].max ? text : '' } })
    }

  const changePortionAmount = (mark: string) => {
    const expr: Expr = {
      minus:
        +amount.replace(/[,-]/g, ".") - 0.5 <= 0
          ? 0
          : +amount.replace(/[,-]/g, ".") - 0.5,
      plus: +amount.replace(/[,-]/g, ".") + 0.5,
    };
    setAmount(expr[mark] + "");
  };

  const hideModal = (key: boolean) => {
    setModalData((value) => ({
      ...value,
      modalVisible: false,
      id: 0,
      name: "",
      time: "",
      servings: "",
      cancel: key,
    }));
  };

  useEffect(() => {
    setAmount(servings);
    setTime({
      hour: { max: 23, min: 0, value: p_time[0] },
      minutes: { max: 59, min: 0, value: p_time[1] },
    });
  }, [id]);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text type="h6" style={{ color: "black" }}>
              {name}
            </Text>
            <View>
              <Text
                type="bodyBold2"
                style={{
                  marginBottom: 8,
                  marginTop: 16,
                }}
              >
                Servings
              </Text>
              <View style={styles.amountContainer}>
                <TouchableOpacity
                  style={{
                    ...styles.btn,
                    borderColor:
                      !isNaN(+amount) && !+amount
                        ? Col.Grey3
                        : styles.btn.borderColor,
                  }}
                  onPress={() => changePortionAmount("minus")}
                  disabled={!isNaN(+amount) && !+amount}
                >
                  <Icon
                    style={{
                      color:
                        !isNaN(+amount) && !+amount ? Col.Grey3 : Col.Green,
                    }}
                    name="minus"
                    size={24}
                  />
                </TouchableOpacity>

                <View style={styles.amountWrapper}>
                  <TextInput
                    style={styles.amount}
                    value={amount}
                    keyboardType="numeric"
                    onChangeText={(text: string) =>
                      changeHandler(text, "amount")
                    }
                  ></TextInput>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => changePortionAmount("plus")}
                >
                  <Icon style={{ color: Col.Green }} name="plus" size={24} />
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
                <View style={{ ...styles.amountWrapper, width: "48%" }}>
                  <TextInput
                    style={styles.amount}
                    keyboardType="numeric"
                    value={time.hour.value}
                    onChangeText={(text: string) => changeHandler(text, "hour")}
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
                <View style={{ ...styles.amountWrapper, width: "48%" }}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.amount}
                    value={time.minutes.value}
                    onChangeText={(text: string) =>
                      changeHandler(text, "minutes")
                    }
                  />
                </View>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <View />
              <Button
                type="text"
                label="CANCEL"
                onPress={() => hideModal(true)}
                style={{ marginVertical: 0 }}
                labelStyle={{ color: "black" }}
              />
              <Button
                type="text"
                label="OK"
                onPress={() => cb(creationTime, time, amount, hideModal, id)}
                style={{ marginVertical: 0 }}
                labelStyle={{ color: "black" }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

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
  amountContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    paddingHorizontal: 27,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: Col.Grey4,
    borderColor: Col.Green,
    borderWidth: 1.5,
    alignItems: "center",
  },
  amountWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 29,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Col.Grey4,
    borderColor: Col.Grey3,
    borderWidth: 1.5,
  },
  amount: {
    fontSize: Typ.H1,
    fontWeight: "normal",
    color: Col.Grey,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.medium,
  },
});
