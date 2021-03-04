import React, { FC } from "react";
import { StyleSheet, View, Image } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing, Typ } from "./Config";
import { Text } from "./custom/Typography";
import { Divider } from "./MyComponents";
import { baseURL } from "../url";

interface editProps {
  id: number;
  name: string;
  servings: number;
  creationTime: number;
}

interface Props {
  item: {
    id: number;
    name: string;
    image: string;
    creationTime: number;
    servings: number;
    isPartner?: boolean
    source: string
  };
  onClick?: () => void;
  actionHandler: (value: editProps) => void;
  onDelete: (id: number, name: string) => void;
  bgColor: string
}

const getTime = (value: number) => {
  const Now = new Date(value);
  const Hours = Now.getHours();
  const Minutes = Now.getMinutes();
  return `${Hours < 10 ? "0" + Hours : Hours}:${
    Minutes < 10 ? "0" + Minutes : Minutes
  }`;
};

const CookedMealCard: FC<Props> = ({
  item,
  onClick,
  actionHandler,
  onDelete,
  bgColor
}) => {
  const { id, name, image, creationTime, servings, isPartner, source } = item;
  const [date, time] = creationTime.split(' ');
  return (
    <View style={{...styles.container, borderLeftColor: bgColor}}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.timeStamp} type="cap">
          {time}
        </Text>
        <View style={styles.iconsContainer}>
          <Icon
            style={{ alignSelf: "flex-end" }}
            onPress={() => onDelete(id, name, source)}
            name="delete"
            size={24}
            color={Col.Grey5}
          />
          <Divider styler={styles.verticalDivider} />
          <Icon
            style={{ alignSelf: "flex-end" }}
            onPress={() => actionHandler({ id, name, servings, creationTime: new Date(`${date.replace(/-/g, '/')} ${time}`), source})}
            name="pencil"
            size={24}
            color={Col.Grey5}
          />
        </View>
      </View>
      <Divider styler={styles.horizontalDivider} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      ></View>
      <View style={styles.imageDetails}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: image && image.slice(0, 4) === "http" ? image : `${baseURL}${image}`,
            }}
          />
        </View>
        <View style={styles.bodyContainer}>
          <Text type="cap" style={styles.recipe}>
            Recipe
          </Text>
          <Text onPress={onClick} style={styles.recipeName}>
            {name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderLeftWidth: 5,
    paddingHorizontal: Spacing.r_small,
    paddingVertical: Spacing.r_small,
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
    flex: 1,
    justifyContent: "space-around",
  },
  timeStamp: {
    //marginBottom: Spacing.tiny,
  },
  imageDetails: {
    display: "flex",
    flexDirection: "row",
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
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
    fontWeight: "normal",
  },
  recipeName: {
    textDecorationLine: "underline",
    color: Col.Dark,
    fontWeight: "normal",
    fontSize: Typ.Normal,
  },
});
export default CookedMealCard;
