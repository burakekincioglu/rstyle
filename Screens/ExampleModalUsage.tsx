import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { showModal } from '../store/Modal/modalSlice';

const ModalUsage = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const handleOpenModal = () => {
    dispatch(showModal({
      title: 'Modal Başlığı',
      content: {
        type: 'ExampleModalContent',
        props: {
          message: "This is an example modal content",
          count: count
        }
      }
    }));
  };

  return (
    <View>
      <Button title="Open Modal" onPress={handleOpenModal} />
    </View>
  );
};

export default ModalUsage; 