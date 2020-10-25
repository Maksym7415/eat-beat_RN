import React, { FC } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Col, Spacing } from "./Config";
import { Text } from "./custom/Typography";

interface Props {
  item: {
    id: number;
    title: string;
    image: string;
  };
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
}

const CookedMealCard: FC<Props> = ({ item, onClick, onDelete }) => {
  const { id, title, image } = item;
  return (
    <View style={styles.container}>
      <View style={styles.imageDetails}>
        <Text style={styles.timeStamp} type="cap">
          09:00 AM
        </Text>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={styles.bodyContainer}>
        <Icon
          style={{ alignSelf: "flex-end" }}
          onPress={() => onDelete(id)}
          name="close"
          size={20}
          color={Col.Grey}
        />
        <Text type="cap">Recipe</Text>
        <Text>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flexDirection: "row",
    padding: Spacing.small,
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
    flexShrink: 1,
    flexDirection: "column",
    width: "100%",
  },
  timeStamp: {
    marginBottom: Spacing.tiny,
  },
  imageDetails: {
    //
  },
});
export default CookedMealCard;
