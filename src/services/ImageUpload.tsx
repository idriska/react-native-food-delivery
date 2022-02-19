import * as Storage from '@spica-devkit/storage';
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';

const apiUrl = 'https://spica-starters-7229b.hq.spicaengine.com/api';
const apikey = 'axfb9k1akx06fe2u';

const initializeStorage = async () => {
  const activeProject = await AsyncStorage.getItem('ActiveProject');
  const tokenKey = await AsyncStorage.getItem(`${activeProject}_SpicaToken`);

  let initializeConfig = {
    publicUrl: apiUrl,
    apikey: apikey,
  };
  // if (tokenKey) {
  //   initializeConfig = {
  //     publicUrl: apiUrl,
  //     identity: tokenKey,
  //   };
  // } else {
  //   initializeConfig = {
  //     publicUrl: apiUrl,
  //     apikey: apikey,
  //   };
  // }

  Storage.initialize(initializeConfig);
};

export const getBufWithMeta = async (image: any) => {
  const base64 = await toBase64(image.path);
  const file_buf = await toBuffer(base64);

  let bufWithMeta = {
    contentType: image.mime,
    data: file_buf,
    name: 'image',
  };

  return bufWithMeta;
};

export const toBase64 = async (path: string) => {
  return RNFS.readFile(path, 'base64');
};

export const toBuffer = async (base64: any) => {
  var Buffer = require('buffer/').Buffer;
  const buffer = Buffer.from(base64, 'base64');
  return buffer;
};

export const upload = (data: any, imageId = undefined) => {
  let initializeConfig = {
    publicUrl: apiUrl,
    apikey: apikey,
  };
  // initializeStorage();

  Storage.initialize(initializeConfig);

  if (imageId) {
    return Storage.update(imageId, data);
  } else {
    return Storage.insert(data).then((v: any) => (v = v[0]));
  }
};
