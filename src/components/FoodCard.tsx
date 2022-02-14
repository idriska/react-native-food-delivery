import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import * as COLORS from './../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FoodCard = ({data, changeCount, clicked, type}: any) => {
  const [count, setCount] = useState(data.count ? data.count : 1);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (type === 'details') {
      calculateRating();
    }
  }, []);

  const calculateRating = () => {
    let temp = 0;
    data.ratings.forEach((el: any) => {
      temp += el['rating'];
    });
    temp = temp / data.ratings.length;
    setRating(temp);
  };

  const changeCountFn = (value: number) => {
    setCount(value);
    changeCount(value);
  };

  const calculateAmount = () => {
    return data.price * count;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={type != 'details' ? 1 : undefined}
      onPress={() => {
        type === 'details' && clicked(data);
      }}>
      <Image source={{uri: data.image}} style={styles.image} />
      <View style={styles.foodDetails}>
        <Text style={styles.name}>{data.name}</Text>

        {type === 'details' && (
          <>
            {rating > 0 && (
              <View style={[styles.flexDirectionRow, styles.alignItemCenter]}>
                <MaterialCommunityIcons
                  name="star"
                  size={16}
                  color="rgb(255, 196, 0)"
                />
                <Text style={styles.propertie}>{rating.toFixed(1)}</Text>
              </View>
            )}
            <View style={styles.flexDirectionRow}>
              {data.ingredients.map((item: any, index: number) => (
                <Text style={styles.ingredient} key={index}>
                  {item.name}
                </Text>
              ))}
            </View>
            <View style={styles.flexDirectionRow}>
              <View style={[styles.flexDirectionRow, styles.alignItemCenter]}>
                <Ionicons name="time-outline" size={16} />
                <Text style={styles.propertie}>
                  {data.preparation_time} min.
                </Text>
              </View>
              <View style={[styles.flexDirectionRow, styles.alignItemCenter]}>
                <MaterialCommunityIcons
                  name="lightning-bolt-outline"
                  size={16}
                />
                <Text style={styles.propertie}>{data.calories} cal.</Text>
              </View>
              <View style={[styles.flexDirectionRow, styles.alignItemCenter]}>
                <Ionicons name="ios-pricetags-outline" size={16} />
                <Text style={styles.propertie}>${data.price}</Text>
              </View>
            </View>
          </>
        )}

        {(type === 'order' || type === 'choice') && (
          <>
            <View style={styles.flexDirectionRow}>
              {data.ingredients.map((item: any, index: number) => (
                <Text style={styles.ingredient} key={index}>
                  {item.name}
                </Text>
              ))}
            </View>
            <View style={[styles.flexDirectionRow, styles.alignItemCenter]}>
              <Ionicons
                size={24}
                name="remove-circle-outline"
                onPress={() =>
                  changeCountFn(
                    count > 1 ? count - 1 : type === 'choice' ? 1 : 0,
                  )
                }
              />
              <Text style={styles.count}>{count}</Text>
              <Ionicons
                size={24}
                name="add-circle-outline"
                onPress={() => changeCountFn(count + 1)}
              />
            </View>
            <Text style={styles.propertie}>${calculateAmount()}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    height: 120,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.HELPER_GRAY,
    borderRadius: 10,
    marginVertical: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 5,
    marginRight: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  foodDetails: {
    justifyContent: 'space-between',
  },
  propertie: {
    marginRight: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  count: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  ingredient: {
    marginRight: 7,
  },
});
