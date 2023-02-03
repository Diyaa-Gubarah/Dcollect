import {Modal, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';

import NativeTouch from '../touch/NativeTouch';
import NativeView from '../view/NativeView';

interface Props {
  onClose: () => void;
  children?: React.ReactNode;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

const NativeModal = forwardRef((props: Props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {onClose, children} = props;

  useImperativeHandle(ref, () => ({
    open: () => {
      setModalVisible(true);
    },
    close: () => {
      setModalVisible(false);
    },
  }));

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
      style={styles.modal}>
      {children}
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default NativeModal;
