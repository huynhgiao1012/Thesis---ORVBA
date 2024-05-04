import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {themeColors} from '../common/theme';
import {useNavigation} from '@react-navigation/native';

export default function Welcome() {
  const navigate = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: themeColors.bg}}>
      <View style={styles.circle}></View>
      <View style={{position: 'absolute', top: 140, alignSelf: 'center'}}>
        <Text
          style={{
            color: themeColors.primaryColor2,
            fontSize: 38,
            fontWeight: 'bold',
          }}>
          Welcome to DAO
        </Text>
        <Text
          style={{
            color: themeColors.primaryColor,
            fontSize: 16,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          ...Onroad Vehicle Breakdown Assistance...
        </Text>
        <Image
          source={require('../assets/car.gif')}
          style={{width: 300, height: 300, alignSelf: 'center'}}
        />
        <View style={{alignSelf: 'center', width: '100%', marginVertical: 10}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate.navigate('Login')}>
            <Text
              style={{
                color: themeColors.white,
                fontWeight: '800',
                textAlign: 'center',
                fontSize: 18,
              }}>
              LOGIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigate.navigate('SignUp')}>
            <Text
              style={{
                color: themeColors.primaryColor2,
                fontWeight: '800',
                textAlign: 'center',
                fontSize: 18,
              }}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.circle2}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: themeColors.primaryColor4,
    position: 'absolute',
    top: -80,
    left: -50,
  },
  circle2: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: themeColors.primaryColor4,
    position: 'absolute',
    bottom: -100,
    right: -80,
  },
  button: {
    backgroundColor: themeColors.primaryColor,
    padding: 15,
    borderRadius: 30,
  },
  button2: {
    backgroundColor: themeColors.primaryColor5,
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
  },
});
