import React, { cloneElement, isValidElement } from 'react';
import { Skeleton } from 'antd';
import cx from 'clsx';

import { IconHOC } from '@/components/Icon';

import classes from './Done.module.scss';

interface IProps {
  title?: string;
  count: number;
  done?: boolean;
  isLoading?: boolean;
  container?: React.ReactNode;
}

const Done: React.FC<IProps> = ({ title, done = false, isLoading = false, count, container }) => {
  const resultProps = {
    className: cx(classes.wrapper, done && classes.wrapperDone)
  };

  const resultChildren = (
    <>
      <IconHOC className={classes.icon} size={30} variant={'bulk'} name={done ? 'CheckCircle' : 'ClockCircle'} />
      <div className={classes.text}>
        <p className={classes.title}>{title}</p>
        {isLoading ? (
          <p className={classes.count}>{count}</p>
        ) : (
          <div className={classes.skeleton}>
            <Skeleton.Button active size={'small'} />
          </div>
        )}
      </div>
    </>
  );
  const resultContainer = isValidElement(container) ? container : <button />;

  return cloneElement(resultContainer, resultProps, resultChildren);
};

export default Done;
