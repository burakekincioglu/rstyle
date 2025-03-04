import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { clamp, FadeIn, FadeInDown, FadeOut, interpolate, interpolateColor, runOnJS, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

type CarouselItemProps = {
  image: string,
  index: number,
  scrollX: SharedValue<number>
  activeIndex: number
}

/*

- flatlist'den gelen index değerini onScroll içinde "clamp" kullanarak 
  belli bir aralığa sıkıştırma olayı güzeldi
- activeIndexValue !== activeIndex eşitlemesi ve runOnJS ile performans iyileştirme güzeldi
- interpolate kullanımı çok enteresandı
*/


const {width} = Dimensions.get('screen')
const _itemSize = width * 0.28
const _spacing = 16
const _itemTotalSize = _itemSize + _spacing
const badge = require('../assets/images/rozet.png')
const imageUrls = [
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
  "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
  "https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg",
  "https://images.pexels.com/photos/34950/pexels-photo.jpg"
];



function CarouselItem({image, index, scrollX, activeIndex}: CarouselItemProps) {
  const blur = index === activeIndex
  const _styleR = useAnimatedStyle(() => {
    return{
      borderWidth: 4,
      borderColor: interpolateColor(
          scrollX.value,
          [index -1, index, index + 1],
          ['transparent', 'white', 'transparent']
      ),
      borderRadius: _itemSize / 2,
      transform: [{
        translateY: interpolate(
          scrollX.value,[index-1, index, index + 1],
          [_itemSize/3, 0, _itemSize/3]
        )
      }]
    }
  })
  return <Animated.View style={[{width: _itemSize, aspectRatio: 1}, _styleR]} >
            <Animated.Image 
              blurRadius={blur ? 0 : 5}
              source={{uri: image}} 
              style={{flex: 1, borderRadius: _itemSize / 2}}
            />
        </Animated.View>
}


export default function CircularCarousel () {
  const scrollX = useSharedValue(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    imageUrls.forEach((img) => {
      Image.prefetch(img);
    });
  }, []);
  

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {      
      scrollX.value = e.contentOffset.x / _itemTotalSize   
      const activeIndexValue = clamp(Math.round(scrollX.value), 0, imageUrls.length -1) 

      // [0, 0.5) -> 0 olacağı için aşağıdaki if'e girmez: performams iyileştirmesi
      if (activeIndexValue !== activeIndex) {
        runOnJS(setActiveIndex)(activeIndexValue)
      }
      
    }
  })
  return (
    <View style={{flex: 1, backgroundColor: 'black'}} >
      <StatusBar barStyle={'light-content'} />
      <View style={[StyleSheet.absoluteFillObject]} >
        <Animated.Image 
          key={`images-${activeIndex}`}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          source={{uri: imageUrls[activeIndex]}}
          style={{flex: 1}}
        />
        <LinearGradient
        colors={['transparent', '#000']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{height: _itemSize * 4,
          position: "absolute", 
          left: 0, 
          right: 0,
          bottom: 0
        }} 
      />
      </View>
      
      <View style={{flex: 1, justifyContent: "flex-end"}} >
        <Animated.FlatList
        entering={FadeInDown.damping(40).stiffness(100).duration(500)}
          horizontal
          data={imageUrls}
          showsHorizontalScrollIndicator={false}
          style={{flexGrow: 0, height: _itemSize * 2}}
          keyExtractor={(_, index) => String(index)}
          contentContainerStyle={{
            paddingHorizontal: (width - _itemSize) / 2,
            gap: _spacing
          }}
          renderItem={({item, index}) => {
            return <CarouselItem image={item} index={index} activeIndex={activeIndex} scrollX={scrollX} />
          }}
          // pagination animation
          snapToInterval={_itemTotalSize}
          decelerationRate={'fast'}
          //scrolling
          onScroll={onScroll}
        />
      </View>      
    </View>
  )
}


const styles = StyleSheet.create({})