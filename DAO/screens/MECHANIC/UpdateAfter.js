import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useGetFormDetailMutation} from '../../services/OrderForm';
import Header2 from '../../common/Header2';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useReverseGeoMutation} from '../../services/Map';
import GetLocation from 'react-native-get-location';
import {
  useUpdateAfterMutation,
  useGetCarSparesMeMutation,
  useGetSubCarSpareMeMutation,
  useGetCustomerMutation,
} from '../../services/Mechanic';
import SelectDropdown from 'react-native-select-dropdown';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
export default function UpdateAfter({id}) {
  const navigation = useNavigation();
  const [getFormDetail, {isLoading}] = useGetFormDetailMutation();
  const [getCarSpares] = useGetCarSparesMeMutation();
  const [getSubCarSpare] = useGetSubCarSpareMeMutation();
  const [getCustomer] = useGetCustomerMutation();
  const [updateAfter, {isSuccess}] = useUpdateAfterMutation();
  const [selectedImage, setSelectedImage] = useState('');
  const [address, setAddress] = useState('');
  const [payType, setPayType] = useState('cash');
  const [totalPrice, setTotalPrice] = useState(0);
  const [visible, setVisible] = useState(false);
  const [carSpare, setCarSpare] = useState([]);
  const [subCarSpare, setSub] = useState([]);
  const [selected, setSelected] = useState([]);
  const [reverseGeo] = useReverseGeoMutation();
  const [options, setOptions] = useState([]);
  const [detail, setDetail] = useState({
    _id: '',
    address: '',
    automaker: '',
    customerName: 'Giao Le',
    date: '2023-12-22',
    garageId: {
      _id: '',
      email: '',
      name: '',
      phone: '',
    },
    imgAf: 'None',
    imgBf:
      'https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952it5dxmmoytcr9rdpvetg9r9lty2wi6jwwoso23hd&ep=v1_gifs_search&rid=200w.gif&ct=g',
    mechanicId: {
      name: 'Nguyen Van Minh',
      phone: '0735782926',
    },
    customerId: {
      _id: '',
    },
    note: '',
    payType: 'cash',
    phone: '0532169755',
    price: 500000,
    service: 'Bảo dưỡng khẩn cấp',
    status: 'process',
    time: '14:13:41',
  });
  const [point, setPoint] = useState({
    _id: '',
    accountId: '',
    isVIP: false,
    point: 0,
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
  const data = ['cash', 'transfer'];
  useEffect(() => {
    setCarSpare([]);
    setVisible(false);
    setSelected([]);
    setSelectedImage('');
    getCurrentLocation();
    getFormDetail({id: id})
      .unwrap()
      .then(payload => {
        setDetail(prev => ({...prev, ...payload.data}));
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
    getCarSpares()
      .unwrap()
      .then(payload => {
        setCarSpare(prev => [...prev, ...payload.carSpares]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, []);
  useEffect(() => {
    getCustomer({id: detail.customerId._id})
      .unwrap()
      .then(payload => {
        setPoint(prev => ({...prev, ...payload.data}));
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, [detail]);
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let str =
          'data:' +
          response.assets[0].type +
          ';' +
          'base64' +
          ',' +
          response.assets[0].base64;
        setSelectedImage(str);
      }
    });
  };
  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(response);
      }
    });
  };
  const handlePrice = () => {
    let priceAf = 0;
    if (selected.length > 0) {
      selected.map(val => {
        priceAf = priceAf + Number(val.split('-')[1].replace(/[ ₫.]+/g, ''));
      });
    }
    setTotalPrice(priceAf + detail.price);
  };
  const handleUpdate = async () => {
    if (selectedImage === '') {
      Alert.alert('Please update image after repairing');
    } else {
      let priceAf = 0;
      if (selected.length > 0) {
        selected.map(val => {
          priceAf = priceAf + Number(val.split('-')[1].replace(/[ ₫.]+/g, ''));
        });
      }
      const obj = {
        imgAf: selectedImage,
        payType: payType,
        carSpares: selected,
        price: totalPrice,
      };
      await updateAfter({id: detail._id, ...obj})
        .unwrap()
        .then(payload => {
          if (payload.success) {
            Alert.alert(payload.message);
            if (payType === 'cash') {
              navigation.navigate('MeMainHome', {loading: true});
            } else {
              navigation.navigate('QRCode', {
                id: detail.garageId._id,
                price: obj.price,
              });
            }
          }
        })
        .catch(error => {
          if (error.status === 401) {
            navigation.navigate('Login');
          }
        });
    }
  };
  const handleOpenModal = id => {
    setOptions([]);
    getSubCarSpare({id})
      .unwrap()
      .then(payload => {
        if (payload.success) {
          setSub(prev => [...prev, ...payload.carSpares]);
          const arr = payload.carSpares.map(val => {
            const obj = {
              key: val._id,
              value:
                val.name +
                ' ' +
                '-' +
                ' ' +
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(val.price),
            };
            return obj;
          });
          setOptions(prev => [...prev, ...arr]);
        }
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
    setVisible(true);
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {isLoading ? (
        <Modal isVisible={true} transparent={true}>
          <View
            style={{
              backgroundColor: '#000000aa',
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
      ) : (
        <ScrollView>
          {/* CUSTOMER INFORMATION */}
          <Text style={styles.title}>Customer's Information</Text>
          <View style={{padding: 20}}>
            <View style={styles.info}>
              <Icon
                name="vcard"
                size={20}
                color={themeColors.primaryColor7}
                style={{width: 24, textAlign: 'center'}}
              />
              <Text style={styles.content}>Name : {detail.customerName}</Text>
            </View>
            <View style={styles.info}>
              <Icon
                name="phone-square"
                size={20}
                color={themeColors.primaryColor7}
                style={{width: 24, textAlign: 'center'}}
              />
              <Text style={styles.content}>Phone : {detail.phone}</Text>
            </View>
            <View style={styles.info}>
              <Icon2
                name="map-marker-alt"
                size={20}
                color={themeColors.primaryColor7}
                style={{width: 24, textAlign: 'center'}}
              />
              <Text style={styles.content}>
                Address :{' '}
                {detail.address !== 'Updating...' ? detail.address : address}
              </Text>
            </View>
          </View>
          {/* FORM INFORMATION */}
          <Text style={styles.title}>Form Information</Text>
          <View style={{paddingHorizontal: 20}}>
            {/* IMAGE UPLOAD */}
            <Text style={styles.text2}>Image ( before repairing )</Text>
            <View style={{width: '50%', alignSelf: 'center', marginBottom: 10}}>
              <Image
                source={{
                  uri: detail.imgBf,
                }}
                style={{
                  width: '100%',
                  height: 180,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: themeColors.primaryColor5,
                  borderRadius: 20,
                  alignSelf: 'center',
                }}
              />
            </View>
            <Text style={styles.text2}>Image ( after repairing )</Text>
            <View style={{width: '50%', alignSelf: 'center', marginBottom: 10}}>
              <Image
                source={{
                  uri:
                    selectedImage.length !== 0
                      ? selectedImage
                      : 'https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg',
                }}
                style={{
                  width: '100%',
                  height: 180,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: themeColors.primaryColor5,
                  borderRadius: 20,
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={handleCameraLaunch}
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: themeColors.primaryColor7,
                  }}>
                  <Icon name="camera" size={20} color={themeColors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openImagePicker}
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: themeColors.primaryColor,
                  }}>
                  <Icon name="upload" size={20} color={themeColors.white} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.text2}>Automaker</Text>
            <TextInput
              value={detail.automaker}
              style={{
                backgroundColor: '#f8f8f8',
                color: themeColors.primaryColor7,
                fontWeight: '700',
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            />
            <Text style={styles.text2}>Service</Text>
            <TextInput
              value={detail.service}
              style={{
                backgroundColor: '#f8f8f8',
                color: themeColors.primaryColor7,
                fontWeight: '700',
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            />
            <Text style={styles.text2}>Car Spare</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {carSpare.map(val => {
                return (
                  <TouchableOpacity
                    onPress={() => handleOpenModal(val._id)}
                    key={val._id}
                    style={{
                      backgroundColor: themeColors.primaryColor2,
                      padding: 8,
                      margin: 8,
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: themeColors.white,
                        fontWeight: 700,
                        fontSize: 14,
                      }}>
                      {val.brand}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {visible && (
              <MultipleSelectList
                setSelected={val => setSelected(val)}
                data={options}
                save="value"
                onSelect={handlePrice}
                dropdownTextStyles={{
                  color: themeColors.primaryColor7,
                  fontWeight: '700',
                }}
                inputStyles={{
                  color: themeColors.primaryColor7,
                  fontWeight: '700',
                }}
                boxStyles={{marginTop: 10}}
              />
            )}
            <Text style={styles.text2}>Pay Type</Text>
            <SelectDropdown
              buttonStyle={{
                width: '100%',
                backgroundColor: '#f8f8f8',
                borderRadius: 10,
              }}
              data={data}
              onSelect={(selectedItem, index) => {
                setPayType(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            <Text style={styles.text2}>Note</Text>
            <TextInput
              value={detail.note}
              style={{
                backgroundColor: '#f8f8f8',
                color: themeColors.primaryColor7,
                fontWeight: '700',
                paddingHorizontal: 10,
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
            {point.isVIP && (
              <Text style={[styles.text3, {alignSelf: 'flex-end'}]}>
                VIP Discount (5%) : -{' '}
                {totalPrice !== 0
                  ? new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(totalPrice * 0.05)
                  : new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(detail.price * 0.05)}
              </Text>
            )}
            <Text
              style={[
                styles.text3,
                {alignSelf: 'flex-end', marginVertical: 0},
              ]}>
              VAT (5%) :{' '}
              {totalPrice !== 0
                ? new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(totalPrice * 0.05)
                : new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(detail.price * 0.05)}
            </Text>
            {point.isVIP ? (
              <Text style={[styles.text2, {alignSelf: 'flex-end'}]}>
                TOTAL PRICE :{' '}
                {totalPrice !== 0
                  ? new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(totalPrice - totalPrice * 0.1)
                  : new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(detail.price - detail.price * 0.1)}
              </Text>
            ) : (
              <Text style={[styles.text2, {alignSelf: 'flex-end'}]}>
                TOTAL PRICE :{' '}
                {totalPrice !== 0
                  ? new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(totalPrice)
                  : new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(detail.price)}
              </Text>
            )}
            <TouchableOpacity
              onPress={handleUpdate}
              style={{
                backgroundColor: themeColors.primaryColor,
                padding: 10,
                marginVertical: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: themeColors.white,
                  fontSize: 18,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    color: themeColors.white,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: themeColors.primaryColor,
    padding: 10,
  },
  info: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
  },
  content: {
    color: themeColors.primaryColor7,
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
    width: '80%',
    borderLeftWidth: 2,
    borderStyle: 'solid',
    borderLeftColor: themeColors.primaryColor,
    paddingLeft: 15,
  },
  text2: {
    color: themeColors.primaryColor2,
    marginVertical: 10,
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: 16,
  },
  text3: {
    color: themeColors.primaryColor7,
    marginVertical: 10,
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: 14,
  },
});
