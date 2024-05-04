import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeColors} from './theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
useNavigation;
export default function Header2({name}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: themeColors.white,
        borderBottomWidth: 3,
        borderBlockColor: '#e8e8e8',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="angle-left" size={35} color={themeColors.primaryColor} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '800',
          color: themeColors.primaryColor,
          marginLeft: 20,
        }}>
        {name}
      </Text>
    </View>
  );
}
