import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {FoodDeliveryProfileStackParam} from '../interfaces/interfaces';
import MyOrders from '../screens/my-orders/MyOrders';
import Profile from '../screens/profile/Profile';

const Stack = createNativeStackNavigator<FoodDeliveryProfileStackParam>();

const FoodDeliveryProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default FoodDeliveryProfileStackNavigator;
