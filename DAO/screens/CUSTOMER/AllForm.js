import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {themeColors} from '../../common/theme';
import FormItem from '../../common/FormItem';
import {useGetAllFormMutation} from '../../services/Customer';
import {useNavigation} from '@react-navigation/native';

export default function AllForm() {
  const navigation = useNavigation();
  const [active, setActive] = useState(0);
  const [getAllForm] = useGetAllFormMutation();
  const [form, setForm] = useState([]);
  const [filter, setArr] = useState([]);
  const handleFilter = num => {
    setActive(num);
  };
  useEffect(() => {
    setForm([]);
    setArr([]);
    getAllForm()
      .unwrap()
      .then(payload => {
        setForm(prev => [...prev, ...payload.orderForm]);
      })
      .catch(error => {
        if (error.data.message === 'Token is exprired') {
          navigation.navigate('Login');
        }
      });
  }, []);
  useEffect(() => {
    setArr([]);
    setForm([]);
    getAllForm()
      .unwrap()
      .then(payload => {
        if (active === 0) {
          setArr(prev => [...prev, ...payload.orderForm]);
        }
        if (active === 1) {
          const arr = payload.orderForm.map(val => {
            if (val.status === 'await') {
              return val;
            }
          });
          setArr(prev => [...prev, ...arr]);
        }
        if (active === 2) {
          const arr = payload.orderForm.map(val => {
            if (val.status === 'process') {
              return val;
            } else {
              return '';
            }
          });
          setArr(prev => [...prev, ...arr]);
        }
        if (active === 3) {
          const arr = payload.orderForm.map(val => {
            if (val.status === 'done') {
              return val;
            } else {
              return '';
            }
          });
          setArr(prev => [...prev, ...arr]);
        }
      })
      .catch(error => {
        if (error.data.message === 'Token is exprired') {
          navigation.navigate('Login');
        }
      });
  }, [active]);
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
      {filter.length > 0 && typeof filter[0] === 'object' ? (
        filter.map((val, index) => {
          return <FormItem data={val} key={index} />;
        })
      ) : (
        <Text
          style={{
            fontWeight: '700',
            color: themeColors.primaryColor6,
            fontSize: 16,
            alignSelf: 'center',
            fontStyle: 'italic',
          }}>
          No results
        </Text>
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
