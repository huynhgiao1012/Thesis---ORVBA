import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from './theme';
import {Rating} from 'react-native-ratings';
import {useGetAllFbMutation} from '../services/Feedback';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListItem({item}) {
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
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GarageDetail', {
          id: item.id,
          distance: item.distance,
        })
      }
      key={item.id}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: themeColors.gray,
          marginVertical: 10,
        }}>
        <View>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 20,
              color: themeColors.primaryColor7,
            }}>
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
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
            <Text
              style={{
                fontSize: 18,
                color: themeColors.primaryColor4,
                fontWeight: 'bold',
              }}>
              {item.distance}
            </Text>
          </View>
          <View style={styles.content}>
            <Icon name="map-marker" size={24} color="red" />
            <Text style={[styles.content_text, {fontStyle: 'italic'}]}>
              {item.address}
            </Text>
          </View>
          <View style={styles.content}>
            <Icon name="clock-o" size={18} color={themeColors.primaryColor7} />
            <Text style={styles.content_text}>
              {item.openTime} - {item.closeTime}
            </Text>
          </View>
          <View style={styles.content}>
            <Icon name="envelope" size={16} color={themeColors.primaryColor7} />
            <Text style={styles.content_text}>{item.email}</Text>
          </View>
          <View style={styles.content}>
            <Icon name="phone" size={20} color={themeColors.primaryColor7} />
            <Text style={styles.content_text}>{item.phoneNo}</Text>
          </View>
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => openDialScreen(item.phoneNo)}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: themeColors.primaryColor4,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              marginVertical: 5,
            }}>
            <Text style={[styles.content_text, {color: themeColors.white}]}>
              CALL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: themeColors.white,
  },
  item: {
    backgroundColor: themeColors.white,
  },
  boxHeader: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  distance: {
    borderWidth: 1,
    margin: 10,
    width: 70,
    padding: 8,
    borderRadius: 10,
    borderColor: themeColors.primaryColor5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  ratingTxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    marginLeft: 5,
    color: themeColors.primaryColor8,
  },
  text: {
    color: themeColors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content_text: {
    fontSize: 16,
    color: themeColors.primaryColor7,
    fontWeight: '700',
    marginLeft: 10,
  },
});
