import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as COLORS from '../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../styles/styled-components';
import {RadioButton} from 'react-native-paper';
import {IAddress, IPaymentAction, IPaymentMethods} from '../interfaces/interfaces';


interface PaymentModalProps {
  addresses: IAddress[];
  totalPrice: number;
  currency?: string;
  paymentMethods: IPaymentMethods[];
  action: (data: IPaymentAction) => void;
}

const PaymentModal: FC<PaymentModalProps> = ({
  addresses = [],
  totalPrice = 0,
  currency = 'USD',
  paymentMethods = [],
  action,
}) => {
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].title);
  const [activeAddress, setActiveAddress] = useState<number>(0);

  return (
    <View style={styles.container}>
      <View style={styles.swipeLine}></View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        {!addresses.length ? (
          <TouchableOpacity
            style={styles.addNewAddress}
            onPress={() =>
              action({
                value: 'newAddress',
                data: {
                  addressIndex: activeAddress,
                  paymentMethod: paymentMethod,
                },
              })
            }>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={COLORS.HELPER_ORANGE}
            />
            <Text style={styles.addAddressText}>ADD NEW ADDRESS</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.addNewAddressNotEmpty}
              onPress={() =>
                action({
                  value: 'newAddress',
                  data: {
                    addressIndex: activeAddress,
                    paymentMethod: paymentMethod,
                  },
                })
              }>
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={COLORS.HELPER_ORANGE}
              />
              <Text style={styles.addAddressText}>ADD NEW ADDRESS</Text>
            </TouchableOpacity>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {addresses.map((item, index: number) => (
                <TouchableOpacity
                  key={`addres-${index}`}
                  style={[
                    styles.addressContainer,
                    activeAddress === index && styles.activeAddress,
                  ]}
                  onPress={() => setActiveAddress(index)}>
                  {activeAddress === index && (
                    <View style={styles.addressCheck}>
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={COLORS.WHITE}
                      />
                    </View>
                  )}
                  <Text style={styles.addressTitle}>{item.title}</Text>
                  <Text>{item.full_address}</Text>
                  <Text>{item.phone}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <RadioButton.Group
          onValueChange={value => setPaymentMethod(value)}
          value={paymentMethod}>
          {paymentMethods.map((item, index: number) => (
            <RadioButton.Item
              label={item.title}
              value={item.title}
              key={`radiobtn-${index}`}
            />
          ))}
        </RadioButton.Group>
      </View>

      <View style={styles.priceContainer}>
        <View style={{justifyContent: 'center'}}>
          <Text>Amount to be paid</Text>
          <Text style={styles.price}>
            {totalPrice} {currency}
          </Text>
        </View>
        <CustomButton
          style={{height: 45, marginTop: 15}}
          contentStyle={{height: 45, width: 100}}
          mode="contained"
          onPress={() =>
            action({
              value: 'pay',
              data: {
                addressIndex: activeAddress,
                paymentMethod: paymentMethod,
              },
            })
          }>
          PAY
        </CustomButton>
      </View>
    </View>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  container: {
    height: 580,
    paddingTop: 15,
    backgroundColor: COLORS.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  swipeLine: {
    alignSelf: 'center',
    width: 80,
    height: 2,
    borderRadius: 100,
    backgroundColor: COLORS.HELPER_GRAY,
    marginBottom: 15,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  addNewAddress: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 200,
    height: 90,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.HELPER_ORANGE,
    borderStyle: 'dotted',
    backgroundColor: COLORS.HELPER_LIGHT_ORANGE,
  },
  addNewAddressNotEmpty: {
    flexDirection: 'row',
  },
  addAddressText: {
    color: COLORS.HELPER_ORANGE,
    marginLeft: 5,
    marginBottom: 20,
  },
  priceContainer: {
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressContainer: {
    width: 200,
    height: 130,
    backgroundColor: COLORS.HELPER_GRAY,
    borderRadius: 15,
    marginRight: 20,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 15,
  },
  activeAddress: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 3,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  addressCheck: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.HELPER_ORANGE,
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 13,
    borderBottomRightRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
});
