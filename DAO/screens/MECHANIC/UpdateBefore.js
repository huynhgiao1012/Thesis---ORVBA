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
import {useUpdateBeforeMutation} from '../../services/Mechanic';
export default function UpdateBeFore({id}) {
  const navigation = useNavigation();
  const [getFormDetail] = useGetFormDetailMutation();
  const [updateBefore, {isLoading}] = useUpdateBeforeMutation();
  const [selectedImage, setSelectedImage] = useState('');
  const [address, setAddress] = useState('');
  const [brand, setBrand] = useState('');
  const [value, onChangeText] = useState('');
  const [reverseGeo] = useReverseGeoMutation();
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
    imgAf: '',
    imgBf: '',
    mechanicId: {
      name: 'Nguyen Van Minh',
      phone: '0735782926',
    },
    note: '',
    payType: 'cash',
    phone: '0532169755',
    price: 500000,
    service: 'Bảo dưỡng khẩn cấp',
    status: 'process',
    time: '14:13:41',
  });
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 10000,
    })
      .then(location => {
        reverseGeo({latitude: location.latitude, longitude: location.longitude})
          .then(payload => {
            console.log(payload.data.results[0].formatted_address);
            setAddress(payload.data.results[0].formatted_address);
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        return error;
      });
  };
  useEffect(() => {
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
  }, []);
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
  const handleUpdate = async () => {
    if (selectedImage === '' || brand === '') {
      Alert.alert("Please update image and brand's name");
    } else {
      const obj = {
        automaker: brand,
        imgBf: selectedImage,
        address: detail.address !== 'Update' ? detail.address : address,
      };
      await updateBefore({id: detail._id, ...obj})
        .unwrap()
        .then(payload => {
          if (payload.success) {
            navigation.navigate('MeForm');
          }
        })
        .catch(error => {
          if (error.status === 401) {
            navigation.navigate('Login');
          }
        });
    }
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {isLoading && (
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
      )}
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
              Address : {detail.address !== 'Update' ? detail.address : address}
            </Text>
            {console.log(address)}
          </View>
        </View>
        {/* FORM INFORMATION */}
        <Text style={styles.title}>Update Form Information</Text>
        <View style={{padding: 20}}>
          {/* IMAGE UPLOAD */}
          <Text style={styles.text2}>Image ( before repairing )</Text>
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
            onChangeText={value => {
              setBrand(value);
            }}
            style={{
              backgroundColor: '#f8f8f8',
              color: themeColors.primaryColor7,
              fontWeight: '700',
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
          />
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
    color: themeColors.primaryColor7,
    marginBottom: 10,
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: 16,
  },
});
