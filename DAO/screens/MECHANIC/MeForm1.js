import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createOpenLink} from 'react-native-open-maps';
import {useNavigation} from '@react-navigation/native';
import {useGetPickedFormsMutation} from '../../services/Mechanic';
import {themeColors} from '../../common/theme';
import {FlatList} from 'react-native';
import GetLocation from 'react-native-get-location';
import {useReverseGeoMutation} from '../../services/Map';
export default function MeForm1({route}) {
  const [getPickedForms, {isLoading}] = useGetPickedFormsMutation();
  const [forms, setForms] = useState([]);
  const [address, setAddress] = useState('');
  const navigation = useNavigation();
  const [reverseGeo] = useReverseGeoMutation();
  const loadData = () => {
    getPickedForms()
      .unwrap()
      .then(payload => {
        let arr = [];
        payload.orderForm.map(val => {
          const date = new Date().toISOString().slice(0, 10);
          if (val.createdAt.slice(0, 10) === date) {
            arr.push(val);
          }
        });
        setForms(prev => [...prev, ...arr]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  };
  useEffect(() => {
    setForms([]);
    loadData();
    getCurrentLocation();
  }, []);
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 10000,
    })
      .then(location => {
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
  const openDialScreen = num => {
    if (Platform.OS === 'ios') {
      number = `telprompt:${num}`;
    } else {
      number = `tel:${num}`;
    }
    Linking.openURL(number);
  };
  const renderItem = ({item}) => (
    <View
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: themeColors.primaryColor5,
          backgroundColor: themeColors.white,
          marginHorizontal: 10,
          marginVertical: 20,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          borderLeftWidth: 7,
          borderLeftColor: themeColors.primaryColor,
        },
        {
          elevation: 5,
          shadowColor: themeColors.black,
          margin: 10,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: themeColors.primaryColor,
          padding: 10,
          borderTopRightRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: themeColors.white,
          }}>
          {item.service}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: themeColors.white,
          }}>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(item.price)}
        </Text>
      </View>
      <View style={{marginVertical: 10, marginLeft: 20}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: themeColors.primaryColor2,
            fontStyle: 'italic',
          }}>
          Name: {item.customerName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: themeColors.primaryColor2,
            fontStyle: 'italic',
          }}>
          Current Address: {item.address}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: themeColors.primaryColor2,
            fontStyle: 'italic',
          }}>
          Phone: {item.phone}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: themeColors.primaryColor2,
            fontStyle: 'italic',
          }}>
          Date: {item.createdAt.slice(0, 10).split('-').reverse().join('-')}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => openDialScreen(item.phone)}
          style={{
            backgroundColor: themeColors.primaryColor6,
            padding: 10,
            borderRadius: 10,
            marginVertical: 5,
            width: '20%',
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
            Call
          </Text>
        </TouchableOpacity>
        {item.address !== 'Update' && (
          <TouchableOpacity
            onPress={createOpenLink({
              provider: 'google',
              start: `${address}`,
              end: `${item.address}`,
            })}
            style={{
              backgroundColor: themeColors.primaryColor2,
              padding: 10,
              borderRadius: 10,
              marginVertical: 5,
              width: '25%',
            }}>
            <Text
              style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
              Direction
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateForm', {id: item._id})}
          style={{
            backgroundColor: themeColors.primaryColor4,
            padding: 10,
            borderRadius: 10,
            marginVertical: 5,
            width: '40%',
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
            Update form
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      {isLoading && (
        <Modal isVisible={true} transparent={true}>
          <View
            style={{
              backgroundColor: '#000000aa',
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: '90%',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size={40} color={themeColors.primaryColor} />
            </View>
          </View>
        </Modal>
      )}
      {forms.length > 0 ? (
        <FlatList
          data={forms}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text
          style={{
            color: themeColors.primaryColor7,
            fontStyle: 'italic',
            fontWeight: '700',
            marginVertical: 20,
            textAlign: 'center',
            fontSize: 18,
          }}>
          No results
        </Text>
      )}
    </View>
  );
}
