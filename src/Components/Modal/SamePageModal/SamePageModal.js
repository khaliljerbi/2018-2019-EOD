import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SamePageModal = ({ children, toggle, action, isOpen, confirmLabel, cancelLabel, title }) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>{title}</ModalHeader>
    <ModalBody>
      {children}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={action}>{confirmLabel}</Button>{' '}
      <Button type="submit" color="secondary" onClick={toggle}>{cancelLabel}</Button>
    </ModalFooter>
  </Modal>
);

export default SamePageModal;
