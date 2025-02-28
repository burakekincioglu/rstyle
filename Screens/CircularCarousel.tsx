import React from 'react'
import { Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

type CarouselItemProps = {
  image: string,
  index: string
}


const {width} = Dimensions.get('screen')
const _itemSize = width * 0.22
const _spacing = 16
const _itemTotalSize = _itemSize + _spacing
const badge = require('../assets/images/rozet.png')
const imageUrls = [
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg", // Yeni teknoloji görseli
  "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
  "https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg",
  "https://images.pexels.com/photos/34950/pexels-photo.jpg"
];



function CarouselItem({image, index}: CarouselItemProps) {
  return <View style={{width: _itemSize, aspectRatio: 1}} >
            <Image 
              source={{uri: image}} 
              style={{flex: 1, borderRadius: _itemSize / 2}}
            />
        </View>
}

export default function CircularCarousel () {
  const scrollX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x
    }
  })
  return (
    <View style={{flex: 1}} >
      <StatusBar barStyle={'light-content'} />
      <Image 
      source={{uri: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg'}}
      style={StyleSheet.absoluteFillObject}
      />
      <View style={{flex: 1, justifyContent: "flex-end"}} >
        <Animated.FlatList 
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
            return <CarouselItem image={item} index={index}/>
          }}
          // pagination animation
          snapToInterval={_itemTotalSize}
          decelerationRate={'fast'}
        />
      </View>      
    </View>
  )
}


const styles = StyleSheet.create({})