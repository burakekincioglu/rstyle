import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { CENTER_ITEMS } from '../utils/styles'

const SIZE = 80

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
      const maxTranslateX = width / 2 - 50;
      const maxTranslateY = height / 2 - 50;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    }).
    onEnd(() => {        
        if (translationX.value > width / 4 - SIZE) {
            translationX.value = withSpring(width / 2 - SIZE /2 - 4)
        }else{
            translationX.value =  withSpring(- width / 2 + SIZE /2 + 4)
        }
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
            <Animated.View style={[styles.square, rSquareStyle]}/>
        </GestureDetector>
    </View>
  )
}

export default PangestureGame

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: '#C70A0C',
        borderRadius: SIZE
    }

})