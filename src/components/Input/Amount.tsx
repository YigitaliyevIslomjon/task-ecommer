import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';

import Label from './Label';
import { AmountInputProps } from './types';

import classes from './Input.module.scss';

export interface IProps extends Omit<AmountInputProps, 'type'> {
  valuePrefix?: string;
  valueSuffix?: string;
  min?: number;
  max?: number;
}

const Amount: React.FC<IProps> = ({
  valuePrefix,
  valueSuffix,
  min,
  max,
  value,
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
      <IMaskInput
        className={classes.input}
        {...{ placeholder, disabled, autoFocus }}
        value={value || '0'}
        type="tel"
        onBlur={e => {
          setFocused(false);
          onBlur && onBlur(e);
        }}
        onFocus={() => setFocused(true)}
        onAccept={value => onChange && onChange(value)}
        placeholderChar=" "
        overwrite
        unmask
        lazy={false}
        autofix={false}
        mask={`${valuePrefix || ''}amount${valueSuffix || ''}`}
        blocks={{
          amount: {
            mask: Number,
            thousandsSeparator: ' ',
            min,
            max,
            scale: 2,
            radix: '.',
            normalizeZeros: true
          }
        }}
        prepare={(value, mask) => {
          if (mask.value === '0') {
            mask.value = value;
            return '';
          }
          return value;
        }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </Label>
  );
};

export default Amount;
