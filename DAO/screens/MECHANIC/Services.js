import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../../common/theme';
import {
  useGetAllServiceMutation,
  useGetCarSparesMeMutation,
  useGetSubCarSpareMeMutation,
} from '../../services/Mechanic';
import {useNavigation} from '@react-navigation/native';
import {useGetSubServiceMutation} from '../../services/Service';
useGetSubServiceMutation;
export default function Services() {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [subSer, setSubSer] = useState([]);
  const [autoPart, setAutoPart] = useState([]);
  const [subAuto, setSubAuto] = useState([]);
  const [getAllService] = useGetAllServiceMutation();
  const [getCarSparesMe] = useGetCarSparesMeMutation();
  const [getSubService] = useGetSubServiceMutation();
  const [getSubCarSpare] = useGetSubCarSpareMeMutation();
  const [text, onChangeText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setServices([]);
    setAutoPart([]);
    setSubSer([]);
    setSubAuto([]);
    setModalVisible(false);
    getAllService()
      .unwrap()
      .then(payload => {
        setServices(prev => [...prev, ...payload.carSpares]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
    getCarSparesMe()
      .unwrap()
      .then(payload => {
        setAutoPart(prev => [...prev, ...payload.carSpares]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, []);
  const handleOpen1 = id => {
    getSubService({id: id})
      .unwrap()
      .then(payload => {
        setSubSer(prev => [...prev, ...payload.subService]);
      })
      .catch(error => {
        console.log(error);
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
    setModalVisible(true);
  };
  const handleOpen2 = id => {
    getSubCarSpare({id: id})
      .unwrap()
      .then(payload => {
        setSubAuto(prev => [...prev, ...payload.carSpares]);
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
      <View
        style={{
          padding: 15,
          borderBottomWidth: 2,
          borderBottomColor: '#e8e8e8',
        }}>
        <Text
          style={{
            color: themeColors.primaryColor,
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          SERVICES & CAR-SPARES
        </Text>
      </View>
      <Text
        style={{
          color: themeColors.primaryColor7,
          fontSize: 18,
          fontWeight: '700',
          marginHorizontal: 20,
          marginVertical: 10,
          fontStyle: 'italic',
        }}>
        I. SERVICES
      </Text>
      <View style={{height: 280}}>
        <ScrollView>
          <View>
            {services.length > 0 &&
              services.map((val, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleOpen1(val._id)}
                    key={index}
                    style={{
                      padding: 15,
                      marginVertical: 10,
                      marginHorizontal: 20,
                      backgroundColor: themeColors.primaryColor6,
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: themeColors.white,
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      {val.serviceName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
      <Text
        style={{
          color: themeColors.primaryColor7,
          fontSize: 18,
          fontWeight: '700',
          marginHorizontal: 20,
          marginVertical: 10,
          fontStyle: 'italic',
        }}>
        II. CAR-SPARES
      </Text>
      <View style={{height: 280}}>
        <ScrollView>
          <View>
            {autoPart.length > 0 &&
              autoPart.map((val, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleOpen2(val._id)}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      marginVertical: 10,
                      marginHorizontal: 20,
                      borderRadius: 8,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: themeColors.primaryColor5,
                    }}>
                    <Image
                      source={{uri: val.img}}
                      style={{
                        width: 80,
                        height: 50,
                        marginRight: 20,
                      }}
                    />
                    <Text
                      style={{
                        color: themeColors.primaryColor7,
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      {val.brand}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSubAuto([]);
          setSubSer([]);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 10,
                width: '100%',
              }}>
              <TextInput
                onChangeText={text => {
                  onChangeText(text);
                }}
                placeholder="Search"
                placeholderTextColor={themeColors.gray}
                value={text}
                style={{
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  width: '85%',
                  borderRadius: 10,
                  color: themeColors.primaryColor7,
                  borderColor: themeColors.primaryColor5,
                }}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setSubAuto([]);
                  setSubSer([]);
                }}>
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
            </View>
            <View
              style={{
                height: 280,
                width: '100%',
                marginVertical: 10,
              }}>
              <ScrollView>
                <View>
                  {subSer.length > 0 ? (
                    subSer.map((val, index) => {
                      if (
                        val.subName.toUpperCase().includes(text.toUpperCase())
                      ) {
                        return (
                          <TouchableOpacity
                            onPress={() => handleOpen2(val._id)}
                            style={{
                              borderRadius: 8,
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              borderBottomColor: themeColors.primaryColor5,
                              borderBottomWidth: 1,
                            }}>
                            <Text
                              style={{
                                color: themeColors.primaryColor7,
                                fontWeight: '700',
                                fontSize: 15,
                                width: '15%',
                                padding: 10,
                              }}>
                              {index + 1}
                            </Text>
                            <Text
                              style={{
                                color: themeColors.primaryColor7,
                                fontWeight: '700',
                                fontSize: 15,
                                width: '60%',
                                borderRightWidth: 2,
                                borderLeftWidth: 2,
                                borderRightColor: themeColors.primaryColor5,
                                borderLeftColor: themeColors.primaryColor5,
                                padding: 10,
                              }}>
                              {val.subName}
                            </Text>
                            <Text
                              style={{
                                color: themeColors.primaryColor7,
                                fontWeight: '700',
                                fontSize: 15,
                                width: '30%',
                                padding: 10,
                              }}>
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(val.subPrice)}
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                    })
                  ) : subAuto.length > 0 ? (
                    subAuto.map((val, index) => {
                      if (val.name.toUpperCase().includes(text.toUpperCase())) {
                        return (
                          <TouchableOpacity
                            onPress={() => handleOpen2(val._id)}
                            style={{
                              borderRadius: 8,
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              borderBottomColor: themeColors.primaryColor5,
                              borderBottomWidth: 1,
                            }}>
                            <Text
                              style={{
                                color: themeColors.primaryColor7,
                                fontWeight: '700',
                                fontSize: 15,
                                width: '15%',
                                padding: 10,
                              }}>
                              {index + 1}
                            </Text>
                            <Text
                              style={{
                                color: themeColors.primaryColor7,
                                fontWeight: '700',
                                fontSize: 15,
                                width: '60%',
                                borderRightWidth: 2,
                                borderLeftWidth: 2,
                                borderRightColor: themeColors.primaryColor5,
                                borderLeftColor: themeColors.primaryColor5,
                                padding: 10,
                              }}>
                              {val.name}
                            </Text>
                            <Text
                              style={{
                                color: themeColors.primaryColor7,
                                fontWeight: '700',
                                fontSize: 15,
                                width: '30%',
                                padding: 10,
                              }}>
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(val.price)}
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                    })
                  ) : (
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: themeColors.black,
                        textAlign: 'center',
                      }}>
                      Do not have any data
                    </Text>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#000000aa',
    paddingHorizontal: 15,
  },
  modalView: {
    width: '100%',
    height: 400,
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 15,
  },
  button: {
    paddingHorizontal: 15,
    elevation: 2,
    borderRadius: 10,
  },
  buttonOpen: {
    backgroundColor: themeColors.white,
  },
  buttonClose: {
    backgroundColor: themeColors.primaryColor,
  },
  textStyle: {
    color: themeColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
