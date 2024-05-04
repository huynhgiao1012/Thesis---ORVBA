import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useChangePasswordMutation} from '../services/User';
import Header2 from '../common/Header2';
import {themeColors} from '../common/theme';
const changePasswordValidationSchema = yup.object().shape({
  oldPassword: yup.string().required('Required'),
  newPassword: yup
    .string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`<>])(?=.{8,})/,
      'Must Contain 8 Characters, Uppercase, Lowercase, Number and Special Case Character',
    ),
});
export default function ChangePass() {
  const navigation = useNavigation();
  const [changePassword] = useChangePasswordMutation();
  const changePass = val => {
    changePassword({...val})
      .unwrap()
      .then(payload => {
        if (payload) {
          Alert.alert('Your Password has been changed', payload.message, [
            {
              text: 'OK',
            },
          ]);
        }
        navigation.goBack();
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
        if (error) {
          Alert.alert('Change Password Failed', error.data.message, [
            {
              text: 'OK',
            },
          ]);
        }
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: themeColors.white}}>
      <Header2 name="Change Password" />
      <View style={{marginVertical: 50}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 20,
            color: themeColors.primaryColor,
          }}>
          CHANGE PASSWORD
        </Text>
        <Formik
          validationSchema={changePasswordValidationSchema}
          onSubmit={values => changePass(values)}
          initialValues={{oldPassword: '', newPassword: ''}}>
          {({errors, handleChange, handleSubmit, touched}) => {
            return (
              <View style={{marginHorizontal: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: themeColors.primaryColor6,
                      fontSize: 18,
                      fontWeight: '800',
                      fontStyle: 'italic',
                    }}>
                    Old Password
                  </Text>
                  {errors.oldPassword && touched.oldPassword && (
                    <Text style={styles.errorText}>{errors.oldPassword}</Text>
                  )}
                </View>
                <TextInput
                  onChangeText={handleChange('oldPassword')}
                  secureTextEntry
                  style={{
                    borderWidth: 2,
                    borderColor: themeColors.primaryColor5,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    fontWeight: '600',
                    color: themeColors.primaryColor7,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: themeColors.primaryColor6,
                      fontSize: 18,
                      fontWeight: '800',
                      fontStyle: 'italic',
                    }}>
                    New Password
                  </Text>
                  {errors.newPassword && touched.newPassword && (
                    <Text style={styles.errorText}>{errors.newPassword}</Text>
                  )}
                </View>
                <TextInput
                  onChangeText={handleChange('newPassword')}
                  secureTextEntry
                  style={{
                    borderWidth: 2,
                    borderColor: themeColors.primaryColor5,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    fontWeight: '600',
                    color: themeColors.primaryColor7,
                  }}
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: themeColors.primaryColor,
                    padding: 10,
                    width: '50%',
                    borderRadius: 10,
                    marginTop: 30,
                  }}>
                  <Text
                    style={{
                      color: themeColors.white,
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    UPDATE
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}>
        <View
          style={{
            backgroundColor: themeColors.primaryColor5,
            borderTopRightRadius: 300,
            width: 350,
            height: 300,
          }}></View>

        <View
          style={{
            backgroundColor: themeColors.primaryColor6,
            borderTopLeftRadius: 300,
            width: 200,
            height: 200,
            marginLeft: -50,
          }}></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: 'red',
    paddingLeft: 10,
    fontStyle: 'italic',
  },
});
