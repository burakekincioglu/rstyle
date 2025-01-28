import { Plus, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';
import { colors } from '../utils/colors';
import { spacing } from '../utils/spacing';

const Schedule = () => {

  const weekDays = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const _borderRadius = spacing.md
  const _spacing = spacing.sm
  const _color = colors.graywhite
  const _startHour = 8
  const _damping = 14
  const _entering = FadeInDown.springify().damping(_damping)
  const _exiting = FadeOut.springify().damping(_damping)
  const _layout = LinearTransition.springify().damping(_damping)

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  /* 
  
  Bu ekranda dikkat çeken güzellik _layout kullanımıyla 
  component mount veya unmount hareketlerini smooth hale getirmek

  */

  function HourBlock({block}: {block: number}) {
    return(
        <View style={{
            borderWidth: 1,
            borderColor: _color,
            borderRadius: _borderRadius - _spacing,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: _spacing / 4
        }}>
            <Text>
                {block > 9 ? block : `0${block}`}:00{" "}
                {block > 11 && block < 24 ? "PM" : "AM"}
            </Text>
        </View>
    )
  }

  function DayBlock() {
    const [hours, setHours] = useState([_startHour])

    return (
        <Animated.View 
            style={{gap: _spacing}} 
            entering={_entering}
            exiting={_exiting}
            layout={_layout}
        >
            {hours.map((hour) => {
                return( 
                    <Animated.View 
                        key={`hour-${hour}`} 
                        style={{flexDirection: 'row', 
                                gap: _spacing, 
                                alignItems: "center"
                        }}
                        entering={_entering}
                        exiting={_exiting}
                        layout={_layout}
                    >
                        <Text>From:</Text>
                        <HourBlock block={hour} />
                        <Text>To:</Text>
                        <HourBlock block={hour + 1} />
                        <AnimatedPressable onPress={() => {
                            setHours((prev) => [...prev.filter((k) => k !== hour)])
                        }} >
                            <View style={{
                                backgroundColor: _color,
                                height: 24,
                                aspectRatio: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: _borderRadius - _spacing
                            }} >
                                <X size={16} color={'#555'} />
                            </View>
                        </AnimatedPressable>
                    </Animated.View>
                )
            })}
            <AnimatedPressable
                layout={_layout}
                onPress={() => {
                    if (hours.length === 0) {
                        setHours([_startHour])
                        return
                    }
                    setHours((prev) => [...prev, prev[prev.length -1] + 1])
                }}
            >
                <View style={{
                    flexDirection: "row",
                    gap: _spacing / 2,
                    padding: _spacing,
                    borderRadius: _borderRadius - _spacing / 2,
                    backgroundColor: _color,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: _spacing / 2
                }}>
                <Plus size={16}  color={'black'} />
                <Text style={{fontSize: 14, color: "#333"}} >Add more</Text>
                </View>
            </AnimatedPressable>
        </Animated.View>
    )
    
  }



  function Day({day}: {day: typeof weekDays[number]}) {
    const [isOn, setIsOn] = useState(false)
    return(
        <Animated.View 
            layout={_layout}
            style={{borderWidth: 1,
                    borderColor: _color,
                    borderRadius: _borderRadius,
                    padding: _spacing,
                    backgroundColor: isOn ? "transparent" : _color,
                    gap: _spacing
        }} >
            <View style={{flexDirection: "row", 
                          alignItems: "center", 
                          justifyContent: "space-between",
            }} >
                <Text>{day}</Text>
                <Switch 
                    value={isOn} 
                    onValueChange={(value) => setIsOn(value)} 
                    trackColor={{true: colors.darkgray}}
                    style={{
                        transform: [
                            {
                                scale: 0.7
                            },
                            {
                                translateX: 10
                            }
                        ]
                    }}
                />
            </View>
            {isOn && <DayBlock />}
        </Animated.View>
        
    )
  }

  return (
    <View style={{padding: _spacing, gap: _spacing, backgroundColor: colors.white, flex: 1}}>
      {weekDays.map(day => (
        <Day
            day={day}
            key={`day-${day}`}
        />
      ))}
    </View>
  )
}

export default Schedule

const styles = StyleSheet.create({})