import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {themeColors} from '../../common/theme';
import FormItem from '../../common/FormItem';
import {useGetAllFormCustomerMutation} from '../../services/OrderForm';
import {useNavigation} from '@react-navigation/native';
export default function Maintenance() {
  const navigation = useNavigation();
  const [active, setActive] = useState(0);
  const [getAllForm, {isLoading}] = useGetAllFormCustomerMutation();
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    getAllForm()
      .unwrap()
      .then(payload => {
        const arr = [];
        if (active === 0) {
          payload.data.map(val => {
            if (val.type === 'maintenance') {
              arr.push(val);
            }
          });
          setData(prev => [...prev, ...arr]);
        } else if (active === 1) {
          payload.data.map(val => {
            if (val.type === 'maintenance' && val.status === 'await') {
              arr.push(val);
            }
          });
          setData(prev => [...prev, ...arr]);
        } else if (active === 2) {
          payload.data.map(val => {
            if (val.type === 'maintenance' && val.status === 'process') {
              arr.push(val);
            }
          });
          setData(prev => [...prev, ...arr]);
        } else if (active === 3) {
          payload.data.map(val => {
            if (val.type === 'maintenance' && val.status === 'done') {
              arr.push(val);
            }
          });
          setData(prev => [...prev, ...arr]);
        }
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, [active]);
  const handleFilter = num => {
    setActive(num);
  };

  return (
    <ScrollView style={{backgroundColor: themeColors.white}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 15,
        }}>
        <TouchableOpacity
          onPress={() => handleFilter(0)}
          style={[
            styles.btn,
            {
              backgroundColor:
                active === 0
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.btn_text}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFilter(1)}
          style={[
            styles.btn,
            {
              backgroundColor:
                active === 1
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.btn_text}>Wait</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFilter(2)}
          style={[
            styles.btn,
            {
              backgroundColor:
                active === 2
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.btn_text}>Process</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFilter(3)}
          style={[
            styles.btn,
            {
              backgroundColor:
                active === 3
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.btn_text}>Paid</Text>
        </TouchableOpacity>
      </View>
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
      {data.length > 0 ? (
        data.map((val, index) => {
          return <FormItem data={val} key={index} />;
        })
      ) : (
        <Text>Not Available</Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: themeColors.primaryColor5,
    borderRadius: 10,
  },
  btn_text: {
    fontWeight: '700',
    color: themeColors.white,
  },
});
