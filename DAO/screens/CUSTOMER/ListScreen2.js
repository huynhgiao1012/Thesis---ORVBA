import {
  View,
  Text,
  Linking,
  TextInput,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import React from 'react';
import {useEffect, useState} from 'react';
import GetLocation from 'react-native-get-location';
import {useDistanceMatrixMutation} from '../../services/Map';
import {
  useGetGarageDetailMutation,
  useGetCorGarageMutation,
} from '../../services/Garage';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../../common/theme';
import ListItem from '../../common/ListItem';

// subscribe for more videos like this :)
export default function ListScreen2() {
  const navigation = useNavigation();
  const [active, setActive] = useState(3);
  const [loading, setLoading] = useState(true);
  const [distanceNum, setDistanceNum] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [distanceMatrix] = useDistanceMatrixMutation();
  const [cor, setCor] = useState([]);
  const [getCorCompany, {isLoading}] = useGetCorGarageMutation();
  const [getCompanyDetail] = useGetGarageDetailMutation();
  const [region, setRegion] = useState({
    latitude: 10.5369728,
    longitude: 106.6734779,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const companyCoordinates = [];
  useEffect(() => {
    setMarkers([]);
    requestPermission();
  }, []);
  const getCor = async () => {
    setCor([]);
    await getCorCompany()
      .unwrap()
      .then(payload => {
        setCor(prev => [...prev, ...payload.data]);
      })
      .catch(error => {
        if (error.status === 401) {
          navigation.navigate('Login');
        }
      });
  };
  useEffect(() => {
    setMarkers([]);
    getCor();
    getCurrentLocation();
  }, [distanceNum]);
  const requestPermission = async () => {
    if (Platform.OS == 'android') {
      getCurrentLocation();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      // console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) getCurrentLocation();
      else {
        alert('notGranted');
      }
    }
  };
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 10000,
    })
      .then(location => {
        setRegion({
          ...region,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        apiCall(location.latitude, location.longitude);
      })
      .catch(error => {
        return error;
      });
    setLoading(false);
  };
  const apiCall = async (latitude, longitude) => {
    setMarkers([]);
    cor.map(val => {
      const obj = {
        id: val._id,
        latitude: val.latitude,
        longitude: val.longitude,
      };
      companyCoordinates.push(obj);
    });
    try {
      var string = '';
      let markerList = [];
      companyCoordinates.map(val => {
        if (string.length === 0) {
          string = val.latitude + ',' + val.longitude;
        } else {
          string = string + '%7C' + val.latitude + ',' + val.longitude;
        }
      });

      distanceMatrix({
        latitude: latitude,
        longitude: longitude,
        string: string,
      })
        .unwrap()
        .then(async payload => {
          // console.log('payload', payload.rows[0].elements);
          const withIndex = await payload.rows[0].elements.map((val, index) => {
            while (index <= companyCoordinates.length) {
              const id = companyCoordinates[index].id;
              return {id: id, ...val};
            }
          });
          const sortedList = withIndex.sort(
            (a, b) => a.distance.value - b.distance.value,
          );

          const showedMarker = [];
          sortedList.map(val => {
            if (val.distance.value <= distanceNum * 1000)
              showedMarker.push(val);
          });
          // console.log('showedMarker', showedMarker);
          companyCoordinates.map(val => {
            showedMarker.map(value => {
              if (val.id === value.id) {
                const obj = {
                  ...val,
                  distance: value.distance,
                  duration: value.duration,
                };
                markerList.push(obj);
              }
            });
          });
          // console.log('markerList', markerList);
          const sortedMarker = markerList.sort(
            (a, b) => a.distance.value - b.distance.value,
          );
          // console.log('sortedMarker', sortedMarker);
          if (!sortedMarker.length) {
            setMarkers([]);
          } else {
            let newMarkers = await Promise.all(
              sortedMarker.map(async val => {
                let detail = {};
                await getCompanyDetail({id: val.id})
                  .unwrap()
                  .then(payload => (detail = payload.data))
                  .catch(error => {
                    if (error.status === 401) {
                      navigation.navigate('Login');
                    }
                  });
                return {
                  id: detail._id,
                  coordinate: {
                    latitude: detail.latitude,
                    longitude: detail.longitude,
                  },
                  title: detail.name,
                  address: detail.address || 'Not Available',
                  image: 'NA',
                  phoneNo: detail.phone,
                  email: detail.email,
                  distance: val.distance.text,
                  openTime: detail.openTime,
                  closeTime: detail.closeTime,
                };
              }),
            );
            setMarkers(newMarkers);
          }
        })
        .catch(error => {
          if (error.status === 401) {
            navigation.navigate('Login');
          }
        });
    } catch (error) {
      setLoading(false);
    }
  };
  const openDialScreen = num => {
    if (Platform.OS === 'ios') {
      number = `telprompt:${num}`;
    } else {
      number = `tel:${num}`;
    }
    Linking.openURL(number);
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxHeader}>
        <TouchableOpacity
          onPress={() => {
            setDistanceNum(10);
            setActive(0);
          }}
          style={[
            styles.distance,
            {
              backgroundColor:
                active === 0
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.text}>10 km</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDistanceNum(30);
            setActive(1);
          }}
          style={[
            styles.distance,
            {
              backgroundColor:
                active === 1
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.text}>30 km</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDistanceNum(50);
            setActive(2);
          }}
          style={[
            styles.distance,
            {
              backgroundColor:
                active === 2
                  ? themeColors.primaryColor
                  : themeColors.primaryColor5,
            },
          ]}>
          <Text style={styles.text}>50 km</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: themeColors.primaryColor,
          fontStyle: 'italic',
          paddingHorizontal: 20,
          fontSize: 18,
          fontWeight: '700',
          borderBottomColor: '#e8e8e8',
          borderBottomWidth: 2,
          paddingBottom: 10,
        }}>
        Nearby places in {distanceNum}km
      </Text>
      {isLoading ? (
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
      ) : markers.length > 0 ? (
        <FlatList
          style={{marginBottom: 150}}
          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({highlighted}) => (
              <View
                style={[styles.separator, highlighted && {marginLeft: 0}]}
              />
            ))
          }
          data={markers.length === 0 ? [] : markers}
          renderItem={({item, index}) => <ListItem item={item} key={index} />}
        />
      ) : active === 3 ? (
        <View>
          <Text
            style={{
              color: themeColors.black,
              textAlign: 'center',
              marginVertical: 15,
            }}>
            Please choose distance to get list of nearby garages
          </Text>
        </View>
      ) : (
        <View>
          <Text
            style={{
              color: themeColors.black,
              textAlign: 'center',
              marginVertical: 15,
            }}>
            No garage found in the selected range
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: themeColors.white,
  },
  item: {
    backgroundColor: themeColors.white,
  },
  boxHeader: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  distance: {
    borderWidth: 1,
    margin: 10,
    width: 70,
    padding: 8,
    borderRadius: 10,
    borderColor: themeColors.primaryColor5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  ratingTxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    marginLeft: 5,
    color: themeColors.primaryColor8,
  },
  text: {
    color: themeColors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content_text: {
    fontSize: 16,
    color: themeColors.primaryColor7,
    fontWeight: '700',
    marginLeft: 10,
  },
});
