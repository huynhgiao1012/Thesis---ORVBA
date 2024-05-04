import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header2 from '../../common/Header2';
import {themeColors} from '../../common/theme';
import {useGetCustomerPointMutation} from '../../services/Customer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function LoyalCustomer() {
  const navigation = useNavigation();
  const [getCustomerPoint] = useGetCustomerPointMutation();
  const [point, setPoint] = useState({
    _id: '',
    isVIP: false,
    point: 0,
  });
  useEffect(() => {
    getCustomerPoint()
      .unwrap()
      .then(payload =>
        setPoint(data => ({
          ...data,
          ...payload.data,
        })),
      )
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, []);
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <Header2 name="Loyal Customer" />
      <Image
        source={require('../../assets/award.gif')}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          marginVertical: 20,
        }}
      />
      {point.isVIP === true ? (
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: themeColors.white,
              backgroundColor: themeColors.yellow,
              margin: 20,
              padding: 10,
              borderRadius: 10,
            }}>
            VIP ACCOUNT
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              borderBottomWidth: 1,
              borderBottomColor: themeColors.gray,
            }}>
            <View
              style={{
                backgroundColor: themeColors.primaryColor,
                padding: 20,
                borderTopLeftRadius: 50,
                borderBottomRightRadius: 50,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: themeColors.white,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                CURRENT POINT
              </Text>
              <Text
                style={{
                  color: themeColors.white,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                0
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '70%',
                  paddingHorizontal: 10,
                  borderRightWidth: 2,
                  borderRightColor: themeColors.primaryColor5,
                  borderStyle: 'dashed',
                }}>
                <Text
                  style={{
                    color: themeColors.black,
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  DISCOUNT
                </Text>
                <Text
                  style={{
                    color: themeColors.gray60,
                    marginVertical: 10,
                    fontSize: 16,
                    fontWeight: '500',
                    fontStyle: 'italic',
                  }}>
                  for next payment (applied to all services)
                </Text>
              </View>
              <View style={{width: '25%', paddingHorizontal: 10}}>
                <Text
                  style={{
                    color: themeColors.black,
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  5%
                </Text>
                <Icon
                  name="credit-card-alt"
                  size={50}
                  color={themeColors.primaryColor}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: themeColors.white,
              backgroundColor: themeColors.primaryColor2,
              margin: 20,
              padding: 10,
              borderRadius: 10,
            }}>
            STANDARD ACCOUNT
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              borderBottomWidth: 1,
              borderBottomColor: themeColors.gray,
            }}>
            <View
              style={{
                backgroundColor: themeColors.primaryColor,
                padding: 20,
                borderTopLeftRadius: 50,
                borderBottomRightRadius: 50,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: themeColors.white,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                CURRENT POINT
              </Text>
              <Text
                style={{
                  color: themeColors.white,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                0
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '75%',
                  paddingHorizontal: 5,
                  borderRightWidth: 2,
                  borderRightColor: themeColors.primaryColor5,
                  borderStyle: 'dashed',
                }}>
                <Text
                  style={{
                    color: themeColors.black,
                    fontSize: 30,
                    fontWeight: 'bold',
                  }}>
                  ...
                </Text>
                <Text
                  style={{
                    color: themeColors.gray60,
                    marginVertical: 10,
                    fontSize: 16,
                    fontWeight: '500',
                    fontStyle: 'italic',
                  }}>
                  getting discount for next payments with VIP ACCOUNT
                </Text>
              </View>
              <View style={{width: '30%', paddingHorizontal: 10}}>
                <Text
                  style={{
                    color: themeColors.black,
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'justify',
                  }}>
                  5% OFF
                </Text>
                <Icon
                  name="credit-card-alt"
                  size={60}
                  color={themeColors.primaryColor}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
