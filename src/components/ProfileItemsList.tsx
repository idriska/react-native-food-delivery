import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as COLORS from '../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileItemsList = ({
  seperatedItems,
  unseperatedItems,
  canLogout = true,
  logout,
  navigateTo,
}: any) => {
  return (
    <View>
      <View style={styles.seperateSection}>
        {seperatedItems.map((item: any, index: number) => (
          <View style={styles.itemBox} key={`seperate-${index}`}>
            <Text style={[styles.item, styles.itemKey]}>{item.key}</Text>
            <Text style={[styles.item, styles.itemValue]}>{item.value}</Text>
          </View>
        ))}
      </View>
      <View>
        {unseperatedItems.map((item: any, index: number) => (
          <TouchableOpacity style={styles.itemBox} key={`unseperate-${index}`} onPress={() => navigateTo(item.navigator)}>
            <Text style={[styles.item, styles.itemKey]}>{item.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {canLogout && (
        <TouchableOpacity
          style={[styles.item, styles.itemBox, styles.logout]}
          onPress={() => logout()}>
          <Text style={styles.logoutText}>Logout</Text>
          <MaterialCommunityIcons name="logout" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileItemsList;

const styles = StyleSheet.create({
  seperateSection: {},
  itemBox: {
    flexDirection: 'row',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.HELPER_GRAY,
    fontSize: 16,
    paddingVertical: 10,
    marginTop: 7,
  },
  itemKey: {
    flex: 1,
    fontWeight: '700',
  },
  itemValue: {
    flex: 2,
    marginLeft: 15,
  },
  logout: {
    width: '100%',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 7,
  },
});
