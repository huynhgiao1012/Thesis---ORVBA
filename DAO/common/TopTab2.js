import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {themeColors} from './theme';
import MeForm1 from '../screens/MECHANIC/MeForm1';
import MeForm2 from '../screens/MECHANIC/MeForm2';
const Tab = createMaterialTopTabNavigator();
export default function TopTab2() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: themeColors.primaryColor,
        tabBarInactiveTintColor: themeColors.primaryColor8,
        tabBarIndicatorStyle: {
          borderBottomColor: themeColors.primaryColor,
          borderBottomWidth: 3,
        },
        tabBarLabelStyle: {fontWeight: '700', fontSize: 14},
      }}>
      <Tab.Screen name="Today's picked form" component={MeForm1} />
      <Tab.Screen name="Holding form" component={MeForm2} />
    </Tab.Navigator>
  );
}
