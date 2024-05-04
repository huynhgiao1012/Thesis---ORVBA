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
import {useGetUserDetailMutation} from '../../services/User';
import {useGetMePointMutation} from '../../services/Mechanic';

export default function MeProfile({route}) {
  const navigation = useNavigation();
  const [getUserDetail, {isLoading}] = useGetUserDetailMutation();
  const [getMePoint] = useGetMePointMutation();
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
    accountId: '',
    garageId: {_id: '', name: ''},
    group: '',
    isAvailable: true,
    mePoint: 0,
  });
  useEffect(() => {
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
  }, [route]);
  useEffect(() => {
    getUserDetail()
      .unwrap()
      .then(payload => {
        setData(data => ({
          ...data,
          ...payload.data,
        }));
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
    getMePoint()
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
      {/* img + name + contact */}
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
      {/* garage and group of mechanic */}
      <View style={[styles.card, styles.elevation]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: themeColors.primaryColor5,
            paddingBottom: 10,
            borderStyle: 'dashed',
          }}>
          <Icon2 name="award" color={themeColors.primaryColor4} size={27} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: themeColors.primaryColor4,
              marginLeft: 10,
            }}>
            Current point - {point.mePoint}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: themeColors.primaryColor5,
            paddingVertical: 10,
            borderStyle: 'dashed',
          }}>
          <Icon2 name="briefcase" color={themeColors.primaryColor4} size={21} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: themeColors.primaryColor4,
              marginLeft: 10,
            }}>
            {point.garageId.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <Icon2
            name="people-group"
            color={themeColors.primaryColor4}
            size={18}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: themeColors.primaryColor4,
              marginLeft: 10,
            }}>
            Group - {point.group}
          </Text>
        </View>
      </View>
      {/* button function */}
      <View style={{marginHorizontal: 20, padding: 10}}>
        <TouchableOpacity
          style={styles.line}
          onPress={() => navigation.navigate('ChangePass')}>
          <View style={{width: 30}}>
            <Icon2 name="key" size={20} color={themeColors.primaryColor7} />
          </View>
          <Text style={styles.line_text}>Change Password</Text>
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
          onPress={() => navigation.navigate('UpdateProfile')}>
          <View style={{width: 30}}>
            <Icon name="edit" size={20} color={themeColors.primaryColor7} />
          </View>
          <Text style={styles.line_text}>Update Profile</Text>
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
          onPress={() => navigation.navigate('HelpCenter')}>
          <View style={{width: 30}}>
            <Icon
              name="question-circle-o"
              size={20}
              color={themeColors.primaryColor7}
            />
          </View>
          <Text style={styles.line_text}>Help Center</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.primaryColor5,
  },
  line_text: {
    fontSize: 16,
    fontWeight: '500',
    color: themeColors.primaryColor7,
    width: 300,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '90%',
    marginHorizontal: 20,
    borderColor: themeColors.primaryColor5,
    borderWidth: 1,
  },
  elevation: {
    elevation: 10,
    shadowColor: themeColors.primaryColor4,
  },
});
