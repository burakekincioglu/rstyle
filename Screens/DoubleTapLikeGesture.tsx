import React, { useCallback } from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'

const backgroundImg = require('../assets/images/img1.jpg')
const likeIcon = require('../assets/icons/liked.png')

const AnimatedImage = Animated.createAnimatedComponent(Image)

const DoubleTapLikeGesture = () => {
  const doubleTapRef = React.createRef();
  /* 
    burada referans oluşumuna ve "waitFor" prop'una dikkat ET.
  */

  const scale = useSharedValue(0)

  const rStyle = useAnimatedStyle(() => { 
    const translateX = interpolate(scale.value,[0,3], [0, 25])
    const translateY = interpolate(scale.value,[0,3], [0, -25])
    return {
    transform: [ {scale: scale.value}, // {scale: Math.max(scale.value,0)} BURAYA DİKKAT !
                 {translateX: translateX},
                 {translateY: translateY}
      ]
  }})

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(3,undefined, (finished) => {
      if (finished) {
        scale.value = withDelay(250, withSpring(0)) 
      }
    })
  }, [])
  return (
    <View>
      <TapGestureHandler 
        waitFor={doubleTapRef}
        onActivated={() => {
          console.log("tek tıklandı");
      }}>
        <TapGestureHandler 
          maxDelayMs={300}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap} >
          <Animated.View>
            <ImageBackground source={backgroundImg} resizeMode='contain' style={styles.image}>
              <AnimatedImage 
                resizeMode={'center'} 
                source={likeIcon} 
                style={[styles.image, rStyle ,{
                  shadowOffset: {width: 0, height: 10},
                  shadowOpacity: 0.5,
                  shadowRadius: 3,

                }]}/>
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  )
}

export default DoubleTapLikeGesture

const {width: SIZE} = Dimensions.get('window')

const styles = StyleSheet.create({
  image: {
    width: SIZE,
    height: SIZE * 0.7
  },
  // likeIcon: {
  //   width: 100,
  //   height: 100
  // }
})