import {View, Text} from 'react-native';
import React from 'react';
import {themeColors} from '../../common/theme';
import TopTab from '../../common/TopTab';

export default function Form() {
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: themeColors.primaryColor4,
            fontSize: 22,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Information Line
        </Text>
      </View>
      <TopTab />
    </View>
  );
}
