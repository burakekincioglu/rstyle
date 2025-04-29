/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const CARD_COUNT = 4;

const ExploreInterpolate = () => {

  type CardProps = {
    index: number;
    progress: SharedValue<number>
  }

  const Card: React.FC<CardProps> = ({index, progress}) => {

    const rStyle = useAnimatedStyle(() => {
        // Limit the translation and rotation values to prevent cards from growing too large
        const translateX = interpolate(progress.value, [0, 1], [0, index * 15]);
        const translateY = interpolate(progress.value, [0, 1], [0, -index * 5]);
        const rotate = interpolate(progress.value, [0, 1], [-index * 8, index * 8]);
        
        // Add scale effect - cards will grow slightly when touched
        const scale = interpolate(progress.value, [0, 1], [1, 1.05]);
        
        return {
            transform: [
                {
                    translateY: translateY,
                },
                {
                    translateX: translateX,
                },
                {
                    rotate: `${rotate}deg`,
                },
                {
                    scale: scale,
                },
            ],
        };
    });

    // Text visibility animation
    const textStyle = useAnimatedStyle(() => {
        // Start with opacity 0 (invisible) and increase to 1 (visible)
        const opacity = interpolate(progress.value, [0, 1], [0, 1]);
        
        return {
            opacity: opacity,
        };
    });

    return(
        <Animated.View
            key={index}
            style={[styles.card, rStyle, {zIndex: CARD_COUNT - index, backgroundColor: index % 2 === 0 ? '#fe3d6d' : 'white'}]}
        >
            {index === 0 && (
                <View style={styles.textContainer}>
                    <Animated.Text style={[styles.text, textStyle]}>Tıkla ve Gör</Animated.Text>
                </View>
            )}
        </Animated.View>
    );
  };

  const progress = useSharedValue(0);

  return (
    <Animated.View style={styles.container}
    onTouchStart={() => {
        progress.value = withSpring(1, {mass: 1});
    }}
    onTouchEnd={() => {
        progress.value = withSpring(0);
    }}
    >
      {new Array(CARD_COUNT).fill(0).map((_, index) =>
        <Card key={index} index={index} progress={progress} />
      )}
    </Animated.View>
  );
};

export default ExploreInterpolate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e3e3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        height: 220,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: '#cccccc',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#b9b9b9',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Prevent content from overflowing
    },
    textContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
});
