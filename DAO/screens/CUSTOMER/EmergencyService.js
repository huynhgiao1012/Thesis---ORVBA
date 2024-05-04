import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {themeColors} from '../../common/theme';
import MapScreen from './MapScreen';
import ListScreen from './ListScreen';
import MapScreen2 from './MapScreen2';
import {useNavigation} from '@react-navigation/native';

export default function EmergencyService() {
  const navigation = useNavigation();
  const [isMap, setIsMap] = useState(true);
  const [distanceNum, setDistanceNum] = useState(0);
  const setMap = () => {
    if (isMap) {
      setIsMap(false);
    } else {
      setIsMap(true);
    }
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: themeColors.white,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={38} color={themeColors.primaryColor} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            color: themeColors.primaryColor,
            marginLeft: 20,
          }}>
          Emergency Service
        </Text>
        {isMap ? (
          <TouchableOpacity
            onPress={setMap}
            style={{
              alignSelf: 'flex-start',
            }}>
            <Icon
              name="list-ul"
              size={26}
              color={themeColors.primaryColor}
              style={{marginVertical: 5}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={setMap}
            style={{
              alignSelf: 'flex-start',
            }}>
            <Icon
              name="map"
              size={26}
              color={themeColors.primaryColor}
              style={{marginVertical: 5}}
            />
          </TouchableOpacity>
        )}
      </View>
      {isMap ? <MapScreen /> : <ListScreen />}
    </View>
  );
}
const styles = StyleSheet.create({
  bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themeColors.primaryColor6,
    paddingHorizontal: 20,
  },
  distancebar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.primaryColor,
    paddingBottom: 10,
  },
  distancebutton: {
    backgroundColor: themeColors.primaryColor2,
    width: 70,
    borderColor: themeColors.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  textButton: {
    color: themeColors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
