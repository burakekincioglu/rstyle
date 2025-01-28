import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { DerivedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

interface DotProps {
    count: number,
    activeIndex: DerivedValue<number>
}
const ACTIVE_COLOR = '#66e070'
const DOT_SIZES = 10
const DOTS_GAP = 10

const PagingDots = ({count, activeIndex}: DotProps) => {

  const rContainerStyle = useAnimatedStyle(() => {
    
    const WIDTH = DOT_SIZES * (activeIndex.value + 1) + DOTS_GAP * (activeIndex.value + 1)
    return{
      width: withTiming(WIDTH) 
    }
  },[])

  return (
    <View style={styles.container}>
      {new Array(count).fill(0).map((_, index) => {
        
        const rDotOpacity = useAnimatedStyle(() => {
          const isActive = index <= activeIndex.value
          return {
            opacity: withTiming(isActive ? 1 : 0.3)
          }
        },[])
        return(
          <Animated.View style={[styles.dot, rDotOpacity]} />
        )
      })}
      <Animated.View style={[styles.activeView, rContainerStyle]} />
    </View>
  )
}

export default PagingDots

const styles = StyleSheet.create({
  container: {
        width: 60, 
        height: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: DOTS_GAP
      },
  dot: {
    backgroundColor: 'white',
    width: DOT_SIZES,
    height: DOT_SIZES,
    borderRadius: 5,
  },
  activeView: {
    backgroundColor: ACTIVE_COLOR,
    height: DOT_SIZES + 10,
    zIndex: -1,
    position: "absolute",
    borderRadius: DOT_SIZES *2,
    borderCurve: 'continuous',
    left: -DOT_SIZES + DOTS_GAP
  }
})