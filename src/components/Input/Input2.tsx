import React, { HTMLProps, useState } from 'react';

import Label from './Label';
import { LabelProps } from './types';

export interface TextInputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'title' | 'size' | 'defaultValue'>,
    Omit<LabelProps, 'children'> {}

export interface IProps extends TextInputProps {}

const Input: React.FC<IProps> = ({
  value,
  type = 'text',
  name,
  placeholder,
  disabled,
  autoFocus,
  onChange,
  onBlur,
  ...props
}) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <Label {...props} {...{ disabled, isFocused }}>
      <input
        {...{ value, type, placeholder, disabled, autoFocus, id: name, name }}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={e => {
          setFocused(false);
          onBlur && onBlur(e);
        }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </Label>
  );
};

export default Input;
