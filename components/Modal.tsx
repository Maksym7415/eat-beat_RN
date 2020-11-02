import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Spacing, Col } from "./Config";
import { Text } from "./custom/Typography";
import AsyncStorage from "@react-native-community/async-storage";
import doc from "../doc.json";

interface Props {
  label?: string;
  showModal?: () => void;
  modalVisible: boolean;
  content: string;
}

const ModalWindow: FC<Props> = ({
  label = "",
  content = "HealthScore",
  showModal,
  modalVisible,
}) => {
  const [desc, setDesc] = useState("");
  const getDoc = async () => {
    const data = await AsyncStorage.getItem("@doc");
    const text = data ? JSON.parse(data)[`${content}`] : doc[`${content}`];
    setDesc(text);
    return data;
  };
  useEffect(() => {
    getDoc();
  }, []);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={showModal}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={showModal}>
            <Icon name="close" size={24} color={Col.Black} />
          </TouchableOpacity>
          <Text
            type="bodyBold"
            style={{ marginBottom: Spacing.r_small, color: Col.Black }}
          >
            {label}
          </Text>
          <View style={{ flexShrink: 1 }}>
            <ScrollView fadingEdgeLength={50}>
              <Text type="body2">{desc}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const heigh = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Col.Shadow,
    paddingHorizontal: Spacing.medium,
  },
  modalView: {
    maxHeight: heigh * 0.7,
    borderRadius: 8,
    shadowColor: "#000",
    padding: Spacing.medium,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingHorizontal: Spacing.small,
  },
});
export default ModalWindow;
