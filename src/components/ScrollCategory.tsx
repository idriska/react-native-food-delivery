import React, {FC, useState} from 'react';
import {StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native';
import { Category } from '../services/bucket';
import * as COLORS from '../styles/colors';

interface ScrollCategoryProps {
  categories: Category[];
  clicked: (data: string) => void;
}

const ScrollCategory: FC<ScrollCategoryProps> = ({categories, clicked}) => {
  const [active, setActive] = useState('all');

  const changedActive = (value: string) => {
    setActive(value);
    clicked(value);
  };

  return (
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
      <TouchableOpacity
        style={[styles.button, active === 'all' && styles.activeButton]}
        onPress={() => changedActive('all')}>
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, active === item._id && styles.activeButton]}
          onPress={() => changedActive(item._id as string)}>
          <Text style={styles.buttonText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ScrollCategory;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    maxHeight: 80,
  },
  button: {
    alignSelf: 'flex-start',
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.HELPER_GRAY,
  },
  activeButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  buttonText: {
    color: COLORS.WHITE,
  },
});
