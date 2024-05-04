import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header2 from '../../common/Header2';
import {themeColors} from '../../common/theme';
export default function HelpCenter() {
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <Header2 name="Help Center" />
      <View style={{padding: 20}}>
        <Image
          source={require('../../assets/support.gif')}
          style={{width: '100%', height: 300}}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: themeColors.primaryColor4,
            marginVertical: 8,
            textAlign: 'center',
          }}>
          DO YOU NEED ANY SUPPORT ?
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: themeColors.gray60,
            fontStyle: 'italic',
            textAlign: 'center',
          }}>
          If you have any questions related to our application or our services,
          please contact us via:
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: themeColors.primaryColor7,
            textAlign: 'center',
            marginVertical: 8,
          }}>
          Email: ITITIU19012@student.hcmiu.edu.vn
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: themeColors.gray,
            fontStyle: 'italic',
            textAlign: 'center',
          }}>
          Thank you a lot for using our application.
        </Text>
      </View>
    </View>
  );
}
