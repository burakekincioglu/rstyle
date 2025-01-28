import React from 'react'
import { StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import Animated, { useAnimatedRef, useDerivedValue, useScrollViewOffset } from 'react-native-reanimated'
import PagingDots from '../components/PagingDots'


const DOTS_COUNT = 3

const PagingDotsScreen = () => {

  const {width, height} = useWindowDimensions()

  const scrollAnimatedRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollAnimatedRef)

  const activeIndex = useDerivedValue(() => {
    return Math.floor(scrollOffset.value / (width*0.8))
  })

  return (
    <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <Animated.ScrollView
            ref={scrollAnimatedRef} 
            horizontal 
            decelerationRate={'fast'} 
            snapToInterval={width}
        >
            {new Array(DOTS_COUNT).fill(0).map((_, index) => {
            return <View 
                        key={index} 
                        style={[styles.slideContainer,
                                {width: width,
                                height: height*0.5,
                                justifyContent: "center",
                                alignItems: "center"
                                }]}
                    >
                        <View style={{alignItems:"center", justifyContent: "center", width: 150, height: 100, borderWidth: 1, borderColor: 'white'}}>
                            <Text style={{color: "white", fontWeight: "bold"}} >Example Image</Text>
                        </View>
                        
                    </View>
            })}
        </Animated.ScrollView>
        <View style={styles.dotsContainer}>
            <PagingDots count={DOTS_COUNT} activeIndex={activeIndex}/>
        </View>
    </View>
  )
}

export default PagingDotsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black'
    },
    slideContainer: {
        // backgroundColor: '#28136e',
        //  borderWidth: 1,
        borderColor: 'white'
    },
    dotsContainer: {
        position: "absolute"
    }
})