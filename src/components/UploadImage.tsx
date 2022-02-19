import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as COLORS from '../styles/colors';
import ImagePicker from 'react-native-image-crop-picker';

interface UploadImageProps {
  completed: (data: any) => void;
}

const UploadImage: FC<UploadImageProps> = ({completed}) => {
  const uplodaImageHandle = async (value: string) => {
    let imageData: any;
    if (value === 'gallery') {
      imageData = await pickSingleWithGallery(true).catch(err => {});
    } else if (value === 'camera') {
      imageData = await pickSingleWithCamera(true);
    }
    completed(imageData);
  };

  const pickSingleWithGallery = (cropping: boolean) => {
    return ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      compressImageQuality: 0.8,
    });
  };

  const pickSingleWithCamera = (cropping: boolean) => {
    return ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      compressImageQuality: 0.8,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.modalTouchable}
        onPress={() => uplodaImageHandle('gallery')}>
        <Text style={styles.contentTitle}>Select From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalTouchable}
        onPress={() => uplodaImageHandle('camera')}>
        <Text style={styles.contentTitle}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalTouchable}
        onPress={() => uplodaImageHandle('cancel')}>
        <Text style={styles.contentTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: COLORS.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 15,
  },
  modalTouchable: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.HELPER_GRAY,
  },
  contentTitle: {
    fontSize: 16,
    color: COLORS.PRIMARY,
  },
});
