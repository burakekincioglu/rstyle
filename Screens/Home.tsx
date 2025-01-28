import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { constants } from './constants';

const HomeScreen = () => {

    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
        {Object.entries(constants.ScreenNames).map(([key, value], index) => {
            
            if (index === 0) {
                return null
            }else{
                return(
                    <Button
                        key={index}
                        title={key}
                        color={'gray'} 
                        onPress={() => navigation.navigate(value)}
                    />
                )
            }
        })}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {justifyContent: "center", alignItems: "center"}
})