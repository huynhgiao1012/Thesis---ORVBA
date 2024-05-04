import {
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header2 from '../common/Header2';
import {themeColors} from '../common/theme';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as yup from 'yup';
import {
  useUpdateInfoMutation,
  useGetUserDetailMutation,
} from '../services/User';
import {useNavigation} from '@react-navigation/native';

const profileValidationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  phone: yup
    .string()
    .required('Required')
    .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Must be a valid phone'),
});
export default function UpdateProfile() {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState('');
  const [data, setData] = useState({
    _id: '',
    email: '',
    isActive: false,
    name: '',
    phone: '',
    role: '',
    img: '',
  });
  const [getUserDetail, {isLoading}] = useGetUserDetailMutation();
  const [updateInfo] = useUpdateInfoMutation();
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
  const Change = val => {
    const obj = {
      name: val.name,
      phone: val.phone,
      img: selectedImage.length > 0 ? selectedImage : data.img,
    };
    updateInfo({...obj})
      .unwrap()
      .then(payload => {
        if (payload.success === true) {
          if (data.role === 'mechanic') {
            navigation.navigate('MeProfile', {loading: true});
          } else {
            navigation.navigate('Profile', {loading: true});
          }
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
      <Header2 name="Update Profile" />
      <View
        style={{
          alignSelf: 'center',
          padding: 10,
          marginTop: 20,
          width: 240,
          borderWidth: 3,
          borderColor: '#f8f8f8',
          borderRadius: 10,
        }}>
        {selectedImage.length == '' ? (
          data.img !== '' ? (
            <Image
              source={{uri: data.img}}
              style={{width: '100%', height: 180, marginBottom: 10}}
            />
          ) : (
            <Image
              source={require('../assets/avt.jpg')}
              style={{width: '100%', height: 180, marginBottom: 10}}
            />
          )
        ) : (
          <Image
            source={{uri: selectedImage}}
            style={{width: '100%', height: 180, marginBottom: 10}}
          />
        )}
        <View style={{flexDirection: 'row'}}>
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
      <Formik
        validationSchema={profileValidationSchema}
        onSubmit={values => Change(values)}
        initialValues={{name: '', phone: ''}}>
        {({errors, handleChange, handleBlur, handleSubmit, touched}) => {
          return (
            <View style={{marginHorizontal: 30}}>
              <View style={styles.title}>
                <Text style={styles.text}>Name</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('name')}
                defaultValue={data.name}
              />
              {errors.name && touched.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
              <View style={styles.title}>
                <Text style={styles.text}>Phone</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholderTextColor={themeColors.white}
                keyboardType="numeric"
                onChangeText={handleChange('phone')}
                defaultValue={data.phone}
              />
              {errors.phone && touched.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  alignSelf: 'center',
                  backgroundColor: themeColors.primaryColor,
                  padding: 10,
                  width: '50%',
                  borderRadius: 10,
                  marginTop: 25,
                }}>
                <Text
                  style={{
                    color: themeColors.white,
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderColor: themeColors.primaryColor6,
    borderWidth: 1,
    fontSize: 18,
    color: themeColors.primaryColor2,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    paddingLeft: 10,
    paddingTop: 10,
    fontStyle: 'italic',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    width: '70%',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: themeColors.primaryColor4,
    fontWeight: '700',
    marginVertical: 10,
  },
});
