import React from 'react';
import { Col, Row } from 'antd';

import * as Fields from '@/containers/Fields';

interface IProps {}

const Form: React.FC<IProps> = () => {
  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Fields.Text name="title" title="title" placeholder="title" size="sm" />
        </Col>
        <Col span={12}>
          <Fields.Text name="category" title="category" placeholder="category" size="sm" />
        </Col>
      </Row>
    </>
  );
};

export default Form;
