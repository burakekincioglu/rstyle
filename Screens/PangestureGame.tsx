import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { CENTER_ITEMS } from '../utils/styles'

const R = 40
const CIRCLE_RADIUS = 160

interface Context {
    translationX: number
}

const PangestureGame = () => {

    
      const { width, height } = Dimensions.get('screen');

      const translationX = useSharedValue(0);
      const translationY = useSharedValue(0);
      const prevTranslationX = useSharedValue(0);
      const prevTranslationY = useSharedValue(0);
      

    const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const x = prevTranslationX.value + event.translationX;
      const y = prevTranslationY.value + event.translationY;
      const maxRadius = CIRCLE_RADIUS - R / 2;
    
      const distance = Math.sqrt(x ** 2 + y **2 );
      const scale = (distance > maxRadius) ? maxRadius / distance : 1;
      translationX.value = clamp(x * scale, -maxRadius, maxRadius);
      translationY.value = clamp(y * scale, -maxRadius, maxRadius);
    }).
    onEnd(() => {        
        translationX.value = withSpring(0)
        translationY.value =  withSpring(0)
    })

    const rSquareStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translationX.value
            },
            {
                translateY: translationY.value
            }]
        }
    })
    

  return (
    <View style={[styles.container, CENTER_ITEMS]} >
        <GestureDetector gesture={pan}>
          <View style={[styles.circle, CENTER_ITEMS]} >
            <Animated.View style={[styles.square, rSquareStyle]}/>
          </View>
        </GestureDetector>
    </View>
  )
}

export default PangestureGame

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    square: {
        width: R,
        height: R,
        backgroundColor: '#C70A0C',
        borderRadius: R
    },
    circle: {
      width: CIRCLE_RADIUS * 2,
      height: CIRCLE_RADIUS * 2,
      borderRadius: CIRCLE_RADIUS,
      borderColor: 'rgba(0,0,256,0.5)',
      borderWidth: 5
    }

})