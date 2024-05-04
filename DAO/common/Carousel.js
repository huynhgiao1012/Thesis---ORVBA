import {FlatList, Image, View, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

const Carousel = ({data}) => {
  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [img, setImg] = useState([]);

  // Auto Scroll

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === img.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    setImg([]);
    const arr = data.map((val, index) => {
      const obj = {
        id: index,
        image: val,
      };

      return obj;
    });
    setImg(prev => [...prev, ...arr]);
  }, []);
  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });

  //  Display Images // UI
  const renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <Image
          source={{uri: item.image}}
          style={{height: 200, width: screenWidth - 20}}
        />
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = event => {
    // Get the scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // Get the index of current active item

    const index = scrollPosition / screenWidth;
    // Update the index
    setActiveIndex(Math.round(index));
  };

  // Render Dot Indicators
  // const renderDotIndicators = () => {
  //   return carouselData.map((dot, index) => {
  //     // if the active index === index

  //     if (activeIndex === index) {
  //       return (
  //         <View
  //           key={index}
  //           style={{
  //             backgroundColor: themeColors.primaryColor,
  //             height: 10,
  //             width: 10,
  //             borderRadius: 5,
  //             marginHorizontal: 6,
  //           }}></View>
  //       );
  //     } else {
  //       return (
  //         <View
  //           key={index}
  //           style={{
  //             backgroundColor: themeColors.primaryColor5,
  //             height: 10,
  //             width: 10,
  //             borderRadius: 5,
  //             marginHorizontal: 6,
  //           }}></View>
  //       );
  //     }
  //   });
  // };

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 15,
      }}>
      <FlatList
        data={img}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={event => handleScroll(event)}
      />

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        {renderDotIndicators()}
      </View> */}
    </View>
  );
};

export default Carousel;
