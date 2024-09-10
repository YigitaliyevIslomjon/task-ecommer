import React from 'react';
import { Col, Row } from 'antd';

import * as Fields from '@/containers/Fields';

interface IProps {}

const Form: React.FC<IProps> = () => {
  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Fields.Text name="todo" title="todo" placeholder="todo" size="sm" />
        </Col>
      </Row>
    </>
  );
};

export default Form;
