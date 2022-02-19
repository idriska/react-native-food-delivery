import React, {useEffect, useState} from 'react';
import {ScrollView, View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './style';
import {AddressModal, FoodCard, PaymentModal} from '../../components';
import {basketStore, userStore} from '../../redux/store';
import {Food, Order} from '../../services/bucket';
import {changeFoodCountAction} from '../../redux/basket/actions';
import Modal from 'react-native-modal';
import {insertOrder, updateUserAddresses} from '../../services/DataService';
import {showToastMessage} from '../../services/Helper';
import {useNavigation} from '@react-navigation/native';
import {FoodDeliveryTabParams} from '../../interfaces/interfaces';

const paymentMethods = [
  {title: 'Cash'},
  {title: 'Credit Card'},
  {title: 'Online'},
];

const Basket = () => {
  const appNavigation = useNavigation<FoodDeliveryTabParams>();

  const [basket, setBasket] = useState<Order>(basketStore.getState());
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    const basketSub = basketStore.subscribe(() => {
      setBasket(JSON.parse(JSON.stringify(basketStore.getState())));
    });
    return () => {
      basketSub();
    };
  }, [basket]);

  const renderBasket = () => {
    return basket.foods?.map((item, index) => (
      <FoodCard
        data={item}
        key={`order-${index}`}
        type="order"
        clicked={() => {}}
        changeCount={(count: number) => {
          addToOrder(item, count);
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
    }
  };

  const isSameFood = (food1: any, food2: any) => {
    return (
      food1._id == food2._id &&
      food1.ingredients.every((i: any) => food2.ingredients.includes(i)) &&
      food1.ingredients.length == food2.ingredients.length
    );
  };

  const handlePaymenetAction = (data: any) => {
    setShowPaymentModal(false);
    if (data.value === 'newAddress') {
      setShowAddressModal(true);
    } else if (data.value === 'pay') {
      createOrder(data.data);
    }
  };

  const saveAddress = async (addressData: any) => {
    setShowAddressModal(false);
    await updateUserAddresses(addressData);
    setShowPaymentModal(true);
  };

  const createOrder = async (data: any) => {
    let user = userStore.getState();
    basket.user = user._id;
    basket.address = user.address[data.addressIndex];
    basket.payment_method = data.paymentMethod.replace(' ', '_').toLowerCase();

    insertOrder(basket).then(() => {
      showToastMessage('Your order has been received successfully');
      appNavigation.navigate('Home');
    });
  };

  return (
    <View style={styles.container}>
      {basket.foods?.length ? (
        <>
          <ScrollView style={styles.foodContainer}>{renderBasket()}</ScrollView>
          <View style={styles.bottomTools}>
            <View>
              <Text>Total</Text>
              <Text style={styles.totalAmount}>{basket.price} USD</Text>
            </View>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => setShowPaymentModal(true)}>
              <Text style={styles.btnText}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={{
              uri: 'https://cdn.dribbble.com/users/1168645/screenshots/3152485/media/9beceb082a92006c310a72aa8e2fdfaa.png?compress=1&resize=400x300',
            }}
          />
          <Text style={styles.emptyText}>There is no food</Text>
        </View>
      )}

      <Modal
        isVisible={showPaymentModal}
        style={{justifyContent: 'flex-end', margin: 0}}
        swipeDirection="down"
        onSwipeComplete={() => setShowPaymentModal(false)}>
        <PaymentModal
          totalPrice={basket.price || 0}
          addresses={userStore.getState()?.address}
          paymentMethods={paymentMethods}
          action={(data) => handlePaymenetAction(data)}
        />
      </Modal>

      <Modal
        isVisible={showAddressModal}
        style={{justifyContent: 'flex-end', margin: 0}}
        swipeDirection="down"
        onSwipeComplete={() => setShowAddressModal(false)}>
        <AddressModal
          save={(addressData) => saveAddress(addressData)}
        />
      </Modal>
    </View>
  );
};

export default Basket;
