import React from 'react';
import {ToastAndroid} from 'react-native';

export const showToastMessage = (message: string) => {
  ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP);
};
