import React from 'react';
import { Button, Col, Row } from 'antd';

import Input from '../Input';

import classes from './Header.module.scss';

interface IProps {
  onClick: () => void;
  onSearch: (e: string) => void;
}

const Header: React.FC<IProps> = ({ onClick, onSearch }) => {
  return (
    <div className={classes.wrapper}>
      <Row justify="space-between" align="middle">
        <Col span={4}>
          <Input
            onChange={e => onSearch && onSearch(e.currentTarget.value)}
            placeholder="search..."
            size="sm"
            className={classes.input}
          />
        </Col>
        <Col>
          <Button onClick={onClick} htmlType="button">
            Create
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
