import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {userReducer} from './user/user-reducer';
import {foodReducer} from './food/food-reducer';
import {basketReducer} from './basket/basket-reducer';

const foodStore = createStore(foodReducer, applyMiddleware(thunk));
const basketStore = createStore(basketReducer, applyMiddleware(thunk));
const userStore = createStore(userReducer, applyMiddleware(thunk));

export {foodStore, basketStore, userStore};
