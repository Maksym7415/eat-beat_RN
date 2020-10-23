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
    <View style={styles.container} key={id}>
      <View style={styles.imageDetails}>
        <Text>09:00</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Pressable
          style={{ alignSelf: "flex-end" }}
          onPress={() => onDelete(id)}
        >
          <Icon name="close" size={32} color={Col.Black} />
        </Pressable>
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
    backgroundColor: Col.White,
    padding: Spacing.small,
    margin: Spacing.tiny,
    overflow: "hidden",
  },
  imageContainer: {
    borderRadius: 4,
    marginRight: Spacing.large,
    width: 64,
    height: 64,
    overflow: "hidden",
  },
  bodyContainer: {
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageDetails: {},
});
export default CookedMealCard;
