import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Animated, { interpolate, SharedValue, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const ExploreInterpolate = () => {

  type CardProps = {
    index: number;
    progress: SharedValue<number>
  }

  const Card: React.FC<CardProps> = (({index, progress}) => {

    const rStyle = useAnimatedStyle(() => {

        // const translateX = interpolate(progress.value,[0,1], [0, index * 25], Extrapolation.CLAMP)
        const translateX = interpolate(progress.value,[0,1], [0, index * 25])
        const translateY = interpolate(progress.value,[0,1], [0, -index*5])
        const rotate = interpolate(progress.value, [0,1], [-index*10, index*10])
        /*
            interpolate içinde progress.value [0,1] aralığında değişirken,
            translateX değerine [0, index * 25] dizisindeki değerleri atamasını yap.
            Extrapolation.CLAMP prop'unu eklediğimizde bounce olayı iptal oluyor 
            çünkü ilk dizide tanımladığımız [0,1] değerlerinden büyük ve küçük olanları 
            yok sayıyor. (progress.value değerini withSpring ile değiştirdiğimizden dolayı
            bounce efekt ile tam sayı dönmüyor progress.value)
        */
        return {
            transform: [
                {
                    translateY: translateY
                },
                {
                    translateX: translateX
                },
                {
                    rotate: `${rotate}deg`
                }
            ]
        }
        
    })

    return(
        <Animated.View
            key={index} 
            style={[styles.card, rStyle, {zIndex: -index, backgroundColor: index % 2 === 0 ? '#fe3d6d' : 'white'}]}
        >
            {index === 0 && <Text style={styles.text} >Tıkla ve Gör</Text>}
        </Animated.View>
    )

  })

  const progress = useSharedValue(0)

  return (
    <Animated.View style={styles.container} 
    onTouchStart={() => {
        progress.value = withSpring(1, {mass: 1})
    }}
    onTouchEnd={() => {
        progress.value = withSpring(0) 
    }}
    > 
      {new Array(4).fill(0).map((_, index) => 
        <Card key={index} index={index} progress={progress} />
      )}
    </Animated.View>
  )
}
// `${-index * 10}deg`

export default ExploreInterpolate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e3e3',
        alignItems: "center",
        justifyContent: "center"
    },
    card: {height: 180,
        aspectRatio: 3/4,
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
        justifyContent: "center"
    },
    text: {
        fontWeight: 'bold'
    }
})