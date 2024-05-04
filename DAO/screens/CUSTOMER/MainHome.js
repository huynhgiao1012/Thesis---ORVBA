import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import GetLocation from 'react-native-get-location';
import Carousel from '../../common/Carousel';
import Card from '../../common/Card';
import {useNavigation} from '@react-navigation/native';
import {useReverseGeoMutation} from '../../services/Map';
import {useGetUserDetailMutation} from '../../services/User';
export default function MainHome() {
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [getUserDetail] = useGetUserDetailMutation();
  const [reverseGeo] = useReverseGeoMutation();
  useEffect(() => {
    getCurrentLocation();
    getUserDetail()
      .unwrap()
      .then(payload => setName(payload.data.name))
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, []);
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 10000,
    })
      .then(location => {
        console.log(location);
        reverseGeo({latitude: location.latitude, longitude: location.longitude})
          .then(payload => {
            setAddress(payload.data.results[0].formatted_address);
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        return error;
      });
  };
  return (
    <ScrollView style={{backgroundColor: themeColors.white}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: themeColors.primaryColor,
            padding: 20,
          }}>
          WELCOME HOME, {name.toUpperCase()} !
        </Text>
        <View style={{width: '100%', height: 200, alignSelf: 'center'}}>
          <Image
            source={require('../../assets/towing.gif')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={{margin: 20}}>
          <Text
            style={{
              color: themeColors.primaryColor4,
              fontWeight: '700',
              fontSize: 18,
              paddingBottom: 10,
            }}>
            Current Location
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Icon2 name="map-marker-alt" size={25} color="red" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: themeColors.primaryColor7,
                paddingLeft: 10,
                fontStyle: 'italic',
              }}>
              {address}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: themeColors.primaryColor7,
            fontWeight: '800',
            fontSize: 24,
            marginHorizontal: 20,
          }}>
          Top Services
        </Text>
        <View>
          <Text
            style={{
              fontStyle: 'italic',
              fontWeight: '500',
              color: themeColors.gray60,
              paddingHorizontal: 20,
              fontSize: 15,
            }}>
            Find the nearest garage to contact in case of an emergency or need
            maintenance
          </Text>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('EmergencyService')}>
            <Text style={styles.textBox}>Emergency</Text>
            <Icon2
              name="long-arrow-alt-right"
              size={30}
              color={themeColors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.box, {backgroundColor: themeColors.primaryColor4}]}
            onPress={() => navigation.navigate('MaintenanceService')}>
            <Text style={styles.textBox}>Maintenance</Text>
            <Icon2
              name="long-arrow-alt-right"
              size={30}
              color={themeColors.white}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: themeColors.primaryColor7,
            fontWeight: '800',
            fontSize: 22,
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          More Information
        </Text>
        <Card />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  box: {
    width: '90%',
    backgroundColor: themeColors.primaryColor4,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textBox: {
    textAlign: 'center',
    color: themeColors.white,
    fontSize: 20,
    fontWeight: '800',
  },
});
