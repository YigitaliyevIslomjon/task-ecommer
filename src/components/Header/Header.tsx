import React from 'react';
import { Button, Col, Row } from 'antd';

import Input from '../Input';

interface IProps {
  onClick: () => void;
  onSearch: (e: string) => void;
}

const Header: React.FC<IProps> = ({ onClick, onSearch }) => {
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col span={4}>
          <Input onChange={e => onSearch && onSearch(e.currentTarget.value)} placeholder="search..." size="sm" />
        </Col>
        <Col>
          <Button onClick={onClick} htmlType="button" type="primary">
            Create
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
