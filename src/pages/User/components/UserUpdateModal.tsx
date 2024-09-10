import React from 'react';
import { Button, message, Modal } from 'antd';
import { Col, Row } from 'antd/lib';
import Spinner from 'antd/lib/spin';

import { UpdateForm } from '@/modules/user/forms';
import useSingle from '@/modules/user/hooks/useSingle';

import Spacer from '@/components/Spacer';

import Form from './Form';

import classes from './UserCreateModal.module.scss';

interface IProps {
  id: string;
  onClose: () => void;
  isOpen: boolean;
}

const UserUpdateModal: React.FC<IProps> = ({ onClose, isOpen, id }) => {
  const { item, isFetched } = useSingle({ id });

  return (
    <>
      <Modal width={1000} title="Update User" open={isOpen} onOk={onClose} onCancel={onClose} footer={false}>
        {!isFetched ? (
          <div>...loding</div>
        ) : (
          <div className={classes.wrapper}>
            <Spacer size={24} />
            <UpdateForm
              id={id}
              values={item}
              onSuccess={() => {
                message.success('user muvoffaqiyatli updated');
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
            </UpdateForm>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserUpdateModal;
