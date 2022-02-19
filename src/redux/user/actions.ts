import {SET_USER, UPDATE_USER, UPDATE_USER_ADDRESSES} from './types';

export const setUserAction = (user: any) => {
  return {
    type: SET_USER,
    data: user,
  };
};

export const updateUserAction = (user: any) => {
  return {
    type: UPDATE_USER,
    data: user,
  };
};

export const updateUserAddressesAction = (addressArr: any) => {
  return {
    type: UPDATE_USER_ADDRESSES,
    data: addressArr,
  };
};
