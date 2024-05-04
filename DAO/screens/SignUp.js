import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {themeColors} from '../common/theme';
import {useNavigation} from '@react-navigation/native';
import {useRegisterMutation} from '../services/Auth';
import * as yup from 'yup';
const signUpValidationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().email('Please enter valid email').required('Required'),
  password: yup
    .string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, Uppercase, Lowercase, Number and Special Case Character',
    ),
  phone: yup
    .string()
    .required('Required')
    .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Must be a valid phone'),
});
// subscribe for more videos like this :)
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [registerQuery, {isLoading}] = useRegisterMutation();
  const Register = async data => {
    await registerQuery(data)
      .then(payload => {
        console.log('payload', payload);
        if (payload.data) {
          Alert.alert(
            payload.message,
            'Please verify your account before login!',
            [
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate('OTPScreen', {id: payload.data.data._id}),
              },
            ],
          );
        } else {
          Alert.alert('SIGN UP', payload.error.data.message.duplicate, [
            {
              text: 'OK',
            },
          ]);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      {isLoading && (
        <Modal isVisible={true} transparent={true}>
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
        </Modal>
      )}
      <Text
        style={{
          fontSize: 30,
          fontWeight: '700',
          textAlign: 'center',
          marginTop: 50,
          color: themeColors.primaryColor2,
        }}>
        SIGN UP
      </Text>
      <View
        style={{
          backgroundColor: themeColors.white,
          flex: 1,
          marginHorizontal: 10,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <Formik
          validationSchema={signUpValidationSchema}
          onSubmit={values => Register(values)}
          initialValues={{name: '', email: '', phone: '', password: ''}}>
          {({errors, handleChange, handleSubmit, touched}) => {
            return (
              <View style={styles.form}>
                <View style={styles.titleText}>
                  <Text style={styles.title}>Full Name</Text>
                  {errors.name && touched.name && (
                    <Text style={styles.errorText}> {errors.name} </Text>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('name')}
                />
                <View style={styles.titleText}>
                  <Text style={styles.title}>Email Address</Text>
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}> {errors.email} </Text>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  keyboardType="email-address"
                />
                <View style={styles.titleText}>
                  <Text style={styles.title}>Phone</Text>
                  {errors.phone && touched.phone && (
                    <Text style={styles.errorText}> {errors.phone} </Text>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={handleChange('phone')}
                />
                <View style={styles.titleText}>
                  <Text style={styles.title}>Password</Text>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}> {errors.password} </Text>
                  )}
                </View>

                <TextInput
                  style={styles.input}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: themeColors.primaryColor,
                    padding: 10,
                    width: '90%',
                    borderRadius: 20,
                    marginTop: 30,
                  }}>
                  <Text
                    style={{
                      color: themeColors.white,
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: themeColors.primaryColor6,
              fontSize: 16,
              fontStyle: 'italic',
            }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontWeight: 'bold',
                color: themeColors.primaryColor2,
                fontSize: 16,
              }}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  title: {
    fontSize: 17,
    color: themeColors.primaryColor7,
    fontWeight: '700',
  },
  input: {
    borderWidth: 2,
    borderColor: themeColors.primaryColor5,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    color: themeColors.primaryColor7,
    fontWeight: '600',
    fontSize: 18,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    paddingLeft: 10,
    fontStyle: 'italic',
  },
  titleText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    width: '70%',
    marginTop: 10,
  },
});
