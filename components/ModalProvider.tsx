import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Modal/store';
import ExampleModalContent from './ExampleModalContent';
import Modal from './Modal';

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { isVisible, content } = useSelector((state: RootState) => state.modal);
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const renderContent = () => {
    if (!content) return null;

    switch (content.type) {
      case 'ExampleModalContent':
        return (
          <ExampleModalContent
            message={content.props.message}
            count={count}
            onIncrement={handleIncrement}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {children}
      {isVisible && <Modal>{renderContent()}</Modal>}
    </View>
  );
};

export default ModalProvider; 