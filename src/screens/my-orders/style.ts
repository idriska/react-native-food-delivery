import React from 'react';
import {StyleSheet} from 'react-native';
import * as COLORS from './../../styles/colors';


const styles = StyleSheet.create({
  ordersContainer: {
      padding: 10,
  },
  orderCard: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.HELPER_GRAY,
    overflow: 'hidden',
    marginBottom: 20
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.HELPER_GRAY,
    textAlignVertical: 'center',
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: '600'
  },
  content: {
    height: 150,
    paddingHorizontal: 15,
    justifyContent: 'space-evenly'
  },
  foodsContainer:{
    flexDirection: 'row'
  },
  foodName: {
    marginRight: 15
  },
  rateBtn: {
    width: 90,
    alignSelf: 'flex-end'
  }
});

export default styles;
