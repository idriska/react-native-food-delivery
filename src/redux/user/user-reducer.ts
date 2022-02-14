import {SET_USER, UPDATE_USER_ADDRESSES} from './types';
import {User} from '../../services/bucket';

export function userReducer(state: any, action: any) {
  if (action.type === SET_USER) {
    state = action.data;
    return state;
  } else if (action.type === UPDATE_USER_ADDRESSES) {
    state.address = action.data;
    return state;
  }

  return state;
}
