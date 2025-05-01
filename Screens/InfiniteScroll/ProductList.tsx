import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppStackParamList } from '../../AppNavigator';

const ProductList = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  navigation.setOptions({
    headerTitle: 'Product List'
  });
  return (
    <SafeAreaView style={styles.content}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 10,
          borderRadius: 5,
          height: 50,
          width: 200,
          marginTop: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('ProductDetails', { productId: "1" })}
      >
        <View>
          <Text style={{ color: 'white', fontSize: 16 }}>Product 1</Text>
        </View>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default ProductList

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
})