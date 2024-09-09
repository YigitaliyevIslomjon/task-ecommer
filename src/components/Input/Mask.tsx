import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';

import Label from './Label';
import { MASK_TYPE, MaskInputProp } from './types';

export interface IProps extends MaskInputProp {}

const Mask: React.FC<IProps> = ({
  mask,
  maskType = MASK_TYPE.TEXT,
  unmask = true,
  lazy,
  placeholderChar = '_',
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
    <Label {...props} {...{ isFocused, disabled }}>
      <IMaskInput
        {...{ lazy, mask, unmask, placeholder, placeholderChar, disabled, autoFocus }}
        {...props}
        size={undefined}
        value={String(value || '') || ''}
        type={maskType === MASK_TYPE.NUMBER ? 'tel' : 'text'}
        onBlur={e => {
          setFocused(false);
          onBlur && onBlur(e);
        }}
        onFocus={() => setFocused(true)}
        onAccept={value => onChange && onChange(value)}
        definitions={{ '#': maskTypeFn(maskType) }}
        overwrite
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </Label>
  );
};

const maskTypeFn = (type?: MASK_TYPE | string) => {
  switch (type) {
    case MASK_TYPE.NUMBER:
      return /^\d+$/;
    case MASK_TYPE.EMAIL:
      return /^[A-Za-z0-9@.]$/;
    case MASK_TYPE.ONLY_TEXT:
      return /^[a-zA-Zа-яА-ЯёЁ ]*$/;
    case MASK_TYPE.TEXT:
    default:
      return /^\w+$/;
  }
};

export default Mask;
