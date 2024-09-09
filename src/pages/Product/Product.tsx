import React from 'react';
import { Row } from 'antd';

import Spacer from '@/components/Spacer';

interface IProps {}

const User: React.FC<IProps> = () => {
  return (
    <>
      <Spacer size={32} />

      <Row gutter={[20, 20]}></Row>
      <Spacer size={32} />
    </>
  );
};

export default User;
