import React, { FC } from "react";
import { StyleSheet, View, Image, Pressable, BackHandler } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing, Typ, Weight } from "./Config";
import { Text } from "./custom/Typography";
import { Divider } from "./MyComponents";

interface Props {
  item: {
    id: number;
    name: string;
    image: string;
    creationTime: number;
  };
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
}

const getTime = (value: number) => {
  const Now = new Date(value);
  const Hours = Now.getHours();
  const Minutes = Now.getMinutes();
  return `${Hours < 10 ? "0" + Hours : Hours}:${
    Minutes < 10 ? "0" + Minutes : Minutes
  } ${Hours < 12 ? "AM" : "PM"}`;
};

const CookedMealCard: FC<Props> = ({ item, onClick, onDelete }) => {
  const { id, name, image, creationTime, servings } = item;
  const time = getTime(creationTime);
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.timeStamp} type="cap">{time}</Text>
        <View style={styles.iconsContainer}>
            <Icon
              style={{ alignSelf: "flex-end" }}
              onPress={() => onDelete(id)}
              name="delete"
              size={24}
              color={Col.Grey5}
            />
            <Divider
              styler={styles.verticalDivider} 
            />
            <Icon
              style={{ alignSelf: "flex-end" }}
              onPress={() => onDelete(id, name, time, servings)}
              name="pencil"
              size={24}
              color={Col.Grey5}
            />
          </View>  
      </View>
      <Divider
          styler={styles.horizontalDivider} 
        />
      <View style={styles.imageDetails}>
        <View>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <View style={styles.bodyContainer}>
          <Text type="cap" style={styles.recipe}>Recipe</Text>
          <Text style={styles.recipeName}>{name}</Text>
        </View> 
          
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: Spacing.r_small,
    paddingVertical: Spacing.small,
    backgroundColor: Col.White,
    marginVertical: Spacing.tiny,
    width: "100%",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 4,
    overflow: "hidden",
    resizeMode: "cover",
    marginRight: Spacing.large,
  },
  bodyContainer: {
    display: 'flex',
    justifyContent: 'space-around'
    // flexShrink: 1,
    // flexDirection: "column",
    // width: "100%",
  },
  timeStamp: {
    //marginBottom: Spacing.tiny,
  },
  imageDetails: {
    //
    display: 'flex',
    flexDirection: 'row'
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  verticalDivider: {
    marginRight: 15,
    marginLeft: 15,
    borderLeftWidth: 1,
    borderLeftColor: Col.Grey3,
  },
  horizontalDivider: {
    borderBottomWidth: 1,
    marginVertical: Spacing.small,
    borderBottomColor: Col.Divider,
  },
  recipe: {
    color: Col.Grey5,
    fontSize: Typ.Tiny,
    fontWeight: 'normal',
  },
  recipeName: {
    textDecorationLine: 'underline',
    color: Col.Dark,
    fontWeight: 'normal',
    fontSize: Typ.Normal
  }
});
export default CookedMealCard;
