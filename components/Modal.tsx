import React from 'react';
import { Modal as RNModal, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../store/Modal/modalSlice';
import { RootState } from '../store/Modal/store';

interface ModalProps {
  style?: ViewStyle;
  animationType?: 'none' | 'slide' | 'fade';
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  style,
  animationType = 'fade',
  onClose,
  children
}) => {
  const dispatch = useDispatch();
  const { isVisible, title } = useSelector((state: RootState) => state.modal);

  const handleClose = () => {
    dispatch(hideModal());
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <RNModal
      visible={isVisible}
      transparent
      animationType={animationType}
      onRequestClose={handleClose}
    >
      <View style={[styles.overlay, style]}>
        <View style={styles.modalContainer}>
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  content: {
    flex: 1,
  },
});

export default Modal; 