import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { hideModal } from '../store/Modal/modalSlice';

interface ExampleModalContentProps {
  message: string;
  count: number;
  onIncrement: () => void;
}

const ExampleModalContent: React.FC<ExampleModalContentProps> = ({
  message,
  count,
  onIncrement
}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.count}>Count: {count}</Text>
      <Button title="Increment" onPress={onIncrement} />
      <Button title="Close Modal" onPress={() => dispatch(hideModal())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ExampleModalContent; 