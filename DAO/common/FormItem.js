import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from './theme';
import {useNavigation} from '@react-navigation/native';

export default function FormItem({data}) {
  const navigation = useNavigation();
  const [dataForm, setData] = useState({
    _id: '',
    date: '',
    garageId: {_id: '', name: ''},
    phone: '',
    price: 0,
    type: '',
  });
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  useEffect(() => {
    setData(dataForm => ({
      ...dataForm,
      ...data,
    }));
  }, []);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ViewFormDetail', {id: dataForm._id})}
      style={{padding: 15, borderBottomWidth: 2, borderBottomColor: '#e8e8e8'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: themeColors.white,
            backgroundColor: themeColors.primaryColor2,
            padding: 8,
            borderRadius: 10,
            fontStyle: 'italic',
          }}>
          {dataForm.status}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: themeColors.primaryColor,
            fontStyle: 'italic',
          }}>
          Date: {dataForm.date.slice(0, 10).split('-').reverse().join('-')}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: themeColors.primaryColor4,
          }}>
          {dataForm.garageId.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: themeColors.primaryColor7,
          }}>
          PRICE: {VND.format(dataForm.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
