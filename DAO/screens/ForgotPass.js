import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../common/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useForgetPasswordMutation} from '../services/Auth';

const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
});
export default function ForgotPassword() {
  const navigation = useNavigation();
  const [forgetPassword] = useForgetPasswordMutation();
  const forgetPass = val => {
    forgetPassword({email: val.email})
      .unwrap()
      .then(payload => {
        if (payload) {
          Alert.alert('Notification', payload.message, [
            {
              text: 'OK',
            },
          ]);
          console.log(payload);
        }
        navigation.navigate('Welcome');
      })
      .catch(error => {
        if (error) {
          console.log(error);
          Alert.alert('Change Password Failed', error.data.message, [
            {
              text: 'OK',
            },
          ]);
        }
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fffaf0'}}>
      <ImageBackground
        source={require('../assets/bg.png')}
        resizeMode="stretch"
        style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: themeColors.white,
            borderBottomWidth: 5,
            borderBottomColor: '#e8e8e8',
          }}>
          <Icon name="angle-left" size={35} color={themeColors.primaryColor} />
        </View>
        <View style={{marginVertical: 100}}>
          <Formik
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={values => forgetPass(values)}
            initialValues={{email: ''}}>
            {({errors, handleChange, handleSubmit, touched}) => {
              return (
                <View
                  style={{
                    marginHorizontal: 30,
                    backgroundColor: themeColors.white,
                    padding: 20,
                    borderRadius: 20,
                    borderColor: themeColors.gray,
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      color: themeColors.primaryColor4,
                      fontSize: 20,
                      fontWeight: '800',
                      marginBottom: 10,
                    }}>
                    Forgot Password ?
                  </Text>
                  <TextInput
                    onChangeText={handleChange('email')}
                    style={{
                      backgroundColor: themeColors.white,
                      paddingHorizontal: 10,
                      fontSize: 16,
                      fontWeight: '600',
                      color: themeColors.primaryColor,
                      borderRadius: 10,
                      borderColor: themeColors.primaryColor,
                      borderWidth: 1,
                    }}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>*{errors.email}*</Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      alignSelf: 'center',
                      padding: 8,
                      width: '50%',
                      borderRadius: 10,
                      marginTop: 20,
                      backgroundColor: themeColors.primaryColor,
                    }}>
                    <Text
                      style={{
                        color: themeColors.white,
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Send Mail
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: 'red',
    paddingLeft: 10,
    fontStyle: 'italic',
    paddingTop: 10,
  },
});
