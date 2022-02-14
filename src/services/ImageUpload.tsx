import * as Storage from '@spica-devkit/storage';
import AsyncStorage from '@react-native-community/async-storage';

const apiUrl = "https://spica-starters-7229b.hq.spicaengine.com/api";
const apikey = "axfb9k1akx06fe2u"

const initializeStorage = async () => {
  const tokenKey = await AsyncStorage.getItem(`SpicaToken`);

  let initializeConfig;
  if (tokenKey) {
    initializeConfig = {
      publicUrl: apiUrl,
      identity: tokenKey,
    };
  } else {
    initializeConfig = {
      publicUrl: apiUrl,
      apikey: apikey,
    };
  }

  Storage.initialize(initializeConfig);
};
export const upload = (data: any) => {
  initializeStorage();
  return Storage.insert(data);
};
