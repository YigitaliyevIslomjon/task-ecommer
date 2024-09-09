import React, { useState } from 'react';
import { AutoComplete as AntdAutoComplete } from 'antd';
import cx from 'clsx';

import classes from './Input.module.scss';

export interface IPropsValue {
  label: string;
  value: any;
}
export interface IProps {
  title: string;
  placeholder: string;
  state?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  options: any[];
  value?: any;
  isFocused?: boolean;
  required?: boolean;
  disabled?: boolean;
  onChange: ({ label, value }: IPropsValue) => void;
  onSelect: ({ label, value }: IPropsValue) => void;
}

const AutoComplete: React.FC<IProps> = ({
  value = '',
  placeholder,
  size = 'md',
  state = 'default',
  disabled = false,
  options,
  required = false,
  onChange,
  onSelect,
  isFocused = false,
  title
}) => {
  const [isFocus, setFocus] = useState(isFocused);

  return (
    <div
      className={cx(
        classes.wrapper,
        state && classes[`wrapper--state-${state}`],
        size && classes[`wrapper--size-${size}`],
        disabled && classes[`wrapper--disabled`],
        isFocus && classes[`wrapper--focused`]
      )}
      title={title}
    >
      <label className={classes.wrapperInner}>
        {!!title && (
          <div className={classes.header}>
            <div className={classes.title}>{title}</div>
            {!!required && <span className={classes.asterix}>*</span>}
          </div>
        )}
        <AntdAutoComplete
          className={classes.autoComplete}
          onFocus={() => setFocus(true)}
          disabled={disabled}
          onBlur={() => setFocus(false)}
          value={value}
          placeholder={placeholder || title}
          onChange={(label, value) => onChange({ label, value })} // Change here
          onSelect={(label, value) => onSelect({ label, value })}
          options={options}
        />
      </label>
    </div>
  );
};

export default AutoComplete;
