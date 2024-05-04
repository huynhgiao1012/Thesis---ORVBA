import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {themeColors} from './theme';

export default function Rating() {
  return (
    <View
      style={{
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5,
      }}>
      <Icon
        name="star"
        size={14}
        color={themeColors.yellow}
        style={{paddingHorizontal: 3}}
      />
      <Icon
        name="star"
        size={14}
        color={themeColors.yellow}
        style={{paddingHorizontal: 3}}
      />
      <Icon
        name="star"
        size={14}
        color={themeColors.yellow}
        style={{paddingHorizontal: 3}}
      />
      <Icon
        name="star"
        size={14}
        color={themeColors.yellow}
        style={{paddingHorizontal: 3}}
      />
      <Icon
        name="star-half-empty"
        size={14}
        color={themeColors.yellow}
        style={{paddingHorizontal: 3}}
      />
    </View>
  );
}
