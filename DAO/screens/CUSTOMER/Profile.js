import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {
  useGetCustomerDetailMutation,
  useGetCustomerPointMutation,
} from '../../services/Customer';
import {useGetFormNotFeedMutation} from '../../services/OrderForm';

export default function Profile({route}) {
  const navigation = useNavigation();
  const [getUserDetail, {isLoading}] = useGetCustomerDetailMutation();
  const [getCustomerPoint] = useGetCustomerPointMutation();
  const [getFormNotFeed] = useGetFormNotFeedMutation();
  const [feedback, setFeed] = useState([]);
  const [data, setData] = useState({
    _id: '',
    email: '',
    isActive: false,
    name: '',
    phone: '',
    role: '',
    img: '',
  });
  const [point, setPoint] = useState({
    _id: '',
    isVIP: false,
    point: 0,
  });
  useEffect(() => {
    setFeed([]);
    getUserDetail()
      .unwrap()
      .then(payload =>
        setData(data => ({
          ...data,
          ...payload.data,
        })),
      )
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
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
    getFormNotFeed()
      .unwrap()
      .then(payload => {
        setFeed(prev => [...prev, ...payload.data]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, [route]);
  const handleLogout = () => {
    navigation.navigate('Welcome');
  };
  return (
    <View style={{flex: 1, backgroundColor: themeColors.white}}>
      {isLoading && (
        <Modal isVisible={true} transparent={true}>
          <View
            style={{
              backgroundColor: '#f8f8f8aa',
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={32} color={themeColors.primaryColor} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            color: themeColors.primaryColor,
          }}>
          Profile
        </Text>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Icon name="power-off" size={25} color={themeColors.primaryColor} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          width: '95%',
          borderRadius: 30,
          paddingVertical: 20,
        }}>
        <Image
          source={{
            uri:
              data.img.length > 0
                ? data.img
                : 'https://thespiritofsaigon.net/wp-content/uploads/2022/10/avatar-vo-danh-11.jpg',
          }}
          style={{
            width: 130,
            height: 130,
            borderRadius: 100,
            alignSelf: 'center',
            borderWidth: 3,
            borderColor: themeColors.primaryColor,
          }}
        />
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            color: themeColors.primaryColor7,
            alignSelf: 'center',
            marginVertical: 10,
          }}>
          {data.name.toUpperCase()}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="envelope" color={themeColors.primaryColor7} size={20} />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              color: themeColors.primaryColor7,
            }}>
            {data.email}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            name="phone-square"
            color={themeColors.primaryColor7}
            size={20}
          />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              color: themeColors.primaryColor7,
            }}>
            {data.phone}
          </Text>
        </View>
      </View>
      <View style={styles.btn_group}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ChangePass')}>
          <Text style={styles.btn_text}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('UpdateProfile')}>
          <Text style={styles.btn_text}>Update Profile</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginHorizontal: 35,
          height: 50,
        }}>
        <View
          style={{
            backgroundColor: themeColors.white,
            padding: 15,
            alignSelf: 'center',
            backgroundColor: themeColors.primaryColor,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
            opacity: 0.9,
            height: '100%',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}>
          <Icon2 name="gift" size={20} color={themeColors.white} />
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 10,
              color: themeColors.white,
              fontWeight: '700',
            }}>
            POINT
          </Text>
        </View>
        <Text
          style={{
            width: '64%',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: '800',
            color: themeColors.primaryColor,
            borderWidth: 2,
            borderColor: themeColors.primaryColor,
            height: '100%',
            opacity: 0.9,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          {point.point}
        </Text>
      </View>
      <View style={{marginHorizontal: 20, padding: 10}}>
        <TouchableOpacity
          style={styles.line}
          onPress={() => navigation.navigate('LoyalCustomer')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View style={{width: 30}}>
              <Icon2 name="award" size={20} color={themeColors.primaryColor7} />
            </View>
            <Text style={styles.line_text}>Loyal Customer</Text>
          </View>
          <View style={{width: 30}}>
            <Icon
              name="chevron-right"
              size={15}
              color={themeColors.primaryColor5}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.line}
          onPress={() => navigation.navigate('MyFeedback')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View style={{width: 30}}>
              <Icon name="star-o" size={20} color={themeColors.primaryColor7} />
            </View>
            <Text style={styles.line_text}>My Feedbacks</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 18,
            }}>
            {console.log(feedback.length)}
            {feedback.length > 0 && (
              <View
                style={{
                  backgroundColor: 'red',
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: themeColors.white,
                  }}>
                  {feedback.length}
                </Text>
              </View>
            )}
            <Icon
              name="chevron-right"
              size={15}
              color={themeColors.primaryColor5}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.line}
          onPress={() => navigation.navigate('HelpCenter')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View style={{width: 30}}>
              <Icon
                name="question-circle-o"
                size={20}
                color={themeColors.primaryColor7}
              />
            </View>
            <Text style={styles.line_text}>Help Center</Text>
          </View>

          <View style={{width: 30}}>
            <Icon
              name="chevron-right"
              size={15}
              color={themeColors.primaryColor5}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    padding: 15,
    backgroundColor: themeColors.primaryColor4,
    borderRadius: 8,
    marginRight: 10,
    width: 160,
  },
  btn_group: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  btn_text: {
    textAlign: 'center',
    color: themeColors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.primaryColor5,
  },
  line_text: {
    fontSize: 16,
    fontWeight: '500',
    color: themeColors.primaryColor7,
  },
});
