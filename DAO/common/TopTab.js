import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Emergency from '../screens/CUSTOMER/Emergency';
import AllForm from '../screens/CUSTOMER/AllForm';
import Maintenance from '../screens/CUSTOMER/Maintenance';
import {themeColors} from './theme';

const Tab = createMaterialTopTabNavigator();
export default function TopTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: themeColors.primaryColor,
        tabBarInactiveTintColor: themeColors.primaryColor8,
        tabBarIndicatorStyle: {
          borderBottomColor: themeColors.primaryColor,
          borderBottomWidth: 3,
        },
        tabBarLabelStyle: {fontWeight: '700'},
      }}>
      {/* <Tab.Screen name="All" component={AllForm} /> */}
      <Tab.Screen name="Emergency" component={Emergency} />
      <Tab.Screen name="Maintenance" component={Maintenance} />
    </Tab.Navigator>
  );
}
