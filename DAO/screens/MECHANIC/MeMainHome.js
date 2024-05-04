import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  Linking,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../../common/theme';
import {useGetUserDetailMutation} from '../../services/User';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import {useReverseGeoMutation} from '../../services/Map';
import GetLocation from 'react-native-get-location';
import {
  useGetFormsMutation,
  usePickFormMutation,
  useGetGarageStaffMutation,
} from '../../services/Mechanic';
import {useNavigation} from '@react-navigation/native';
import {io} from 'socket.io-client';

export default function MeMainHome() {
  const navigation = useNavigation();
  const [getUserDetail] = useGetUserDetailMutation();
  const [reverseGeo] = useReverseGeoMutation();
  const [address, setAddress] = useState('');
  const [getForms, {isLoading}] = useGetFormsMutation();
  const [getGarageStaff] = useGetGarageStaffMutation();
  const [pickform] = usePickFormMutation();
  const [forms, setForms] = useState([]);
  const [staff, setStaff] = useState([]);
  const [data, setData] = useState({
    _id: '',
    email: '',
    isActive: false,
    name: '',
    phone: '',
    role: '',
    img: '',
  });
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 10000,
    })
      .then(location => {
        reverseGeo({latitude: location.latitude, longitude: location.longitude})
          .then(payload => {
            setAddress(payload.data.results[0].formatted_address);
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        return error;
      });
  };
  useEffect(() => {
    setForms([]);
    const socketIo = io('https://dao-applicationservice.onrender.com');
    socketIo.on('getEmergencyForm', data => {
      if (data) {
        getForms()
          .unwrap()
          .then(payload => {
            setForms([]);
            setForms(prev => [...prev, ...payload.orderForm]);
          })
          .catch(error => {
            if (error.status === 401) {
              navigation.navigate('Login');
            }
          });
      }
    });
  }, []);
  useEffect(() => {
    setForms([]);
    setStaff([]);
    getCurrentLocation();
    getUserDetail()
      .unwrap()
      .then(payload => {
        setData(data => ({
          ...data,
          ...payload.data,
        }));
      })
      .catch(error => {
        if (error.data.message === 'Token is exprired') {
          navigation.navigate('Login');
        }
      });
    getForms()
      .unwrap()
      .then(payload => {
        setForms(prev => [...prev, ...payload.orderForm]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
    getGarageStaff()
      .unwrap()
      .then(payload => {
        setStaff(prev => [...prev, ...payload.data]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, []);
  const openDialScreen = num => {
    if (Platform.OS === 'ios') {
      number = `telprompt:${num}`;
    } else {
      number = `tel:${num}`;
    }
    Linking.openURL(number);
  };
  const pickForm = id => {
    pickform({id})
      .unwrap()
      .then(payload => {
        if (payload.success) {
          Alert.alert('Pick form', payload.message, [
            {
              text: 'OK',
              onPress: () => {
                setForms([]);
                getForms()
                  .unwrap()
                  .then(payload => {
                    setForms(prev => [...prev, ...payload.orderForm]);
                  })
                  .catch(error => {
                    if (error.status === 401) {
                      navigation.navigate('Login');
                    }
                  });
              },
            },
          ]);
        } else {
          Alert.alert('Pick form', payload.message, [
            {
              text: 'OK',
            },
          ]);
        }
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: themeColors.white}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 50,
          paddingHorizontal: 20,
          backgroundColor: themeColors.primaryColor,
          height: 170,
        }}>
        <View style={{}}>
          <Text
            style={{
              alignSelf: 'flex-start',
              color: themeColors.white,
              fontSize: 32,
              fontWeight: 'bold',
            }}>
            Welcome home
          </Text>
          <Text
            style={{
              alignSelf: 'flex-start',
              color: themeColors.white,
              fontSize: 18,
              fontWeight: '600',
            }}>
            {data.name}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Image
            source={require('../../assets/mechanic.png')}
            style={{width: 150, height: 150}}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: themeColors.white,
          position: 'absolute',
          top: 110,
          width: '100%',
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            borderBottomColor: themeColors.primaryColor5,
            borderBottomWidth: 2,
            borderStyle: 'dotted',
            paddingBottom: 20,
          }}>
          <Icon name="map-marker" size={25} color="red" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: themeColors.primaryColor7,
              paddingLeft: 10,
              fontStyle: 'italic',
            }}>
            {address}
          </Text>
        </View>
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
            borderBottomWidth: 2,
            borderStyle: 'dotted',
            borderBottomColor: themeColors.primaryColor5,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: themeColors.primaryColor7,
                fontWeight: '700',
                fontStyle: 'italic',
                marginBottom: 10,
              }}>
              Manager's Information
            </Text>
            {staff.length > 0 &&
              staff[0].manager.map((val, index) => {
                return (
                  <View>
                    <Text style={{color: themeColors.primaryColor7}}>
                      Name: {val.accountId.name}
                    </Text>
                    <Text
                      style={{
                        color: themeColors.primaryColor7,
                        marginVertical: 8,
                      }}>
                      Phone: {val.accountId.phone}
                    </Text>
                    <TouchableOpacity
                      onPress={() => openDialScreen(val.accountId.phone)}
                      style={{
                        backgroundColor: themeColors.primaryColor6,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          color: themeColors.white,
                          fontWeight: '700',
                          fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        Contact
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
          <View>
            <Text
              style={{
                color: themeColors.primaryColor7,
                marginBottom: 10,
                fontWeight: '700',
                fontStyle: 'italic',
              }}>
              Accountant's Information
            </Text>
            {staff.length > 0 &&
              staff[1].accountant.map((val, index) => {
                return (
                  <View>
                    <Text style={{color: themeColors.primaryColor7}}>
                      Name: {val.accountId.name}
                    </Text>
                    <Text
                      style={{
                        color: themeColors.primaryColor7,
                        marginVertical: 8,
                      }}>
                      Phone: {val.accountId.phone}
                    </Text>
                    <TouchableOpacity
                      onPress={() => openDialScreen(val.accountId.phone)}
                      style={{
                        backgroundColor: themeColors.primaryColor4,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          color: themeColors.white,
                          fontWeight: '700',
                          fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        Contact
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: themeColors.primaryColor7,
            marginVertical: 15,
          }}>
          TODAY'S ORDER FORMS
        </Text>

        {forms.length > 0 ? (
          <FlatList
            style={{height: 400, paddingHorizontal: 10}}
            data={forms.reverse()}
            renderItem={({item}) => {
              const date = new Date().toISOString().slice(0, 10);
              if (item.date === date) {
                return (
                  <View
                    style={{
                      paddingVertical: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottomColor: themeColors.primaryColor5,
                      borderBottomWidth: 2,
                      borderStyle: 'dotted',
                    }}>
                    <View style={{width: '75%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Icon2
                          name="clock-rotate-left"
                          size={18}
                          color={themeColors.primaryColor}
                        />
                        <Text
                          style={{
                            color: themeColors.primaryColor,
                            fontWeight: '500',
                            fontSize: 12,
                            marginLeft: 8,
                          }}>
                          {moment(
                            new Date(item.createdAt)
                              .toLocaleString('en-GB')
                              .split(', ')[0]
                              .split('/')
                              .reverse()
                              .join('-') +
                              ' ' +
                              new Date(item.createdAt)
                                .toLocaleString('en-GB')
                                .split(', ')[1],
                          ).fromNow()}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: themeColors.black,
                          fontWeight: '700',
                          fontSize: 18,
                        }}>
                        Customer's information
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: themeColors.primaryColor7,
                        }}>
                        Name: {item.customerName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: themeColors.primaryColor7,
                        }}>
                        Phone: {item.phone}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: themeColors.primaryColor7,
                        }}>
                        Address:{' '}
                        {item.address === 'Updating'
                          ? 'Updating'
                          : item.address}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => pickForm(item._id)}
                        style={{
                          backgroundColor: themeColors.primaryColor,
                          paddingVertical: 10,
                          borderRadius: 10,
                          paddingHorizontal: 10,
                          marginBottom: 10,
                        }}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: themeColors.white,
                            fontSize: 14,
                            textAlign: 'center',
                          }}>
                          PICK
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => openDialScreen(item.phone)}
                        style={{
                          backgroundColor: themeColors.primaryColor2,
                          paddingVertical: 10,
                          borderRadius: 10,
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: themeColors.white,
                            fontSize: 14,
                            textAlign: 'center',
                          }}>
                          CALL
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              } else {
                return (
                  <Text
                    style={{
                      color: themeColors.white,
                      fontWeight: '700',
                      fontStyle: 'italic',
                      marginVertical: 15,
                      textAlign: 'center',
                      fontSize: 15,
                      backgroundColor: themeColors.gray,
                    }}></Text>
                );
              }
            }}
            keyExtractor={item => item._id}
          />
        ) : (
          <Text
            style={{
              color: themeColors.white,
              fontWeight: '700',
              fontStyle: 'italic',
              marginVertical: 15,
              textAlign: 'center',
              fontSize: 15,
              backgroundColor: themeColors.gray,
            }}></Text>
        )}
      </View>
    </View>
  );
}
