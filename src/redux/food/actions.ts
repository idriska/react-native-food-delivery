import {SET_FOODS} from './types';

export const setFoodsAction = (foods: any) => {
  return {
    type: SET_FOODS,
    data: foods,
  };
};
