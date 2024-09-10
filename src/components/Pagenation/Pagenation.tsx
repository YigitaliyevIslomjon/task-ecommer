import React from 'react';
import { Pagination } from 'antd/lib';

import classes from './Pagenation.module.scss';

interface IProps {
  currentPage: number;
  defaultPageSize: number;
  total: number;
  onShowSizeChange: (current: number, size: number) => void;
}

const Pagenation: React.FC<IProps> = ({ currentPage, total, onShowSizeChange, defaultPageSize }) => {
  return (
    <div className={classes.wrapper}>
      <Pagination
        current={currentPage}
        onChange={onShowSizeChange}
        defaultPageSize={defaultPageSize || 10}
        total={total}
        onShowSizeChange={onShowSizeChange}
      />
      ;
    </div>
  );
};

export default Pagenation;
