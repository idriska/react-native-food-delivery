import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import * as COLORS from './../../styles/colors';

const {width: viewportWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodContainer: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  emptyImage: {
    height: viewportWidth * 0.8,
  },
  emptyText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  bottomTools: {
    alignSelf: 'center',
    width: viewportWidth - 20,
    position: 'absolute',
    bottom: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 50,
  },
  confirmBtn: {
    alignSelf: 'center',
    height: 45,
    width: 130,
    backgroundColor: COLORS.SUCCESS,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.WHITE,
    fontWeight: '500',
  },
});

export default styles;
