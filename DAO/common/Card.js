import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeColors} from './theme';
import {useNavigation} from '@react-navigation/native';

export default function Card() {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      title: 'Maintanence Process',
      description: '',
      image: require('../assets/process.jpg'),
    },
    {
      id: 2,
      title: '5 Reasons Why You Should Use Roadside Assistance',
      description: '',
      image: require('../assets/why.jpg'),
    },
  ];
  const renderItem = () => {
    return data.map(val => {
      <View key={val.id}>
        <Text>{val.title}</Text>
      </View>;
    });
  };
  return (
    <View style={{flex: 1}}>
      {data.map(val => {
        return (
          <TouchableOpacity
            key={val.id}
            onPress={() => {
              val.id === 1
                ? navigation.navigate('MaintenanceProcess')
                : navigation.navigate('Reasons');
            }}
            style={{
              width: '90%',
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: themeColors.primaryColor5,
              borderRadius: 5,
              marginVertical: 20,
            }}>
            <Image
              source={val.image}
              style={{
                width: '100%',
                height: 180,
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <Text
              style={{
                paddingVertical: 10,
                fontSize: 16,
                fontWeight: '700',
                backgroundColor: themeColors.primaryColor6,
                textAlign: 'center',
                color: themeColors.white,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                fontStyle: 'italic',
              }}>
              {val.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
