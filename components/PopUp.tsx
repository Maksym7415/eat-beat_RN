import React, { FC } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Col, Spacing } from "./Config";
import { Text } from "./custom/Typography";
import { Button } from "./MyComponents";

interface Props {
  visible: boolean;
  header: string;
  body: string;
  onLeft: () => void;
  onRight: () => void;
  right: string;
  left?: string;
}

const PopUp: FC<Props> = ({
  visible,
  header,
  body,
  onLeft,
  onRight,
  right,
  left = "CANCEL",
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text type="bodyBold" style={{ marginBottom: Spacing.r_small }}>
            {header}
          </Text>
          <Text type="body2">{body}</Text>
          <View style={styles.btnContainer}>
            <Button
              type="text"
              style={{ paddingHorizontal: Spacing.giant }}
              labelStyle={styles.leftButton}
              onPress={onLeft}
              label={left}
            />
            <Button
              type="text"
              style={{ paddingHorizontal: Spacing.giant }}
              labelStyle={styles.rightButton}
              onPress={onRight}
              label={right}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Col.Shadow,
    paddingHorizontal: Spacing.medium,
  },
  modalView: {
    borderRadius: 8,
    shadowColor: "#000",
    padding: Spacing.large,
    paddingBottom: 0,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  leftButton: {
    color: Col.Black,
  },
  rightButton: {
    color: Col.Red,
  },
});
export default PopUp;
