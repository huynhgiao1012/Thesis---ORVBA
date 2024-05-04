import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import OTPScreen from '../screens/OTPScreen';
import Welcome from '../screens/Welcome';
import ForgotPass from '../screens/ForgotPass';
import ChangePass from '../screens/ChangePass';
import UpdateProfile from '../screens/UpdateProfile';
import Home from '../screens/CUSTOMER/Home';
import EmergencyService from '../screens/CUSTOMER/EmergencyService';
import MaintenanceService from '../screens/CUSTOMER/MaintenanceService';
import MapScreen from '../screens/CUSTOMER/MapScreen';
import ListScreen from '../screens/CUSTOMER/ListScreen';
import GarageDetail from '../screens/CUSTOMER/GarageDetail';
import Booking from '../screens/CUSTOMER/Booking';
import MyFeedback from '../screens/CUSTOMER/MyFeedback';
import HelpCenter from '../screens/CUSTOMER/HelpCenter';
import LoyalCustomer from '../screens/CUSTOMER/LoyalCustomer';
import MeHome from '../screens/MECHANIC/MeHome';
import UpdateForm from '../screens/MECHANIC/UpdateForm';
import QRCode from '../screens/MECHANIC/QRCode';
import ViewFormDetail from '../screens/ViewFormDetail';
import MaintenanceProcess from '../screens/CUSTOMER/MaintenanceProcess';
import Reasons from '../screens/CUSTOMER/Reasons';

const Stack = createStackNavigator();
export default function Navigation({socket}) {
  useEffect(() => {
    // console.log(socket);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          options={{headerShown: false}}
          component={Welcome}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          initialParams={{socket: socket}}
          component={Login}
        />
        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUp}
        />
        <Stack.Screen
          name="OTPScreen"
          options={{headerShown: false}}
          component={OTPScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{headerShown: false}}
          component={ForgotPass}
        />
        <Stack.Screen
          name="ChangePass"
          options={{headerShown: false}}
          component={ChangePass}
        />
        <Stack.Screen
          name="UpdateProfile"
          options={{headerShown: false}}
          component={UpdateProfile}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          initialParams={{socket: socket}}
          component={Home}
        />
        <Stack.Screen
          name="MaintenanceService"
          options={{headerShown: false}}
          component={MaintenanceService}
        />
        <Stack.Screen
          name="EmergencyService"
          options={{headerShown: false}}
          component={EmergencyService}
        />
        <Stack.Screen
          name="MapScreen"
          options={{headerShown: false}}
          component={MapScreen}
        />
        <Stack.Screen
          name="ListScreen"
          options={{headerShown: false}}
          component={ListScreen}
        />
        <Stack.Screen
          name="GarageDetail"
          options={{headerShown: false}}
          component={GarageDetail}
        />
        <Stack.Screen
          name="Booking"
          options={{headerShown: false}}
          component={Booking}
        />
        <Stack.Screen
          name="MyFeedback"
          options={{headerShown: false}}
          component={MyFeedback}
        />
        <Stack.Screen
          name="HelpCenter"
          options={{headerShown: false}}
          component={HelpCenter}
        />
        <Stack.Screen
          name="LoyalCustomer"
          options={{headerShown: false}}
          component={LoyalCustomer}
        />
        <Stack.Screen
          name="MeHome"
          options={{headerShown: false}}
          component={MeHome}
        />
        <Stack.Screen
          name="UpdateForm"
          options={{headerShown: false}}
          component={UpdateForm}
        />
        <Stack.Screen
          name="QRCode"
          options={{headerShown: false}}
          component={QRCode}
        />
        <Stack.Screen
          name="ViewFormDetail"
          options={{headerShown: false}}
          component={ViewFormDetail}
        />
        <Stack.Screen
          name="MaintenanceProcess"
          options={{headerShown: false}}
          component={MaintenanceProcess}
        />
        <Stack.Screen
          name="Reasons"
          options={{headerShown: false}}
          component={Reasons}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
