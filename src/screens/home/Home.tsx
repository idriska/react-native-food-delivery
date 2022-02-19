import React, {useEffect, useState} from 'react';
import styles from './style';
import {ScrollView, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import {FoodCard, FoodDetailsModal, ScrollCategory} from '../../components';
import {getCategories, getFoods} from '../../services/DataService';
import {foodStore, basketStore} from '../../redux/store';
import {Food} from '../../services/bucket';
import {
  changeFoodCountAction,
  setBasketItemAction,
} from '../../redux/basket/actions';
import {AuthService} from '../../services/Auth';

const Home = () => {
  const authService = new AuthService();
  const [categories, setCategories] = useState<any>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>();

  useEffect(() => {
    authService.getUser();
    getCategories().then(data => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    getFoods(activeCategory != 'all' ? activeCategory : undefined);
    const foodSub = foodStore.subscribe(() => {
      setFoods(foodStore.getState() as any);
    });

    return () => {
      foodSub();
    };
  }, [activeCategory]);

  const renderFoods = () => {
    return foods.map((item, index) => (
      <FoodCard
        key={`food-${index}`}
        data={item}
        type="details"
        changeCount={() => {}}
        clicked={(food) => {
          setSelectedFood(food);
          setModalVisible(true);
        }}
      />
    ));
  };

  const addToOrder = (food: Food, count: number) => {
    const index = basketStore
      .getState()
      .foods.findIndex((f: any) => isSameFood(f, food));

    if (index != -1) {
      basketStore.dispatch(changeFoodCountAction({food, count, index}));
    } else {
      basketStore.dispatch(setBasketItemAction({...food, count}));
    }
  };

  const isSameFood = (food1: any, food2: any) => {
    return (
      food1._id == food2._id &&
      food1.ingredients.every((i: any) => food2.ingredients.includes(i)) &&
      food1.ingredients.length == food2.ingredients.length
    );
  };

  return (
    <>
      <ScrollCategory
        categories={categories}
        clicked={(value: string) => {
          setActiveCategory(value);
        }}
      />
      <ScrollView style={styles.foodContainer}>{renderFoods()}</ScrollView>
      <Modal
        isVisible={isModalVisible}
        style={{justifyContent: 'flex-end', margin: 0}}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}>
        <FoodDetailsModal
          data={selectedFood}
          complete={(data) => {
            if (data) {
              addToOrder(data.food, data.count);
            }
            setModalVisible(false);
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
