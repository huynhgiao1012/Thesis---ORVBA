import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {
  useDistanceMatrixMutation,
  useReverseGeoMutation,
  useDetailPlaceMutation,
} from '../../services/Map';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import { markers, mapDarkStyle, mapStandardStyle } from '../model/mapData';
// import StarRating from '../components/StarRating';
import {useNavigation} from '@react-navigation/native';

import {
  useGetCorGarageQuery,
  useGetGarageDetailMutation,
} from '../../services/Garage';
import {themeColors} from '../../common/theme';
import GetLocation from 'react-native-get-location';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen2 = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [distanceNum, setDistanceNum] = useState(30);
  const [markers, setMarkers] = useState([]);
  const [distanceMatrix] = useDistanceMatrixMutation();
  const getCorGarage = useGetCorGarageQuery();
  const [getCompanyDetail] = useGetGarageDetailMutation();
  const [region, setRegion] = useState({
    latitude: 10.5369728,
    longitude: 106.6734779,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const companyCoordinates = [];
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  const mapRef = useRef(null);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  });

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  useEffect(() => {
    requestPermission();
  }, []);
  useEffect(() => {
    console.log('distanceNum', distanceNum);
    setMarkers([]);
    if (getCorGarage.isSuccess) {
      // console.log('data', getCorGarage.data.data);
      getCorGarage.data.data.map(val => {
        const obj = {
          id: val._id,
          latitude: val.latitude,
          longitude: val.longitude,
        };
        companyCoordinates.push(obj);
      });
    } else {
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={themeColors.primaryColor} />
      </View>;
    }
    getCurrentLocation();
  }, [distanceNum]);
  useEffect(() => {
    if (loading) return;
    mapRef.current?.animateToRegion(region);
  }, [region]);

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
    console.log(companyCoordinates);
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
      console.log(string);
      distanceMatrix({
        latitude: latitude,
        longitude: longitude,
        string: string,
      })
        .unwrap()
        .then(async payload => {
          console.log('payload', payload.rows[0].elements);
          console.log('payload', payload);
          const withIndex = payload.rows[0].elements.map((val, index) => {
            while (index <= companyCoordinates.length) {
              const id = companyCoordinates[index].id;
              return {id: id, ...val};
            }
          });
          const sortedList = withIndex.sort(
            (a, b) => a.distance.value - b.distance.value,
          );
          console.log(sortedList);
          const showedMarker = [];
          sortedList.map(val => {
            if (val.distance.value <= distanceNum * 1000)
              showedMarker.push(val);
          });
          console.log('showedMarker', showedMarker);
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
          console.log('markerList', markerList);
          const sortedMarker = markerList.sort(
            (a, b) => a.distance.value - b.distance.value,
          );
          console.log('sortedMarker', sortedMarker);
          if (!sortedMarker.length) {
            setMarkers([]);
          } else {
            let newMarkers = await Promise.all(
              sortedMarker.map(async val => {
                let detail = {};
                console.log(val);
                await getCompanyDetail({id: val.id})
                  .unwrap()
                  .then(payload => {
                    detail = payload.data;
                  })
                  .catch(error => {
                    return error;
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
            console.log(markers);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}>
        {[
          {
            latLong: {latitude: region.latitude, longitude: region.longitude},
            title: 'Your Current Location',
          },
        ].map((marker, index) => (
          <Marker.Animated
            key={index}
            coordinate={marker.latLong}
            title={marker.title}
            description={marker.description}
          />
        ))}
        {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={e => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {markers.map(
          (marker, index) => console.log(marker),
          //   <View style={styles.card} key={index}>
          //     <Image
          //       source={require('../../assets/baoduong.jpg')}
          //       style={styles.cardImage}
          //       resizeMode="cover"
          //     />
          //     <View style={styles.textContent}>
          //       <Text numberOfLines={1} style={styles.cardtitle}>
          //         {marker.title}
          //       </Text>
          //       {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
          //       <Text numberOfLines={1} style={styles.cardDescription}>
          //         {marker.description}
          //       </Text>
          //       <View style={styles.button}>
          //         <TouchableOpacity
          //           onPress={() => {}}
          //           style={[
          //             styles.signIn,
          //             {
          //               borderColor: '#FF6347',
          //               borderWidth: 1,
          //             },
          //           ]}>
          //           <Text
          //             style={[
          //               styles.textSign,
          //               {
          //                 color: '#FF6347',
          //               },
          //             ]}>
          //             Order Now
          //           </Text>
          //         </TouchableOpacity>
          //       </View>
          //     </View>
          //   </View>
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default MapScreen2;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
