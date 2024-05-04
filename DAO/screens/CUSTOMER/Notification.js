import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
  ScrollViewBase,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import {themeColors} from '../../common/theme';
import {
  useGetReadNotificationMutation,
  useUpdateNotiMutation,
  useDeleteNotiMutation,
} from '../../services/Notification';
import moment from 'moment';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default function NotiScreen() {
  const navigation = useNavigation();
  const [getUnreadNoti, {isLoading}] = useGetReadNotificationMutation();
  const [updateNoti] = useUpdateNotiMutation();
  const [deleteNoti] = useDeleteNotiMutation();
  const [status, setStatus] = useState('new');
  const [unRead, setUnread] = useState([]);
  useEffect(() => {
    setUnread([]);
    getUnreadNoti()
      .unwrap()
      .then(payload => {
        if (payload) {
          setUnread(prev => [...prev, ...payload.data].reverse());
        }
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  }, []);

  const handlePress = id => {
    setStatus('old');
    setUnread([]);
    updateNoti({id: id})
      .unwrap()
      .then(payload => {
        if (payload.success) {
          getUnreadNoti()
            .unwrap()
            .then(payload => {
              setUnread([]);
              if (payload) {
                setUnread(prev => [...prev, ...payload.data].reverse());
              }
            });
        }
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  };
  const rightSwipe = (dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [1, 100],
      outputRange: [1.2, 0.6],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => onDelete(id)}>
        <View style={styles.deleteBox}>
          <Animated.Text
            style={{
              transform: [{scale: scale}],
            }}>
            <Icon name="trash" size={22} color={themeColors.white} />
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onDelete = id => {
    deleteNoti({id: id})
      .unwrap()
      .then(payload => {
        if (payload.success === true) {
          Alert.alert('DELETE NOTIFICATION', payload.message, [
            {
              text: 'OK',
              onPress: () => {
                getUnreadNoti()
                  .unwrap()
                  .then(payload => {
                    setUnread([]);
                    if (payload) {
                      setUnread(prev => [...prev, ...payload.data].reverse());
                    }
                  });
              },
            },
          ]);
        }
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  };

  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomWidth: 2,
          borderBottomColor: '#e8e8e8',
        }}>
        <Text
          style={{
            color: themeColors.primaryColor4,
            fontSize: 22,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Notification
        </Text>
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
      <ScrollView>
        {unRead.map(val => {
          if (val.status === 'unread') {
            return (
              <TouchableOpacity
                onPress={() => handlePress(val._id)}
                key={val._id}>
                {status !== 'old' && (
                  <View style={styles.container}>
                    <Text style={styles.text1}>{val.text}</Text>
                    <Text
                      style={{
                        color: themeColors.primaryColor7,
                        fontSize: 14,
                        fontWeight: '700',
                        fontStyle: 'italic',
                        textAlign: 'right',
                      }}>
                      {moment(
                        new Date(val.createdAt)
                          .toLocaleString('en-GB')
                          .split(', ')[0]
                          .split('/')
                          .reverse()
                          .join('-') +
                          ' ' +
                          new Date(val.createdAt)
                            .toLocaleString('en-GB')
                            .split(', ')[1],
                      ).fromNow()}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }
          if (val.status === 'read') {
            return (
              <Swipeable
                renderRightActions={dragX => rightSwipe(dragX, val._id)}
                key={val._id}>
                <View style={styles.container}>
                  <Text style={styles.text2}>{val.text}</Text>
                  <Text
                    style={{
                      color: themeColors.gray60,
                      fontSize: 14,
                      fontWeight: '500',
                      fontStyle: 'italic',
                      textAlign: 'right',
                      marginTop: 10,
                    }}>
                    {moment(
                      new Date(val.createAt)
                        .toLocaleString()
                        .split(', ')[1]
                        .split('/')
                        .reverse()
                        .join('-') +
                        ' ' +
                        new Date(val.createAt).toLocaleString().split(', ')[0],
                    ).fromNow()}
                  </Text>
                </View>
              </Swipeable>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 120,
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 2,
    padding: 20,
  },
  deleteBox: {
    backgroundColor: themeColors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 120,
    marginVertical: 10,
  },
  text1: {
    color: themeColors.primaryColor4,
    fontSize: 16,
    fontWeight: '800',
    width: '90%',
    marginTop: 5,
  },
  text2: {
    color: themeColors.black,
    fontSize: 16,
    width: '90%',
    fontWeight: '600',
  },
  text3: {
    color: themeColors.primaryColor6,
    fontSize: 14,
    width: '90%',
    fontWeight: '700',
  },
});
