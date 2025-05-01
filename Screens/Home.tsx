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
                    <View key={index} style={{ marginLeft: 10 }}>
                        <Button
                            title={value}
                            color="black"
                            onPress={() => navigation.navigate(key as never)}
                        />
                    </View>
                )
            }
        })}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: "flex-start", marginTop: 20}
})