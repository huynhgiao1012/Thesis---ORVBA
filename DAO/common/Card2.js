import React, {memo, useEffect, useState} from 'react';
import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {
  INNER_CARD_HEIGHT,
  INNER_CARD_WIDTH,
  OUTER_CARD_HEIGHT,
  OUTER_CARD_WIDTH,
} from '../utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {themeColors} from './theme';
import {useGetAllFbMutation} from '../services/Feedback';
import {useNavigation} from '@react-navigation/native';

const Card2 = ({item}) => {
  const navigation = useNavigation();
  const [getAllFb] = useGetAllFbMutation();
  const [totalRatings, setTotalRating] = useState(0);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    getAllFb({id: item.id})
      .unwrap()
      .then(payload => {
        if (payload.data.length > 0) {
          setTotalRating(payload.data.length);
          let num = 0;
          payload.data.map(val => {
            num = val.rating + num;
          });
          setRating(num / payload.data.length);
        }
      });
  }, []);
  const openDialScreen = num => {
    if (Platform.OS === 'ios') {
      number = `telprompt:${num}`;
    } else {
      number = `tel:${num}`;
    }
    Linking.openURL(number);
  };
  return (
    <View style={styles.outerCard}>
      <View style={styles.innerCard}>
        <Text numberOfLines={2} style={styles.name}>
          {item.title}
        </Text>
        <View style={styles.rating}>
          <Rating
            ratingCount={rating}
            type="star"
            readonly={true}
            startingValue={rating || 0}
            imageSize={14}
          />
          <Text style={styles.ratingTxt}>
            {rating || 0} ({totalRatings || 0} Ratings)
          </Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.status}>Distance</Text>
          <Text style={styles.status2}>{item?.distance}</Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.status}>Address</Text>
          <Text style={styles.status2}>{item.address}</Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.status}>Email</Text>
          <Text style={styles.status2}>{item.email}</Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.status}>Phone</Text>
          <Text style={styles.status2}>{item.phoneNo}</Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.status}>Time</Text>
          <Text style={styles.status2}>
            {item?.openTime} - {item?.closeTime}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => openDialScreen(item?.phoneNo)}
            style={{
              borderRadius: 10,
              paddingHorizontal: 8,
              marginTop: 2,
              backgroundColor: themeColors.primaryColor,
              alignSelf: 'flex-end',
              marginRight: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                padding: 3,
                color: themeColors.white,
                fontWeight: '700',
              }}>
              CALL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              paddingHorizontal: 8,
              marginTop: 2,
              backgroundColor: themeColors.primaryColor7,
              alignSelf: 'flex-end',
            }}
            onPress={() =>
              navigation.navigate('GarageDetail', {
                id: item.id,
                distance: item.distance,
              })
            }>
            <Text
              style={{
                fontSize: 14,
                padding: 3,
                color: themeColors.white,
                fontWeight: '700',
              }}>
              VIEW
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerCard: {
    flex: 1,
    width: OUTER_CARD_WIDTH,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  innerCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: INNER_CARD_WIDTH,
    overflow: 'hidden',
    elevation: 6,
    padding: 10,
    borderLeftWidth: 10,
    borderLeftColor: themeColors.primaryColor,
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: themeColors.primaryColor4,
    fontWeight: '700',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  ratingTxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12.5,
    marginLeft: 5,
    color: themeColors.primaryColor2,
  },
  status: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: themeColors.primaryColor7,
    fontWeight: 'bold',
    width: 60,
    marginRight: 3,
    borderRightWidth: 1,
    borderRightColor: themeColors.primaryColor6,
    borderStyle: 'dashed',
  },
  status2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: themeColors.primaryColor8,
    fontStyle: 'italic',
    width: 240,
    marginLeft: 5,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 3,
  },
});

export default memo(Card2);
