import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeColors} from '../../common/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListScreen2 from './ListScreen2';
import Header2 from '../../common/Header2';

export default function MaintenanceService() {
  return (
    <View>
      <Header2 name="Maintenance Service" />
      <ListScreen2 />
    </View>
  );
}
