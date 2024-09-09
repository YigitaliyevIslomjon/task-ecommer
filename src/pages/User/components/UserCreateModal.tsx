import React from 'react';
import { Modal } from 'antd';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

const UserCreateModal: React.FC<IProps> = ({ onClose, isOpen }) => {
  return (
    <>
      <Modal title="Basic Modal" open={isOpen} onOk={onClose} onCancel={onClose}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default UserCreateModal;
