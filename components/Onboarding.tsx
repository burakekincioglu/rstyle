import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import Animated, { AnimatedProps, FadeInDown, FadeInLeft, FadeOutLeft, FadeOutUp, interpolateColor, LinearTransition, SharedValue, useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';
import { colors } from '../utils/colors';
import { spacing } from '../utils/spacing';

/* 

_layoutTransition kullanarak komponentin halden hale geçerken stabil görünmesini sağlıyor
key='finish' kullanmasaydı elementleri ayırt edip istenen animasyonu gösteremezdi

*/

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const _spacing = spacing.xs
const _buttonHeight = 42
const _dotContainer = 24
const _dotSize = _dotContainer / 3
const _layoutTransition = LinearTransition.springify().damping(80).stiffness(200)

const _activeDot = colors.darkgray
const _inactiveDot = colors.graywhite

function Button({children, style, ...rest}: AnimatedProps<PressableProps>) {
    return(
        <AnimatedPressable 
            style={[
                {height: _buttonHeight,
                    borderRadius: _buttonHeight / 2,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: _spacing * 2
                }, 
            style]} 
            entering={FadeInLeft.springify().damping(80).stiffness(200)}
            exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
            layout={_layoutTransition}
            {...rest} >
            {children}
        </AnimatedPressable>
    )
}

function Dot({index, animation}: {index: number, animation: SharedValue<number>}) {

    const rStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                animation.value,
                [index - 1, index, index + 1],
                [_inactiveDot, _activeDot, _activeDot]
            )
        }
    })

    return(
        <View style={{
            width: _dotContainer,
            height: _dotContainer,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Animated.View 
                style={[{
                    width: _dotSize,
                    height: _dotSize,
                    borderRadius: _dotSize,
                    backgroundColor: '#000'
                }, rStyle]}
            />
        </View>
        
    )
}

export function Pagination({
    selectedIndex, 
    total}:
    {
    selectedIndex: number;
    total: number
    } 
) {

    const animation = useDerivedValue(() => {
        return withSpring(selectedIndex, {
            damping: 80,
            stiffness: 200
        })
    })

    return(
        <View style={{justifyContent: "center", alignItems: "center"}} >
            <View style={{flexDirection: 'row'}} >
                <PaginationIndicator animation={animation} />
                {[...Array(total).keys()].map((i) => (
                    <Dot key={`dot - ${i}`} index={i} animation={animation} />
                ))}
            </View>
        </View>
        
    )
}

function PaginationIndicator({animation}: {animation: SharedValue<number>}) {
    const rStyle = useAnimatedStyle(() => {
        return{
            width: _dotContainer + _dotContainer * animation.value
        }
    })
    return(
        <Animated.View 
            style={[{
                backgroundColor: colors.success,
                height: _dotContainer,
                width: _dotContainer,
                borderRadius: _dotContainer,
                position: 'absolute',
                left: 0,
                top: 0
            }, rStyle]}
        />
    )
}

const Onboarding = ({
    total,
    selectedIndex,
    onIndexChange
}: {
    total: number;
    selectedIndex: number;
    onIndexChange: (index: number) => void
}) => {
  return (
    <View style={{padding: _spacing, gap: _spacing}} >
        <Pagination selectedIndex={selectedIndex} total={total} />
      <View style={{flexDirection: "row", gap: _spacing}} >
        {
            selectedIndex > 0 && (
                <Button
                    style={{backgroundColor: colors.graywhite}}
                    onPress={() => {
                        if (selectedIndex <= 0) {
                            return;
                        }
                        onIndexChange(selectedIndex - 1)
                    }
                    }
                >
                    <Text>Back</Text>
                </Button>
            )
        }
        
        <Button 
            style={{backgroundColor: colors.blue, flex: 1}}
            onPress={() => {
                if (selectedIndex === total -1) {
                    return;
                }
                onIndexChange(selectedIndex + 1)
        }} >
            {selectedIndex === total -1 ?(
                <Animated.Text
                    key='finish'
                    style={{color: colors.white}}
                    entering={FadeInDown.springify().damping(80).stiffness(200)}
                    exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                >
                    Finish
                </Animated.Text>
            ): (
                <Animated.Text
                    key='continue'
                    style={{color: colors.white}} 
                    layout={_layoutTransition} 
                    entering={FadeInDown.springify().damping(80).stiffness(200)}
                    exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                >
                    Continue
                </Animated.Text>
            )}
            
        </Button>
      </View>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({

})