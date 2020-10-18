import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';

const ModalRoot = ({ content, toggle, header, actions, size }) => ReactDOM.createPortal(
  <Modal isOpen toggle={toggle} size={size}>
    <ModalHeader>
      {header}
    </ModalHeader>
    <ModalBody>
      {content() }
    </ModalBody>
    <ModalFooter>
      {actions()}
    </ModalFooter>
  </Modal>,
  document.getElementById('modal'),
);


export default ModalRoot;
