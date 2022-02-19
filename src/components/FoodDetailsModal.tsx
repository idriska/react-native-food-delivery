import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import * as COLORS from './../styles/colors';
import {FoodCard} from '.';
import {userStore} from '../redux/store';
import {useNavigation} from '@react-navigation/native';
import {FoodDeliveryTabParams} from '../interfaces/interfaces';
import {Food} from '../services/bucket';

interface IComplete {
  food: Food;
  count: number;
}
interface FoodDetailsModalProps {
  data: Food;
  complete: (data?: IComplete) => void;
}

const FoodDetailsModal: FC<FoodDetailsModalProps> = ({data, complete}) => {
  const appNavigation = useNavigation<FoodDeliveryTabParams>();
  const [count, setCount] = useState(1);
  const [extras, setExtras] = useState<string[]>([]);
  const [removeds, setRemoveds] = useState<string[]>([]);
  let orderFood: any = {};

  useEffect(() => {
    orderFood = {
      _id: data._id,
      name: data.name,
      ingredients: data.ingredients?.map((i: any) => i.name),
      price: data.price,
      image: data.image,
    };
  });

  const updateIngredients = (name: string, _target: 'extras' | 'removeds') => {
    const target = _target == 'extras' ? extras : removeds;
    const index = target.findIndex(i => i == name);

    if (index == -1) {
      target.push(name);
    } else {
      target.splice(index, 1);
    }
    if (_target == 'extras') {
      setExtras([...target]);
    } else {
      setRemoveds([...target]);
    }
  };

  const addToBasket = () => {
    if (userStore.getState()) {
      normalizeIngredients();
      complete({food: {...orderFood}, count: count});
      orderFood = {};
    } else {
      complete();
      appNavigation.navigate('ProfileNavigator');
    }
  };

  const normalizeIngredients = () => {
    orderFood.ingredients.push(...extras);
    orderFood.ingredients = orderFood.ingredients.filter((i: string) =>
      removeds.includes(i),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.swipeLine}></View>
      <FoodCard
        data={data}
        type="choice"
        clicked={() => {}}
        changeCount={(value: number) => setCount(value)}
      />
      <View style={[styles.box, styles.flexDirectionCollumn]}>
        <Text style={styles.title}>Ingredients</Text>
        <Text>Please choose the materials that you want to remove.</Text>
        <ScrollView
          style={styles.ingredients}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {data.ingredients?.map((item: any, index: number) => (
            <TouchableOpacity
              style={[
                styles.ingredientChip,
                removeds.includes(item.name) && styles.removed,
                extras.includes(item.name) && {opacity: 0.3},
              ]}
              key={`ingredients-${index}`}
              disabled={extras.includes(item.name)}
              onPress={() => {
                updateIngredients(item.name, 'removeds');
              }}>
              <Text style={styles.ingredientText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={[styles.box, styles.flexDirectionCollumn]}>
        <Text style={styles.title}>Extra Ingredients</Text>
        <Text>Please choose the materials that you want to add.</Text>
        <ScrollView
          style={styles.ingredients}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {data.ingredients?.map((item: any, index: number) => (
            <TouchableOpacity
              style={[
                styles.ingredientChip,
                extras.includes(item.name) && styles.added,
                removeds.includes(item.name) && {opacity: 0.3},
              ]}
              key={`ingredients-${index}`}
              disabled={removeds.includes(item.name)}
              onPress={() => {
                updateIngredients(item.name, 'extras');
              }}>
              <Text style={styles.ingredientText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.addToBasketBtn}
        onPress={() => addToBasket()}>
        <Text style={styles.btnText}>Add To Basket</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoodDetailsModal;

const styles = StyleSheet.create({
  container: {
    height: 570,
    backgroundColor: COLORS.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 15,
  },
  swipeLine: {
    alignSelf: 'center',
    width: 80,
    height: 2,
    borderRadius: 100,
    backgroundColor: COLORS.HELPER_GRAY,
    marginBottom: 15,
  },
  box: {
    justifyContent: 'space-between',
    width: '100%',
    height: 150,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.HELPER_GRAY,
    borderRadius: 10,
    marginVertical: 5,
  },
  top: {
    justifyContent: 'flex-start',
    height: 120,
    marginTop: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 5,
    marginRight: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  ingredients: {
    maxHeight: 35,
  },
  ingredientChip: {
    backgroundColor: COLORS.HELPER_GRAY,
    borderRadius: 30,
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginRight: 7,
  },
  ingredientText: {
    color: COLORS.PRIMARY,
  },
  foodDetails: {
    justifyContent: 'space-between',
  },
  propertie: {
    marginRight: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexDirectionCollumn: {
    flexDirection: 'column',
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  addToBasketBtn: {
    alignSelf: 'center',
    marginTop: 20,
    height: 45,
    width: 170,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.WHITE,
    fontWeight: '500',
  },
  count: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  added: {
    backgroundColor: COLORS.HELPER_TURQUOISE,
  },
  removed: {
    backgroundColor: COLORS.HELPER_RED,
  },
});
