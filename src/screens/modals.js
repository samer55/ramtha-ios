import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modalize from 'react-native-modalize';

export const Modalss = () => {
  const modalRef = useRef<Modalize>(null);

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalRef}>
      <Text>fsdfsdfsdf</Text>
      </Modalize>
    </>
  );
}
