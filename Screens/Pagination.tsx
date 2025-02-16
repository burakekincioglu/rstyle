import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Onboarding from '../components/Onboarding'
import { colors } from '../utils/colors'

const Pagination = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <View style={styles.container} >
      <Onboarding 
        total={4} 
        selectedIndex={selectedIndex} 
        onIndexChange={(index) => { setSelectedIndex(index); }} 
        />
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center"
        
    }
})