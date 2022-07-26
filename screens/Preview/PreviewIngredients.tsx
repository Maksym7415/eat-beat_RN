import React, { FC, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavProps, RecipeIngredient, StockType } from '../../components/interfaces';
import server from '../../server';
import Text from '../../components/custom/Typography';
import { Col, Spacing } from '../../components/Config';
import CheckBox from '../../components/custom/CheckBox';
import LayoutScroll from '../../components/custom/LayoutScroll';
import { Button } from '../../components/MyComponents';
import RoundNumber from '../../utils/roundNumber';
import { useIsFocused } from '@react-navigation/native';

interface IngProps {
  item: {
    image: string;
    name: string;
    amount: number;
    unit: string;
    weightPerServing: {
      amount: number;
      unit: string;
    };
  };
  check: boolean
  onPress: (ingredient: Partial<RecipeIngredient>, checked: boolean) => void
}

const Ingredient = ({ item, check, onPress }: IngProps) => {
  const { image, name, unit, amount } = item;
  return (
    <TouchableOpacity
      onPress={() => onPress(item, !check)}
      style={styles.ingredient}
    >
      <CheckBox
        name={name}
        value={check}
        size={18}
        blend={Col.Dark}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: Spacing.r_small,
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: "https://spoonacular.com/cdn/ingredients_100x100/" + image,
          }}
        />
      </View>
      <Text type="h6" style={{ width: "15%" }}>
        {RoundNumber(amount)}
      </Text>
      <Text type="cap" style={{ color: Col.Grey, width: "25%" }}>
        {unit}
      </Text>
      <Text type="cap" style={{ width: "35%", flexWrap: "wrap" }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const PreviewIngredients: FC<NavProps> = ({ navigation, item }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [selected, setSelected] = useState<Partial<RecipeIngredient>[]>([])
  const onPressIngredient = (ingredient: Partial<RecipeIngredient>, checked: boolean) => {
    const items = [...selected]
    const index = items.findIndex(ing => ing.id === ingredient.id)
    if (checked) {
      if (index === -1) {
        items.push(ingredient)
      }
    } else {
      if (index > -1) {
        items.splice(index, 1)
      }
    }
    setSelected(items)
  }

  const onPressAddToShoppingList = async () => {
    if (selected.length) {
      setLoading(true)
      const success = await server.addToStocks(StockType.shoppingList, selected)
      setLoading(false)
      if (success) {
        setSelected([])
        navigation.navigate('shoppingList')
      } else {
        Alert.alert("Error", 'Unable to add selected ingredients to shopping list');
      }
    }
  }

  const onScreenFocus = useIsFocused();
  useEffect(() => {
    setSelected([])
  }, [onScreenFocus])

  return (
    <LayoutScroll style={styles.container}>
      {item.meal.ingredients.map((ele, ind) => (
        <Ingredient
          key={`_${ind}`}
          item={ele}
          onPress={onPressIngredient}
          check={!!selected.find(item => item.id === ele.id)}
        />
      ))}
      <Button
        isShow={true}
        clicked={loading}
        label="ADD SELECTED TO SHOPPING LIST"
        onPress={onPressAddToShoppingList}
        style={{ backgroundColor: Col.Recipes }}
        deactivate={selected.length === 0}
      />
    </LayoutScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Col.Background,
  },
  ingredient: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 1,
    padding: Spacing.r_small,
  },
  image: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
  },
});
export default PreviewIngredients;
