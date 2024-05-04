import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useGetFormDetailMutation} from '../../services/OrderForm';
import Header2 from '../../common/Header2';
import {themeColors} from '../../common/theme';
import UpdateBeFore from './UpdateBefore';
import UpdateAfter from './UpdateAfter';
export default function UpdateForm({route}) {
  const {id} = route.params;
  const navigation = useNavigation();
  const [getFormDetail] = useGetFormDetailMutation();
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
  useEffect(() => {
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
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header2 name="Update Form" />
      {detail.imgBf === 'None' ? (
        <UpdateBeFore id={id} />
      ) : (
        <UpdateAfter id={id} />
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
    color: themeColors.primaryColor7,
    marginBottom: 10,
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: 16,
  },
});
