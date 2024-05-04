import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Rating} from 'react-native-ratings';
import Header2 from '../../common/Header2';
import {themeColors} from '../../common/theme';
import {useGetGarageDetailMutation} from '../../services/Garage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import {List} from 'react-native-paper';
import {useGetAllFbMutation} from '../../services/Feedback';
import {
  useGetCompanyServiceMutation,
  useGetSubServiceMutation,
} from '../../services/Service';
import Carousel from '../../common/Carousel';
import {useNavigation} from '@react-navigation/native';

export default function GarageDetail({route}) {
  const navigation = useNavigation();
  const {id, distance} = route.params;
  const [totalRatings, setTotalRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [getAllFb] = useGetAllFbMutation();
  const [feedback, setFb] = useState([]);
  const [service, setService] = useState([]);
  const [subSer, setSubSer] = useState([]);
  const [getDetail, {isLoading}] = useGetGarageDetailMutation();
  const [getCompanyService] = useGetCompanyServiceMutation();
  const [getSubService] = useGetSubServiceMutation();
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [data, setData] = useState({
    _id: '',
    address: '',
    closeTime: '',
    description: '',
    email: '',
    name: '',
    openTime: '',
    phone: '',
    img: '',
  });
  useEffect(() => {
    setFb([]);
    setService([]);
    console.log(distance);
    getDetail({id})
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
    getAllFb({id})
      .unwrap()
      .then(payload => {
        setFb(data => [...data, ...payload.data]);
        if (payload.data.length > 0) {
          setTotalRating(payload.data.length);
          let num = 0;
          payload.data.map(val => {
            num = val.rating + num;
          });
          setRating(num / payload.data.length);
        }
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
    getCompanyService({id})
      .unwrap()
      .then(payload => {
        setService(data => [...data, ...payload.data]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, []);
  const handleModal = id => {
    setSubSer([]);
    getSubService({id: id})
      .unwrap()
      .then(payload => {
        setSubSer(data => [...data, ...payload.subService]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
    setModalVisible(true);
  };
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <Header2 name="Garage Detail" />
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
      <ScrollView>
        {data.img.length > 0 && !data.img.includes('None') ? (
          <Carousel data={data.img} />
        ) : (
          <View></View>
        )}
        <View
          style={{
            margin: 20,
          }}>
          <View>
            <Text
              style={{
                color: themeColors.primaryColor,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {data.name}
            </Text>
            <View style={styles.rating}>
              <Rating
                ratingCount={rating}
                type="star"
                readonly={true}
                startingValue={rating || 0}
                imageSize={14}
              />
              <Text style={styles.ratingTxt}>
                {rating || 0} ({totalRatings || 0} Ratings)
              </Text>
            </View>
          </View>
          {/* email && phone */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Icon
                name="envelope"
                color={themeColors.primaryColor7}
                size={16}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: themeColors.primaryColor7,
                  fontWeight: '600',
                  marginLeft: 8,
                  fontStyle: 'italic',
                }}>
                {data.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Icon name="phone" color={themeColors.primaryColor7} size={20} />
              <Text
                style={{
                  fontSize: 15,
                  color: themeColors.primaryColor7,
                  fontWeight: '600',
                  marginLeft: 8,
                  fontStyle: 'italic',
                }}>
                {data.phone}
              </Text>
            </View>
          </View>
          {/* address */}
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                borderLeftWidth: 5,
                borderLeftColor: themeColors.primaryColor2,
              }}>
              <View style={{marginHorizontal: 12}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 15,
                    color: themeColors.black,
                  }}>
                  {data.address}
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    color: themeColors.primaryColor4,
                    fontStyle: 'italic',
                    marginTop: 5,
                  }}>
                  About {distance} from you
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '20%',
                paddingHorizontal: 25,
                paddingVertical: 17,
                borderLeftColor: themeColors.primaryColor5,
                borderLeftWidth: 3,
                borderStyle: 'dotted',
              }}>
              <Icon
                name="map-marker"
                color={themeColors.primaryColor}
                size={30}
              />
            </View>
          </View>
          {/* open time */}
          <View
            style={{
              borderLeftWidth: 5,
              borderLeftColor: themeColors.primaryColor2,
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderRightColor: themeColors.primaryColor5,
                borderRightWidth: 2,
              }}>
              <Icon2 name="store" color={themeColors.black} size={16} />
              <Text
                style={{
                  fontSize: 15,
                  color: themeColors.black,
                  fontWeight: '700',
                  marginHorizontal: 8,
                }}>
                Open
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: themeColors.black,
                fontWeight: '700',
                marginHorizontal: 8,
              }}>
              {data.openTime} - {data.closeTime}
            </Text>
          </View>
          {/* description */}
          <View
            style={{
              borderLeftWidth: 5,
              borderLeftColor: themeColors.primaryColor2,
              paddingHorizontal: 10,
              marginBottom: 20,
            }}>
            <List.Section>
              <List.Accordion
                title="Description"
                titleStyle={{
                  color: themeColors.black,
                  fontWeight: 'bold',
                }}
                style={{backgroundColor: '#e8e8e8'}}>
                <List.Item
                  title={data.description}
                  titleNumberOfLines={200}
                  titleStyle={{textAlign: 'justify'}}
                />
              </List.Accordion>
            </List.Section>
          </View>
          {/* services */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon name="cog" color={themeColors.primaryColor4} size={30} />
            <Text
              style={{
                fontSize: 20,
                color: themeColors.primaryColor4,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Services
            </Text>
          </View>
          {service.length > 0 &&
            service.map((val, index) => {
              return (
                <TouchableOpacity
                  onPress={() => handleModal(val._id)}
                  key={index}
                  style={{
                    marginVertical: 10,
                    backgroundColor: themeColors.primaryColor5,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: themeColors.primaryColor7,
                      fontWeight: '700',
                      fontSize: 16,
                    }}>
                    {val.serviceName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          {/* feedback */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon name="comments" color={themeColors.primaryColor4} size={26} />
            <Text
              style={{
                fontSize: 20,
                color: themeColors.primaryColor4,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Feedback
            </Text>
          </View>
          {feedback.length > 0 ? (
            feedback.map((val, index) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: '#f8f8f8',
                    paddingVertical: 15,
                    marginTop: 10,
                    borderRadius: 5,
                    marginBottom: 20,
                  }}
                  key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: themeColors.primaryColor7,
                        fontStyle: 'italic',
                        fontWeight: '700',
                      }}>
                      {val.customerId.name}
                    </Text>
                    <Rating
                      tintColor="#f8f8f8"
                      ratingCount={val.rating}
                      type="star"
                      readonly={true}
                      startingValue={val.rating || 0}
                      imageSize={16}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: themeColors.black,
                      width: '100%',
                      textAlign: 'justify',
                    }}>
                    {val.review}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: themeColors.black,
                      width: '100%',
                      textAlign: 'right',
                      fontStyle: 'italic',
                    }}>
                    {new Date(val.createdAt).toLocaleString('en-GB')}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text>No Feedbacks</Text>
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                color: themeColors.primaryColor,
                fontWeight: 'bold',
                fontSize: 18,
                marginVertical: 10,
                textAlign: 'center',
              }}>
              List Of Sub-Services
            </Text>
            <View
              style={{
                height: 240,
              }}>
              <ScrollView>
                {subSer.length > 0 ? (
                  subSer.map((val, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                          marginBottom: 10,
                          borderBottomColor: themeColors.primaryColor5,
                          borderBottomWidth: 1,
                        }}>
                        <Text
                          style={{
                            color: themeColors.black,
                            width: '8%',
                            borderRightWidth: 2,
                            borderRightColor: themeColors.primaryColor5,
                            borderStyle: 'dotted',
                            paddingVertical: 8,
                          }}>
                          {index + 1}
                        </Text>
                        <Text
                          style={{
                            color: themeColors.black,
                            width: '60%',
                            borderRightWidth: 2,
                            borderRightColor: themeColors.primaryColor5,
                            borderStyle: 'dotted',
                            paddingVertical: 8,
                            fontStyle: 'italic',
                          }}>
                          {val.subName}
                        </Text>
                        <Text
                          style={{
                            color: themeColors.black,
                            width: '25%',
                            fontWeight: 'bold',
                          }}>
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(val.subPrice)}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      color: themeColors.black,
                      width: '100%',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: 100,
                    }}>
                    This service does not have any sub-services
                  </Text>
                )}
              </ScrollView>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  ratingTxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginLeft: 5,
    color: themeColors.primaryColor8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa',
  },
  modalView: {
    width: '90%',
    height: 320,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 18,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: themeColors.primaryColor2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    color: themeColors.primaryColor7,
  },
});
