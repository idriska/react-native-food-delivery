import {SET_FOODS} from './types';

export function foodReducer(state = '', action: any) {
  if (action.type === SET_FOODS) {
    state = action.data;
    return state;
  }

  return state;
}
