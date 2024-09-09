import React, { useState } from 'react';

import Label from './Label';
import { TextInputProps } from './types';

import classes from './Input.module.scss';

export interface IProps extends TextInputProps {
  rows?: number;
}

const Textarea: React.FC<IProps> = ({
  name,
  value,
  state = 'default',
  placeholder,
  disabled,
  rows,
  onChange,
  onBlur,
  ...props
}) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <Label state={state} {...props} {...{ disabled, isFocused }}>
      <textarea
        {...{ name, value, placeholder, disabled, rows }}
        className={classes.textarea}
        onChange={e => onChange && onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={e => {
          setFocused(false);
          onBlur && onBlur(e);
        }}
      >
        {value}
      </textarea>
    </Label>
  );
};

export default Textarea;
