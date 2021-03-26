import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppContext } from "../../components/AppContext";
import { Col, Spacing, Typ } from "../../components/Config";
import AppBackend from '../../components/BackendSwitcher/store'


const UserCard = ({ color, isDrawer }) => {
  const { myData } = useContext(AppContext);
  return (
    <View style={[styles.container, { backgroundColor: color, flexDirection: isDrawer ? 'row' : 'column' }]}>
      <Image
        style={styles.image}
        source={{
          uri:
            AppBackend.getBaseUrl() + myData.userAvatar,
        }}
      />
      {isDrawer ?
        (
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{myData.name}</Text>
            <Text style={{color: Col.White}}>{myData.email}</Text>
          </View>
        ) :
        (
          <Text style={styles.text}>{myData.email}</Text>
        )
      }
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
  textContainer: {
    justifyContent: 'center',
    paddingLeft: Spacing.small,
  },
  nameText: {
    color: Col.White,
    fontSize: Typ.Normal,
    fontWeight: 'bold'
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
