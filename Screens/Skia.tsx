import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedBorderBox from '../components/AnimatedBorderBox';


const Skia = () => {
  return (
    <View style={styles.container}>
      <AnimatedBorderBox width={200} height={100} />
        <View style={{ height: 20 }} />
      <AnimatedBorderBox width={150} height={150} />
    </View>
  );
};

export default Skia

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Uygulama arka planı
  },
});