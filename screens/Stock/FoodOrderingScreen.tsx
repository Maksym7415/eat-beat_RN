import React, { FC, useContext } from 'react';
import { View, FlatList } from 'react-native';
import { AppContext } from "../../components/AppContext";
import { Memo, NavProps } from '../../components/interfaces';
import IngredientItem from '../../components/IngredientItem';
import Text from "../../components/custom/Typography";
import { styles } from './FoodOrderingScreen.styles';

const FoodOrderingScreen: FC<NavProps> = ({ navigation }) => {
  const { ingredientsOrderList, setIngredientsOrderList } = useContext<Memo>(AppContext)
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text type={'body'} style={styles.descriptionText}>You plan to order the following items:</Text>
      </View>
      <FlatList
        style={[{flexGrow: 0}, styles.list]}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => '' + item.id}
        data={ingredientsOrderList}
        renderItem={(item) => {
          return (
            <IngredientItem
              key={`ingredient_${item.index}`}
              amount={'' + item.item.amount}
              unit={item.item.unit}
              name={item.item.name}
            />
          )
        }}
      />
      <View style={styles.description}>
        <Text type={'body'} style={styles.descriptionText}>
          This option will be available after integration with at least one supermarket!
        </Text>
      </View>
    </View>
  );
}

export default FoodOrderingScreen
