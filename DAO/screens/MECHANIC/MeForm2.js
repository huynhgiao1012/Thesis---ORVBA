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
import {useNavigation} from '@react-navigation/native';
import {useGetHoldingFormsMutation} from '../../services/Mechanic';
import {themeColors} from '../../common/theme';
import {FlatList} from 'react-native';
export default function MeForm2({route}) {
  const [getHoldingForms, {isLoading}] = useGetHoldingFormsMutation();
  const [forms, setForms] = useState([]);
  const navigation = useNavigation();
  const loadData = () => {
    getHoldingForms()
      .unwrap()
      .then(payload => {
        setForms(prev => [...prev, ...payload.orderForm]);
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
  }, []);
  // useEffect(() => {
  //   setForms([]);
  //   loadData();
  // }, [route]);
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
          margin: 10,
          borderRadius: 10,
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
          borderTopLeftRadius: 10,
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
          {item.date}
        </Text>
      </View>
      <View style={{marginVertical: 10, paddingHorizontal: 10}}>
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
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewFormDetail', {id: item._id})}
          style={{
            backgroundColor: themeColors.primaryColor2,
            padding: 10,
            borderRadius: 10,
            marginVertical: 5,
            width: '50%',
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
            View Detail
          </Text>
        </TouchableOpacity>
        <View
          style={{
            padding: 8,
            borderRadius: 10,
            marginVertical: 5,
            width: '40%',
            borderStyle: 'dotted',
            borderWidth: 2,
            borderColor: themeColors.primaryColor2,
          }}>
          <Text
            style={{
              color: themeColors.primaryColor2,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{backgroundColor: themeColors.white}}>
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
          style={{
            backgroundColor: themeColors.white,
            paddingHorizontal: 15,
            paddingBottom: 30,
          }}
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
