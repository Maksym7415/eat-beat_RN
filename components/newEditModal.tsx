import React, { FC, useState } from "react";
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
interface dataProps {
  id: number;
  name: string;
  servings: number;
  creationTime: number;
  modalVisible: boolean;
}

interface Body {
  creationTime: number;
  servings: number;
}

interface Props {
  setData: (id: number, body: Body) => void;
  hideModal: () => void;
  data: dataProps;
}

const newEditModal: FC<Props> = ({ setData, data, hideModal }) => {
  const { id, name, servings, modalVisible, creationTime } = data;
  const [newTime, setNewTime] = useState({
    hrs: new Date(creationTime).getHours().toString(),
    min: new Date(creationTime).getMinutes().toString(),
    portion: servings.toString(),
  });

  const handleEdit = () => {
    const edit: Date = new Date(creationTime);
    edit.setHours(Math.round(parseInt(newTime.hrs)));
    edit.setMinutes(Math.round(parseInt(newTime.min)));
    return edit.getTime();
  };

  const handleSubmit = () => {
    setData(id, {
      creationTime: handleEdit(),
      servings: parseInt(newTime.portion),
    });
  };

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
                  style={styles.btn}
                  onPress={() =>
                    setNewTime({
                      ...newTime,
                      portion: `${+newTime.portion - 0.5}`,
                    })
                  }
                  disabled={newTime.portion === "0.5"}
                >
                  <Icon style={{ color: Col.Green }} name="minus" size={24} />
                </TouchableOpacity>

                <View style={styles.amountWrapper}>
                  <TextInput
                    style={styles.amount}
                    keyboardType="numeric"
                    value={newTime.portion}
                    onChangeText={(portion) =>
                      setNewTime({ ...newTime, portion })
                    }
                  />
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    setNewTime({
                      ...newTime,
                      portion: `${+newTime.portion + 0.5}`,
                    })
                  }
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
                <View style={[styles.amountWrapper, { width: "48%" }]}>
                  <TextInput
                    style={styles.amount}
                    keyboardType="numeric"
                    value={newTime.hrs}
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
                labelStyle={{ color: "black" }}
              />
              <Button
                type="text"
                label="OK"
                onPress={handleSubmit}
                style={{ marginVertical: 0 }}
                labelStyle={{ color: "black" }}
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
export default newEditModal;
