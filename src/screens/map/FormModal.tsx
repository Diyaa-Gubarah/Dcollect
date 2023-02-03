import {NativeModal, NativeText} from '../../components';
import React, {useCallback, useRef} from 'react';

import {ModalRef} from '../../components/modal/NativeModal';
import {TouchableOpacity} from 'react-native';

const FormModal = () => {
  const modalRef = useRef<ModalRef>(null);

  const handleOpenModal = useCallback(() => {
    modalRef.current?.open();
  }, [modalRef]);

  const handleCloseModal = useCallback(() => {
    modalRef.current?.close();
    console.log('form close modal');
  }, [modalRef]);

  return (
    <>
      <NativeModal ref={modalRef} onClose={handleCloseModal}>
        <NativeText color="primary" size="lg">
          Modal Form
        </NativeText>
      </NativeModal>
      <TouchableOpacity onPress={handleOpenModal}>
        <NativeText color="background" size="lg">
          Open Modal
        </NativeText>
      </TouchableOpacity>
    </>
  );
};

export default FormModal;
