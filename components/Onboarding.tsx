import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import Animated, { AnimatedProps, FadeInDown, FadeInLeft, FadeOutLeft, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { colors } from '../utils/colors';
import { spacing } from '../utils/spacing';

/* 

_layoutTransition kullanarak komponentin halden hale geçerken stabil görünmesini sağlıyor
key='finish' kullanmasaydı elementleri ayırt edip istenen animasyonu gösteremezdi

*/

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const _spacing = spacing.xs
const _buttonHeight = 42
const _layoutTransition = LinearTransition.springify().damping(80).stiffness(200)

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
    <View style={{padding: _spacing}} >
      <Text>Onboarding {selectedIndex}</Text>
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
                if (selectedIndex === total) {
                    return;
                }
                onIndexChange(selectedIndex + 1)
        }} >
            {selectedIndex === total ?(
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