import React from 'react';
import { Button, message, Modal } from 'antd';
import { Col, Row } from 'antd/lib';
import Spinner from 'antd/lib/spin';

import { CreateForm } from '@/modules/user/forms';

import Spacer from '@/components/Spacer';

import Form from './Form';

import classes from './UserCreateModal.module.scss';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

const UserCreateModal: React.FC<IProps> = ({ onClose, isOpen }) => {
  return (
    <>
      <Modal width={1000} title="Create User" open={isOpen} onOk={onClose} onCancel={onClose} footer={false}>
        <div className={classes.wrapper}>
          <Spacer size={24} />
          <CreateForm
            onSuccess={() => {
              message.success('user muvoffaqiyatli yaratildi');
              onClose();
            }}
          >
            {({ formState }) => {
              return (
                <div className={classes.content}>
                  <Spinner spinning={formState.isSubmitSuccessful}>
                    <Form />
                    <Spacer size={30} />
                    <Row gutter={[12, 12]} justify="end">
                      <Col>
                        <Button disabled={formState.isSubmitSuccessful} htmlType="button" onClick={onClose}>
                          Cancel
                        </Button>
                      </Col>
                      <Button type={'primary'} disabled={formState.isSubmitSuccessful} htmlType="submit">
                        Submit
                      </Button>
                    </Row>
                  </Spinner>
                </div>
              );
            }}
          </CreateForm>
        </div>
      </Modal>
    </>
  );
};

export default UserCreateModal;
