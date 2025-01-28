import React from 'react'
import { StyleSheet, View } from 'react-native'
import AnimatedLeaders from '../components/AnimatedLeaders'
import { colors } from '../utils/colors'

const users = [
    {name: "Ahmet", score: 22},
    {name: "Mehmet", score: 32},
    {name: "Göktuğ", score: 12},
    {name: "Burak", score: 25},
    {name: "Tuğrul", score: 43},
]

const Leaderboard = () => {
  return (
    <View style={styles.container} >
      <AnimatedLeaders userList={users} />
    </View>
  )
}

export default Leaderboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center"
    }
})