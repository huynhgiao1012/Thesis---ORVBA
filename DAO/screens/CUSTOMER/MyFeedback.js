import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../../common/theme';
import Header2 from '../../common/Header2';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {useGetFormNotFeedMutation} from '../../services/OrderForm';
import {useNavigation} from '@react-navigation/native';
import {
  useCreateFeedbackMutation,
  useGetAllFeedbackByCusMutation,
} from '../../services/Feedback';
import {Rating} from 'react-native-ratings';

export default function MyFeedback() {
  const navigation = useNavigation();
  const [active, setActive] = useState(0);
  const [createFeedback] = useCreateFeedbackMutation();
  const [getFormNotFeed] = useGetFormNotFeedMutation();
  const [getAllFeedbackByCus] = useGetAllFeedbackByCusMutation();
  const starRatingOptions = [1, 2, 3, 4, 5];
  const animatedButtonScale = new Animated.Value(0.8);
  const [starRating, setStarRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [info, setInfo] = useState({
    customerId: '',
    garageId: '',
    formID: '',
  });
  const [feedback, setFeed] = useState([]);
  const [feedback2, setFeed2] = useState([]);
  const [text, setText] = useState('');
  const loadData = () => {
    setFeed([]);
    setFeed2([]);
    if (active === 0) {
      getFormNotFeed()
        .unwrap()
        .then(payload => {
          setFeed(prev => [...prev, ...payload.data]);
        })
        .catch(error => {
          if (error.status === 401) {
            navigation.navigate('Login');
          }
        });
    } else {
      getAllFeedbackByCus()
        .unwrap()
        .then(payload => {
          console.log(payload.data);
          setFeed2(prev => [...prev, ...payload.data]);
        })
        .catch(error => {
          if (error.status === 401) {
            navigation.navigate('Login');
          }
        });
    }
  };
  useEffect(() => {
    loadData();
  }, [active]);
  const handleFilter = num => {
    setActive(num);
  };
  const handlePressIn = () => {
    if (starRating < 5) {
      setStarRating(starRating + 1);
    }
    Animated.spring(animatedButtonScale, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 10,
      bounciness: 2,
    }).start();
  };

  const handlePressOut = () => {
    if (starRating > 1) {
      setStarRating(starRating - 1);
    }
    Animated.spring(animatedButtonScale, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 10,
      bounciness: 2,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}],
  };
  const onSubmitForm = () => {
    if (!starRating) {
      Alert.alert('Noification', 'Please drag on the star for rating', [
        {
          text: 'OK',
        },
      ]);
    }
    createFeedback({
      customerId: info.customerId,
      garageId: info.garageId._id,
      formID: info._id,
      rating: starRating,
      review: text,
    })
      .unwrap()
      .then(payload => {
        if (payload.success) {
          setModalVisible(false);
          loadData();
        }
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  };
  return (
    <ScrollView style={{backgroundColor: themeColors.white}}>
      <Header2 name="My Feedback" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
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
          <Text style={styles.btn_text}>Not Rated</Text>
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
          <Text style={styles.btn_text}>Rated</Text>
        </TouchableOpacity>
      </View>
      {active === 0
        ? feedback.length > 0 &&
          feedback.map((val, index) => {
            return (
              <View
                key={index}
                style={{
                  padding: 15,
                  backgroundColor: themeColors.white,
                  borderBottomColor: '#f8f8f8',
                  borderBottomWidth: 4,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      color: themeColors.primaryColor,
                      fontWeight: 700,
                      fontSize: 16,
                    }}>
                    {val.garageId.name}
                  </Text>
                  <Text
                    style={{
                      color: themeColors.black,
                      fontSize: 16,
                      fontWeight: 500,
                    }}>
                    {val.date.split('-').reverse().join('/')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 8,
                  }}>
                  <Image
                    source={{uri: val.imgAf}}
                    style={{width: '30%', height: 100, borderRadius: 20}}
                  />
                  <View style={{marginLeft: 10, width: '68%'}}>
                    <Text
                      style={{
                        color: themeColors.primaryColor7,
                        fontSize: 16,
                        fontWeight: 700,
                      }}>
                      {val.service}
                    </Text>
                    <Text
                      style={{
                        color: themeColors.primaryColor6,
                        fontSize: 12,
                        padding: 5,
                      }}>
                      - {val.carSpares}
                    </Text>
                    <View>
                      <Text
                        style={{
                          color: themeColors.primaryColor6,
                          fontSize: 12,
                          padding: 5,
                        }}>
                        - Mechanic's name: {val.mechanicId.name}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: themeColors.primaryColor2,
                        fontSize: 16,
                        fontWeight: 700,
                        fontStyle: 'italic',
                        alignSelf: 'flex-end',
                      }}>
                      Total Price:
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(val.price)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderColor: 'green',
                      borderStyle: 'dotted',
                      borderWidth: 2,
                      padding: 7,
                      width: '30%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Icon name="check-circle" color="green" size={22} />
                    <Text
                      style={{
                        color: 'green',
                        fontWeight: 'bold',
                        marginHorizontal: 10,
                      }}>
                      DONE
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setInfo(prev => ({...prev, ...val}));
                    }}
                    style={{
                      backgroundColor: themeColors.primaryColor,
                      padding: 8,
                      marginVertical: 8,
                      borderRadius: 5,
                      width: '65%',
                      alignSelf: 'flex-end',
                    }}>
                    <Text
                      style={{
                        color: themeColors.white,
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Write Feedback
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        : feedback2.length > 0 &&
          feedback2.map((val, index) => {
            return (
              <View
                key={index}
                style={{
                  padding: 15,
                  backgroundColor: themeColors.white,
                  borderBottomColor: '#f8f8f8',
                  borderBottomWidth: 4,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 8,
                  }}>
                  <View
                    style={{
                      width: '60%',
                      borderRightWidth: 2,
                      borderRightColor: themeColors.primaryColor5,
                      borderStyle: 'dotted',
                      paddingRight: 10,
                    }}>
                    <Text
                      style={{
                        color: themeColors.black,
                        fontWeight: 700,
                        fontSize: 16,
                        marginBottom: 10,
                      }}>
                      {val.garageId.name}
                    </Text>
                    <Text
                      style={{
                        color: themeColors.white,
                        fontSize: 16,
                        fontWeight: 500,
                        backgroundColor: themeColors.primaryColor,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        borderRadius: 8,
                        textAlign: 'center',
                      }}>
                      {val.formID.service}
                    </Text>
                    <Text
                      style={{
                        color: themeColors.black,
                        fontSize: 16,
                        fontWeight: 700,
                        fontStyle: 'italic',
                        textAlign: 'right',
                        marginVertical: 10,
                      }}>
                      Price:
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(val.formID.price)}
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        color: themeColors.black,
                        fontSize: 16,
                        fontWeight: '700',
                        fontStyle: 'italic',
                      }}>
                      Your Feedback
                    </Text>
                    <Rating
                      ratingCount={5}
                      type="star"
                      readonly={true}
                      startingValue={val.rating}
                      imageSize={14}
                      style={{paddingVertical: 8, alignSelf: 'flex-start'}}
                    />
                    <Text style={{color: themeColors.black, fontSize: 12}}>
                      {new Date(val.createdAt).toLocaleString()}
                    </Text>
                    <Text style={{color: themeColors.black, fontSize: 14}}>
                      {val.review}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>GIVE FEEDBACK</Text>
            <View style={styles.stars}>
              {starRatingOptions.map(option => (
                <TouchableWithoutFeedback
                  onPressIn={() => handlePressIn(option)}
                  onPressOut={() => handlePressOut(option)}
                  onPress={() => setStarRating(option)}
                  key={option}>
                  <Animated.View style={animatedScaleStyle}>
                    <Icon2
                      style={{marginHorizontal: 5}}
                      size={40}
                      name={starRating >= option ? 'star' : 'star-o'}
                      color={
                        starRating >= option
                          ? themeColors.yellow
                          : themeColors.gray60
                      }
                    />
                  </Animated.View>
                </TouchableWithoutFeedback>
              ))}
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: themeColors.primaryColor7,
                marginHorizontal: 20,
                marginBottom: 10,
              }}>
              Please let us know how we can improve our services
            </Text>
            <TextInput
              style={{
                width: '90%',
                backgroundColor: '#f8f8f8',
                marginHorizontal: 20,
                paddingHorizontal: 20,
                color: themeColors.black,
                fontSize: 18,
                borderRadius: 5,
              }}
              multiline={true}
              numberOfLines={6}
              onChangeText={text => setText(text)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Pressable
                style={[styles.button, styles.buttonSend]}
                onPress={() => onSubmitForm()}>
                <Text style={styles.textStyle}>Send</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: themeColors.primaryColor5,
    width: '50%',
  },
  btn_text: {
    fontWeight: '700',
    color: themeColors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    width: '100%',
    height: 400,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '40%',
    marginHorizontal: 5,
  },
  buttonClose: {
    backgroundColor: themeColors.gray,
  },
  buttonSend: {
    backgroundColor: themeColors.primaryColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    textAlign: 'center',
    color: themeColors.primaryColor,
    fontStyle: 'italic',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: themeColors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 10,
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
});
