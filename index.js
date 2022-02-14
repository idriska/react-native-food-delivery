/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import FoodDeliveryTabNavigator from './src/navigation/tab-navigator';

AppRegistry.registerComponent(appName, () => FoodDeliveryTabNavigator);
