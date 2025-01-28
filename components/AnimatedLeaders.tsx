import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Animated, { FadeInRight, interpolate, interpolateColor, runOnJS, SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'

/* 

FadeInRight güzel bi şovdu.
withDelay(_stagger * index, withSpring(anim.value, { damping: 80, stiffness: 200})) güzel bi şovdu.
interpolate(_anim.value, [0,1], [_avatarSize ,Math.max(user.score * 3, _avatarSize) ]) burada Math.max kullanımı güzel bi şovdu.
*/

interface Props {
    userList: {
        name: string
        score: number
    }[]
}

type PlaceProps = {
    user: {
        name: string
        score: number
    },
    index: number,
    onFinish?: () => void,
    anim: SharedValue<number>
}

const _avatarSize = 28
const _spacing = 4
const _stagger = 50 // 100 ve 200 de dene

function Place({ user, index, onFinish, anim }: PlaceProps) {
    const _anim = useDerivedValue(() => {
        return withDelay(_stagger * index, withSpring(anim.value, { damping: 80, stiffness: 200}))
    })

    const rStyle = useAnimatedStyle(() => {
        return{
            //height: user.score * 3 * _anim.value // [0, ]
              height: interpolate(_anim.value, [0,1], [_avatarSize ,Math.max(user.score * 3, _avatarSize) ]),
              backgroundColor: index === 4 ? interpolateColor(_anim.value, [0,1], ['rgba(0,0,0,0.1)', 'gold']) : 'rgba(0,0,0,0.1)'
        }
    })

    const rStyleText = useAnimatedStyle(() => {
        return{
            opacity: interpolate(_anim.value, [0,0.2,1], [0,0,1])
        }
    })


    return (
        <Animated.View 
            style={{alignItems: "center"}}
            entering={FadeInRight.delay(_stagger * index)
                .springify()
                .damping(80)
                .stiffness(200).withCallback(finished => {
                    if (finished && onFinish) {
                        runOnJS(onFinish)()
                    }
                })
        } >
            <Animated.Text style={[{fontWeight: "700"}, rStyleText]} >{user.score}</Animated.Text>
            <Animated.View style={[{
                backgroundColor: "gold",
                width: _avatarSize,
                height: _avatarSize,
                borderRadius: _avatarSize
            },
            rStyle]}
            >
                <View style={{
                width: _avatarSize,
                aspectRatio: 1
                }} >
                    <Image source={{uri: `https://i.pravatar.cc/150?u=user_${user.name}`}} 
                        style={{
                            flex: 1,
                            borderRadius: _avatarSize
                        }}
                    />
                </View>
            </Animated.View>
        </Animated.View>
    )
}

const AnimatedLeaders = (props: Props) => {
    const _anim = useSharedValue(0)
    return (
        <View>
            <View style={{
                flexDirection: "row",
                gap: _spacing,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                height: 200,
            }} >
            {props.userList.map((user, index) => (
                <Place anim={_anim} user={user} key={index} index={index} onFinish={index === props.userList.length -1 ? () => {
                    _anim.value = 1
                } : undefined}/>
            ))}
            </View>
        </View>
    )
}

export default AnimatedLeaders

const styles = StyleSheet.create({})
