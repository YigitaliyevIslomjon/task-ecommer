import React from 'react';
import cx from 'clsx';

import CheckCircle from '@/components/Icon/list/outline/CheckCircle.tsx';
import Warning from '@/components/Icon/list/outline/Warning.tsx';
import WarningError from '@/components/Icon/list/outline/WarningError.tsx';

import { LabelProps } from './types';

import classes from './Input.module.scss';

const Label: React.FC<LabelProps> = ({
  state,
  size = 'lg',
  title,
  message,
  isFocused,
  disabled,
  required,
  className,
  children,
  iconPrefix,
  iconPrefixStyle,
  onIconPrefix,
  iconSuffix,
  onIconSuffix,
  iconSuffixStyle
}) => {
  const icons = {
    error: <Warning color={'red'} width={24} height={24} className={classes.iconError} />,
    warning: <WarningError color={'orange'} width={24} height={24} className={classes.iconWarning} />,
    success: <CheckCircle color={'green'} width={24} height={24} className={classes.iconSuccess} />
  };

  return (
    <div
      className={cx(
        classes.wrapper,
        state && classes[`wrapper--state-${state}`],
        size && classes[`wrapper--size-${size}`],
        disabled && classes[`wrapper--disabled`],
        isFocused && classes[`wrapper--focused`],
        className && className
      )}
    >
      <label className={classes.wrapperInner}>
        {!!title && (
          <div className={classes.header}>
            <div className={classes.title}>{title}</div>
            {!!required && <span className={classes.asterix}>*</span>}
          </div>
        )}
        <div className={classes.content}>
          {!!iconPrefix && (
            <div style={iconPrefixStyle} className={cx(classes.icon, classes.iconPrefix)} onClick={onIconPrefix}>
              {iconPrefix}
            </div>
          )}

          <div className={classes.input}>{children}</div>

          {!!iconSuffix && (
            <div style={iconSuffixStyle} className={cx(classes.icon, classes.iconSuffix)} onClick={onIconSuffix}>
              {iconSuffix}
            </div>
          )}

          {!!state && state !== 'default' && <div className={classes.icon}>{icons[state]}</div>}
        </div>
      </label>

      {!!message && <div className={cx(classes.message, classes[`message-${state}`])}>{message}</div>}
    </div>
  );
};

export default Label;
