import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing } from "../../components/Config";

const UserCard = ({ color }) => {
  const { myData } = useContext(AppContext);
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Image
        style={styles.image}
        source={{
          uri:
            "https://logisticbrocker.hopto.org/eat-beat/" + myData.userAvatar,
        }}
      />
      <Text style={styles.text}>{myData.email}</Text>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
    paddingTop: Spacing.giant,
    backgroundColor: Col.Main,
    marginBottom: 1,
  },
  text: {
    color: Col.White,
    marginTop: Spacing.medium,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: Col.White,
  },
});
